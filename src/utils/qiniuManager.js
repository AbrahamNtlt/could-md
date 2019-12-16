/*
 * @Description: 七牛云的管理方法
 * @Author: Achieve
 * @Date: 2019-12-16 16:37:22
 * @LastEditTime: 2019-12-16 18:55:53
 */
const qiniu = require('qiniu')

class QiniuManager {
  constructor(accessKey, secretKey, bucket) {
    this.mac = new qiniu.auth.disgest.Mac(accessKey, secretKey)
    this.bucket = bucket
    this.config = new qiniu.conf.Config()
    this.config.zone = qiniu.zone.Zone_z0
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
  }
  uploadFile(key, localFilePath) {
    const options = {
      scope: this.bucket + ':' + key
    }
    const putPolicy = new qiniu.putPolicy(options)
    const uploadToken = putPolicy.uploadToken(this.mac)
    const formUploader = new qiniu.form_up.FormUploader(this.config)
    const putExtra = new qiniu.form_up.PutExtra()

    formUploader.putFile(uploadToken, key, localFilePath, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        console.log(respBody)
      } else {
        console.log(respInfo, respBody)
      }
    })
  }
  deleteFile(key){
    this.bucketManager.delete(this.bucket,key,function(respErr,respBody,respInfo){
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        console.log(respBody)
      } else {
        console.log(respInfo, respBody)
      }
    })
  }
}
