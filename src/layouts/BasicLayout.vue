<template>
  <a-layout class="qui-fx">
    <div :class="['slide-left', {'slide-left-close': slideTag}]">
      <side-menu
        mode="inline"
        :menus="menus"
        theme="light"
        :slide-tag="slideTag"
        :collapsed="collapsed"
      ></side-menu>
    </div>
    <div class="qui-fx-f1 qui-fx qui-fx-ver">
      <header-top @toggle="toggle" :slide-tag="slideTag"></header-top>
      <div class="qui-fx-f1 qui-fx-ver content-bg">
        <route-navigator></route-navigator>
        <route-view />
      </div>
    </div>
  </a-layout>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'

import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import HeaderTop from '@/components/GlobalHeader/HeaderTop'
import asyncRouterMap from '../config/router.config.js'
import RouteNavigator from '@c/RouteNavigator'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    HeaderTop,
    RouteNavigator
  },
  data () {
    return {
      slideTag: false,
      menus: asyncRouterMap
    }
  },
  computed: {
  },
  created () {
    this.menus = this.menus.find(item => item.path === '/').children.filter(item => {
      return !item.meta.isHide
    })
    console.log(this.menus)
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
  },
  methods: {
    toggle () {
      this.slideTag = !this.slideTag
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
.content-bg {
  background-color: #f5f5fb;
  padding: 5px 15px 15px;
}
.slide-left {
  transition: width .3s ease;
  width: 240px;
  overflow: hidden;
}
.slide-left-close {
  width: 50px;
}
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
