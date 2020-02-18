<template>
  <div class="qui-fx-f1" id="tableList" style="width: 500px">
    <a-table style="background-color: #fff;" :scroll="{y: this.$tools.setScroll('tableList')}" :rowKey="(record) => record.id" :pagination="false" :columns="columns" :dataSource="menuList">
      <template slot="actions" slot-scope="record">
        <a-checkbox v-if="!record.children" @change="onChange($event, record)"></a-checkbox>
      </template>
    </a-table>
  </div>

</template>
<script>
import $ajax from '@u/ajax-serve'
const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name'
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: { customRender: 'actions' }
  }
]
export default {
  name: 'ConfigMenu',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    chooseValue: {
      get () {
        return this.value
      },
      set (nVal) {
        this.$emit('input', nVal)
      }
    }
  },
  components: {
  },
  data () {
    return {
      menuList: [],
      columns
    }
  },
  async mounted () {
    const userData = await $ajax.get({
      url: 'http://192.168.2.247:3000/mock/175/menuManage'
    })
    this.menuList = userData.data
  },
  methods: {
    onChange (event, record) {
      const isChoose = event.target.checked
      if (isChoose) {
        this.chooseValue.push({
          id: record.id,
          name: record.name
        })
      } else {
        this.chooseValue = this.chooseValue.filter(item => {
          return item.id !== record.id
        })
      }
    }
  }
}
</script>
