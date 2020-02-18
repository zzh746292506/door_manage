<template>
  <div class="header-top">
    <a-row type="flex" justify="end">
      <a-col style="font-size: 18px;" v-if="false">
        <a-icon style="vertical-align: -0.15em; cursor: pointer" :type="slideTag ? 'menu-unfold' : 'menu-fold'" @click="toggle"/>
        <span style="padding-left: 10px;">武汉全品平安校园云平台</span>
      </a-col>
      <a-col>
        <a-dropdown>
          <div class="qui-fx-ac">
            <span>管理员</span>
            <div class="user-icon"></div>
          </div>
          <a-menu slot="overlay">
            <a-menu-item key="1">个人中心</a-menu-item>
            <a-menu-item key="2">帮助中心</a-menu-item>
            <a-menu-item key="3">操作指引</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserMenu from '../tools/UserMenu'
export default {
  name: 'HeaderTop',
  props: {
    slideTag: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserMenu
  },
  methods: {
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="less" scoped>
  .header-top {
    height: @head-h;
    padding: 0 10px;
    line-height: @head-h;
    color: @head-fff;
    width: 100%;
    background-color: @head-color;
  }
  .user-icon {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    background-color: #ccc;
    border-radius: 100%;
  }
</style>
