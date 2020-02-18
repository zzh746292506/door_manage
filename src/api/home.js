/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from './host-env'

const homeApi = {
  getAccessRecord: '/accessRecord#get', // 获取数据列表
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}
export default homeApi
