<template>
  <div class="page-layout qui-fx-ver">
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="recordList">
      <template v-slot:actions="action">
        <div>
          <a-tooltip placement="topLeft" title="详情">
            <a-button size="small" style="margin-right: 5px; background: #909399; color:#fff" icon="ellipsis" @click="addOrg(record)"></a-button>
          </a-tooltip>
          <a-tooltip placement="topLeft" title="权限管理">
            <a-button size="small" style="margin-right: 5px; background: #F56C6C; color:#fff" icon="lock" @click="addOrg(record)"></a-button>
          </a-tooltip>
        </div>
      </template>
    </table-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%'
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    width: '10%'
  },
  {
    title: '学号/工号',
    dataIndex: 'userCode',
    width: '10%'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: '10%'
  },
  {
    title: '出入地点',
    dataIndex: 'accessAddress',
    width: '10%'
  },
  {
    title: '出入类型',
    dataIndex: 'accessType',
    width: '10%'
  },
  {
    title: '出入时间',
    dataIndex: 'dateTime',
    width: '25%'
  }
]
export default {
  name: 'VisitorRecord',
  components: {
    TableList,
    SearchForm
  },
  data () {
    return {
      columns,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: []
    }
  },
  async mounted () {
    const res = await this.getAccessRecord()
    this.recordList = res.data
  },
  methods: {
    ...mapActions('home', [
      'getAccessRecord'
    ])
  }
}
</script>
<style lang="less" scoped>
</style>
