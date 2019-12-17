/*
 * @Description: 测试
 * @Author: Achieve
 * @Date: 2019-12-17 13:24:03
 * @LastEditTime: 2019-12-17 15:42:29
 */
const accessKey = 'tjOV5GmNhA5h0MrpjR9UnJMj05JFFxxWiDnrMdzC'
const secretKey = 'vYEyw7UiATCSmLX1_Qkx4xqWr_8Gx_J2W0awtSEu'
const cloudname = 'odc'

const QiniuManager = require('./qiniuManager')
const filePath = '/Users/xuqingzhao/Documents/新建mdsdfsafdf.md'
const key = '新建mdsdfsafdf.md'

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
manager.generateDownloadLink(key).then(data => {
  console.log(data)
})
