// 系统表单
import {
  RouteView
} from '@/layouts'
const VisitorRecord = resolve => require(['@/views/visitorManage/VisitorRecord.vue'], resolve)
const VisitorSet = resolve => require(['@/views/visitorManage/VisitorSet.vue'], resolve)
const visitor = {
  path: '/visitorRecord',
  name: 'visitorRecord',
  component: RouteView,
  meta: {
    title: '访客管理'
  },
  children: [{
    path: '/visitorRecord',
    name: 'visitorRecord',
    component: VisitorRecord,
    meta: {
      title: '访客记录'
    }
  }, {
    path: '/visitorSet',
    name: 'visitorSet',
    component: VisitorSet,
    meta: {
      title: '访客设置'
    }
  }]
}

export default visitor
