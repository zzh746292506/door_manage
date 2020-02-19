<template>
  <div class="page-layout qui-fx-ver">
     <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
      </div>
    </search-form>
      <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
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
        <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'name', 
    type: 'selectInput', 
    label: '访客姓名', 
    selectType: [
      {
        key: 1,
        val: '访客姓名'
      }, {
        key: 2,
        val: '访客手机号'
      }
    ],
    placeholder: '请输入' 
  },
  {
    list: [ 
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '教职工'
      },
      {
        key: 2,
        val: '学生'
      }
    ],
    value: 'status',
    type: 'select',
    label: '被访人类型'
  },
 {
    value: 'name',
    type: 'input', 
    label: '被访人姓名', 
    placeholder: '请输入'
  },
  {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '学术交流'
      },
      {
        key: 2,
        val: '探问孩子'
      }, {
        key: 3,
        val: '家长会'
      } ,{
        key: 4,
        val: '其他'
      }
    ],
    value: 'status',
    type: 'select',
    label: '来访事由'
  },
  {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '同意'
      },
      {
        key: 2,
        val: '拒绝'
      }
    ],
    value: 'status',
    type: 'select',
    label: '审批状态'
  },
   {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '在访'
      },
      {
        key: 2,
        val: '签离'
      }
    ],
    value: 'status',
    type: 'select',
    label: '访问状态'
  },
   {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '校大门'
      },
      {
        key: 2,
        val: '西小门'
      },
      {
        key: 3,
        val: '南一门'
      },
      {
        key: 4,
        val: '南二门'
      }
    ],
    value: 'status',
    type: 'select',
    label: '进入地点'
  },
    {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '校大门'
      },
      {
        key: 2,
        val: '西小门'
      },
      {
        key: 3,
        val: '南一门'
      },
      {
        key: 4,
        val: '南二门'
      }
    ],
    value: 'status',
    type: 'select',
    label: '签离地点'
  },
  {
    value: 'rangeTime', 
    type: 'rangeTime',
    label: '进入时间'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '签离时间'
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
    title: '访客姓名',
    dataIndex: 'name',
    width: '6%'
  },
  {
    title: '访客手机号',
    dataIndex: 'phone',
    width: '6%'
  },
  {
    title: '访客照片',
    dataIndex: 'photo',
    width: '6%'
  },
  {
    title: '来访事由',
    dataIndex: 'userCode',
    width: '6%'
  },
  {
    title: '进入时间',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '预计离开时间',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '签离时间',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '来访时长',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '进入地点',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '签离地点',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '被访人类型',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '被访人地点',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '审批状态',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
    title: '访问状态',
    dataIndex: 'dateTime',
    width: '6%'
  },
  {
  title: '操作',
  key: 'action',
  width: '5%',
  scopedSlots: {
    customRender: 'action'
  }
  
  }
]
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '服务名称',
    placeholder: '请输入服务名称'
  },
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '服务业务',
    placeholder: '请输入服务业务'
  },
  {
    value: 'name',
    initValue: '',

    type: 'input',
    label: '服务厂家',
    placeholder: '请输入服务厂家'
  },
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '厂家标识',
    placeholder: '请输入厂家标识'
  }
]
export default {
  name: 'VisitorRecord',
  components: {
    TableList,
    SearchForm,
    SubmitForm,
    PageNum
  },
  data () {
    return {
     searchLabel,
      columns,
      total: 100,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: [],
      title: '详情',
     formStatus: false,
    }
  },
  async mounted () {
    const res = await this.getAccessRecord()
    this.recordList = res.data
  },
  methods: {
    ...mapActions('home', [
      'getAccessRecord'
    ]),
     searchForm (values) {
      console.log(values)
    },
       addOrg () {
      this.formStatus = true
    },
  }
}
</script>
<style lang="less" scoped>
</style>
