/**
 * @description 混合
 * @author zhangli
 */

const mixins = {
  data () {
    return {
    }
  },
  mounted () {
    const isMenuTab = JSON.parse(window.localStorage.getItem('pro__DEFAULT_MULTI_TAB')).value
    if (isMenuTab) {
    } else {
    }
  },
  methods: {
    getSex (val) {
      if (val === '1') {
        return '男'
      } else if (val === '2') {
        return '女'
      } else {
        return '未知'
      }
    },
    // 时间戳和gmt转日期
    getDateTime (date, type = 0) {
      if (date === '' || date === null) {
        return '--'
      }
      const d = new Date(date)
      if (type === 1) {
        return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' ' +
            (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' +
              d.getMinutes()) +
            ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      } else {
        return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' ' + '00:00:00'
      }
    }
  }
}

export default mixins
