<template>
  <div class="qui-fx-f1" id="tableList">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <no-data v-if="data.length === 0" msg="暂无组织机构~">
      <a-button type="primary" slot="btn">添加机构</a-button>
    </no-data>
    <a-table
      :defaultExpandAllRows="true"
      :pagination="false"
      :columns="columns"
      :dataSource="data"
      style="background-color: #fff"
      :scroll="{y: this.$tools.setScroll('tableList')}"
      :rowKey="(record) => record.id">
      <template slot="status" slot-scope="text">
        <div>
          <a-switch :defaultChecked="text"></a-switch>
        </div>
      </template>
      <template slot="actions" slot-scope="record">
        <a-tooltip placement="topLeft" title="新增子级">
          <a-button type="primary" icon="plus" @click="addOrg(record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="编辑">
          <a-button icon="form" @click="addOrg(record)" style="margin: 0 5px; background: #1890ff; color:#fff"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="删除">
          <a-button @click="del" icon="delete" style="background: #ff4949; color:#fff"></a-button>
        </a-tooltip>
      </template>
    </a-table>
  </div>

</template>
<script>
import NoData from './NoData'
import SubmitForm from './SubmitForm'
import { Switch, Tooltip } from 'ant-design-vue'
export {
  default as FormOutline
}
  from '@ant-design/icons/lib/outline/FormOutline'
export {
  default as DeleteOutline
}
  from '@ant-design/icons/lib/outline/DeleteOutline'
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '机构名称',
    placeholder: '请输入组织机构名称'
  },
  {
    value: 'status',
    initValue: true,
    list: [
      {
        key: true,
        val: '启用'
      },
      {
        key: false,
        val: '禁用'
      }
    ],
    type: 'radio',
    label: '是否启用',
    placeholder: '请选择是否启用'
  }
]
const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '12%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '创建日期',
    dataIndex: 'address',
    width: '30%'
  },
  {
    title: '操作',
    width: '30%',
    scopedSlots: { customRender: 'actions' }
  }
]

const data = [
  {
    id: '1',
    name: '武汉全品文教',
    status: true,
    address: '2019-10-10',
    children: [
      {
        id: '11',
        name: '小学事业部',
        status: true,
        address: '2019-10-10'
      },
      {
        id: '12',
        name: 'AI教育中心',
        status: true,
        address: '2019-10-10',
        children: [
          {
            id: '121',
            name: '研发部',
            status: true,
            address: '2019-10-10'
          },
          {
            id: '122',
            name: '产品部',
            status: true,
            address: '2019-10-10'
          }
        ]
      }
    ]
  }
]

export default {
  name: 'OrgManage',
  components: {
    ASwitch: Switch,
    ATooltip: Tooltip,
    SubmitForm,
    NoData
  },
  data () {
    return {
      title: '组织机构',
      data,
      columns,
      formData,
      formStatus: false
    }
  },
  methods: {
    addOrg (record) {
      this.formStatus = true
    },
    submitForm (values) {
      const menu = {
        key: Math.random() * 10000,
        name: values.name,
        status: values.status,
        address: '2019/12/18'
      }
      this.data[0].children.push(menu)
      this.$refs.form.reset()
    },
    del () {
      this.$tools.delTip('确定删除吗?', () => {
      })
    }
  }
}
</script>
