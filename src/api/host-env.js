/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let hostEnv = ''

if (ConfigEnv === 'test') {
  hostEnv = 'http://yapi.demo.qunar.com/mock/81652'
} else if (ConfigEnv === 'prod') { // 线上接口
  hostEnv = 'http://yapi.demo.qunar.com/mock/81652'
} else {
  hostEnv = 'http://yapi.demo.qunar.com/mock/81652'
}

export default hostEnv
