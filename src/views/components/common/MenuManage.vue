<template>
  <div class="qui-fx-f1" id="tableList">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <a-button type="primary" icon="plus">新增系统分类</a-button>
    <a-table style="background-color: #fff; margin-top: 15px" :scroll="{y: this.$tools.setScroll('tableList') - 50}" :rowKey="(record) => record.id" :pagination="false" :columns="columns" :dataSource="menuList">
      <template slot="status" slot-scope="text, record">
        <a-switch v-if="!record.children" :defaultChecked="text"></a-switch>
      </template>
      <template slot="actions" slot-scope="record">
        <a-tooltip v-if="record.children" placement="topLeft" title="新增菜单">
          <a-button size="small" type="primary" icon="plus" @click="addOrg(record)" style="margin-right:5px;"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" icon="form" @click="addOrg(record)" style="margin-right:5px; background: #1890ff; color:#fff"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="删除">
          <a-button size="small" @click="del" icon="delete" style="background: #ff4949; color:#fff"></a-button>
        </a-tooltip>
      </template>
    </a-table>
  </div>

</template>
<script>
import $ajax from '@u/ajax-serve'
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
    title: '系统/菜单名称',
    dataIndex: 'name'
  },
  {
    title: '路径',
    dataIndex: 'url',
    width: '20%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '20%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '创建日期',
    dataIndex: 'time',
    width: '20%'
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: { customRender: 'actions' }
  }
]
export default {
  name: 'MenuManage',
  components: {
    ASwitch: Switch,
    ATooltip: Tooltip,
    SubmitForm
  },
  data () {
    return {
      title: '菜单',
      menuList: [],
      columns,
      formData,
      formStatus: false
    }
  },
  async mounted () {
    const userData = await $ajax.get({
      url: 'http://192.168.2.247:3000/mock/175/menuManage'
    })
    this.menuList = userData.data
  },
  methods: {
    addOrg (record) {
      this.formStatus = true
      console.log(record)
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
