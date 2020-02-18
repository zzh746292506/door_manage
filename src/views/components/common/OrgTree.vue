<template>
  <div class="grade-tree">
    <a-tree
      @select="select"
      :loadData="onLoadData"
      :treeData="treeData"
      showLine
    >
    </a-tree>
  </div>
</template>

<script>
import $ajax from '@u/ajax-serve'
export default {
  name: 'OrgTree',
  props: {
    gradeUrl: {
      type: String,
      default: 'http://192.168.2.247:3000/mock/40/getGrade'
    },
    classUrl: {
      type: String,
      default: 'http://192.168.2.247:3000/mock/40/getClass'
    }
  },
  data () {
    return {
      treeData: [],
      gradeId: '',
      classId: '',
      gradeList: []
    }
  },
  computed: {
  },
  mounted () {
    this.initMenu()
  },
  methods: {
    onExpand () {},
    // 点击节点
    select (obj, tree) {
      const gradeIds = []
      this.gradeList.forEach(el => {
        return gradeIds.push(el.gradeId)
      })
      if (gradeIds.indexOf(obj[0]) === -1) {
        this.classId = obj[0]
      } else {
        this.gradeId = obj[0]
        this.classId = ''
      }
      if (tree.selectedNodes.length === 0) return
      const selectObj = {
        gradeId: this.gradeId,
        key: this.classId,
        code: tree.selectedNodes[0].data.props.pCode,
        title: tree.selectedNodes[0].data.props.title,
        year: tree.selectedNodes[0].data.props.year
      }
      this.$emit('select', selectObj)
    },
    async initMenu () {
      const res = await $ajax.get({ url: 'http://192.168.2.247:3000/mock/40/orgRoot' })
      const selectObj = {
        gradeId: res.data[0].id,
        key: '',
        code: '',
        title: res.data[0].orgName,
        year: ''
      }
      this.gradeList = res.data
      this.treeData = res.data.map(item => {
        return {
          title: item.orgName,
          key: item.id,
          pCode: item.id
        }
      })
      this.onLoadData({
        dataRef: {
          pCode: res.data[0].id,
          key: res.data[0].id
        }
      })
      this.$emit('select', selectObj)
    },
    async onLoadData (treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.orgId = treeNode.dataRef.key
        $ajax.get({
          url: 'http://192.168.2.247:3000/mock/40/orgChild',
          params: {
            gradeId: this.orgId
          }
        }).then(res => {
          treeNode.dataRef.children = res.data.map(item => {
            return {
              title: item.orgName,
              key: item.id,
              isLeaf: item.isLeaf
            }
          })
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    }
  }
}
</script>

<style lang="less" scoed>
  .grade-tree {
    width: 200px;
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto
  }
</style>
