/*
 * @Description: 测试
 * @Author: Achieve
 * @Date: 2019-12-17 13:24:03
 * @LastEditTime: 2019-12-17 17:13:01
 */
const accessKey = 'tjOV5GmNhA5h0MrpjR9UnJMj05JFFxxWiDnrMdzC'
const secretKey = 'vYEyw7UiATCSmLX1_Qkx4xqWr_8Gx_J2W0awtSEu'
const cloudname = 'odc'
const path = require('path')
const QiniuManager = require('./qiniuManager')
const filePath = '/Users/xuqingzhao/Documents/新建mdsd222fsafdf.md'
const key = '新建mdsdfsafd222f.md'

const manager = new QiniuManager(accessKey, secretKey, cloudname)
// manager
//   .uploadFile(key, filePath)
//   .then(data => {
//     console.log('上传成功')
//     // return manager.deleteFile(key)
//   })
// .then(() => {
//   console.log('删除成功')
// })
// manager.generateDownloadLink(key).then(data => {
//   console.log(data)
// })
const locationPath = path.join(__dirname, key)
manager
  .downloadFile(key, locationPath)
  .then(res => {
    console.log('下载完成')
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
