import $ajax from '../../utils/ajax-serve'
import apiList from '@api/index'

/**
 * @description 处理请求成功后返回Promise方便vue界面处理数据
 * @param {res} 返回结果
 */
function resultBack (res) {
  return new Promise(resolve => {
    resolve(res)
  })
}
/**
 * @description 当前模块接口列表
 * @param {url} 功能接口
 * @param {type} 请求类型
 * @param {params} 请求参数
 */
const actions = Object.create(null)
for (const key in apiList) {
  const url = apiList[key].split('#')[0]
  const type = apiList[key].split('#')[1]
  const isLoad = apiList[key].split('#')[2] === undefined
  actions[key] = async function ({
    commit,
    state
  }, params = {}) {
    // 是否显示加载提示
    const reqType = type === 'getUrl' ? 'get' : type
    const isGetUrl = type === 'getUrl'
    const res = await $ajax[reqType]({
      url: isGetUrl || type === 'del' ? url + '/' + params : url,
      params: isGetUrl ? {} : params
    }, isLoad)
    return resultBack(res)
  }
}
console.log(actions)
const projectName = 'door_manage' // 此处写项目名作为存储值，避免不同项目冲突
const localData = window.localStorage.getItem(projectName) || '{}'
const getState = (state, val) => {
  return JSON.parse(localData)[state] || val
}
const home = {
  namespaced: true,
  state: {
    userInfo: getState('userInfo', {
      protalName: '门禁管理系统',
      systemName: '武汉全品文教管理端',
      userName: '超级管理员'
    })
  },
  actions: {
    ...actions
  },
  mutations: {
    /**
     * @description 设置state值
     * @param { key } state属性
     * @param { data } 存在的数据
     */
    updataState (state, {
      key,
      data,
      isLocal = true
    }) {
      if (isLocal) {
        const localData = JSON.parse(localStorage.getItem(projectName) || '{}')
        localData[key] = data
        window.localStorage.setItem(projectName, JSON.stringify(localData))
      }
      state[key] = data
    }
  }
}

export default home
