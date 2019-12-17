/*
 * @Description: 七牛云的管理方法
 * @Author: Achieve
 * @Date: 2019-12-16 16:37:22
 * @LastEditTime: 2019-12-17 15:39:25
 */
const qiniu = require('qiniu')

class QiniuManager {
  constructor(accessKey, secretKey, bucket) {
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.bucket = bucket
    this.config = new qiniu.conf.Config()
    this.config.zone = qiniu.zone.Zone_z0
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
  }
  uploadFile(key, localFilePath) {
    const options = {
      scope: this.bucket + ':' + key
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(this.mac)
    const formUploader = new qiniu.form_up.FormUploader(this.config)
    const putExtra = new qiniu.form_up.PutExtra()
    return new Promise((resolve, reject) => {
      formUploader.putFile(
        uploadToken,
        key,
        localFilePath,
        putExtra,
        this._handleCallback(resolve, reject)
      )
    })
  }
  deleteFile(key) {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(
        this.bucket,
        key,
        this._handleCallback(resolve, reject)
      )
    })
  }
  geBucketDomain() {
    const reqUrl = `http://api.qiniu.com/v6/domain/list?tbl=${this.bucket}`
    const digest = qiniu.util.generateAccessToken(this.mac, reqUrl)
    return new Promise((resolve, reject) => {
      qiniu.rpc.postWithoutForm(
        reqUrl,
        digest,
        this._handleCallback(resolve, reject)
      )
    })
  }
  generateDownloadLink(key) {
    const domainPromise = this.publicBucketDomain
      ? Promise.resolve([this.publicBucketDomain])
      : this.geBucketDomain()
    return domainPromise.then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const pattern = /^https?/
        const domain = data[0]
        this.publicBucketDomain = pattern.test(domain)
          ? domain
          : `https://${domain}`
        return this.bucketManager.publicDownloadUrl(
          this.publicBucketDomain,
          key
        )
      } else {
        throw Error('储存空间过期')
      }
    })
  }
  _handleCallback(resolve, reject) {
    return (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody)
      } else {
        reject({
          statusCode: respInfo.statusCode,
          body: respBody
        })
      }
    }
  }
}

module.exports = QiniuManager
