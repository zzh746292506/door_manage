<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="columns"
      :table-list="recordList">
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'name', // 表单属性
    type: 'selectInput', // 表单类型
    label: '姓名', // 表单label值
    selectType: [
      {
        key: 1,
        val: '姓名'
      }, {
        key: 2,
        val: '学号'
      }
    ],
    placeholder: '请输入' // 表单默认值(非必选字段)
  },
  {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '开启'
      },
      {
        key: 2,
        val: '关闭'
      }
    ],
    value: 'status',
    type: 'select',
    label: '状态'
  },
  {
    value: 'dateTime', // 单个日期
    type: 'singleTime',
    label: '日期'
  },
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '起始时间'
  }
]
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
  name: 'AccessRecord',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data () {
    return {
      columns,
      searchLabel,
      total: 100,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: []
    }
  },
  mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getAccessRecord'
    ]),
    async showList () {
      const res = await this.getAccessRecord()
      this.recordList = res.data
    },
    searchForm (values) {
      console.log(values)
    },
  }
}
</script>
<style lang="less" scoped>
</style>
