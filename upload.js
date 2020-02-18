/**
 *
 * @Description 压缩文件后上传服务器
 * @Author 张立
 * @Created 2019-06-21
 *
 */
const request = require('request')
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
var zip = new AdmZip()
zip.addLocalFolder('dist')
zip.writeZip('demo.zip')
console.log('\x1b[32m', '*************************************', '\n')
console.log('\x1b[32m', `你正在上传安防管理平台压缩包, 请耐心等待...`, '\n')
console.log('\x1b[32m', '*************************************', '\n')
let total = 1
const time = setInterval(() => {
  console.log(total++)
}, 1000)
var url = 'http://ip:8090/upload'
var formData = {
  file: fs.createReadStream(path.resolve(__dirname, `demo.zip`))
}
request.post({
  url: url,
  formData: formData
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // 删除压缩包
    fs.unlink(`demo.zip`, function () {})
    console.log('上传成功')
    clearInterval(time)
  }
})
