/**
 * @des 注册全局过滤器
 */

import Vue from 'vue'

const filters = {
  // 获取表格索引
  pageIndex: (val, obj) => {
    if (JSON.stringify(obj) === '{}') {
      return val + 1
    } else {
      return (obj.page - 1) * obj.size + val + 1
    }
  },
  // 日期转化
  gmtToDate (date, type = 'dateTime') {
    if (!date) {
      return '--'
    }
    const d = new Date(date)
    const time = d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' ' +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' +
        d.getMinutes()) +
      ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
    if (type === 'dateTime') {
      return time
    } else if (type === 'date') {
      return time.substring(0, 10)
    } else if (type === 'time') {
      return time.substring(11, 15)
    }
  }
}

for (const key in filters) {
  Vue.filter(key, filters[key])
}
