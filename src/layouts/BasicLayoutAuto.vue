<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <side-menu
      v-if="isMobile()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="false"
      :collapsible="true"
      @menuSelect="menuSelect"
    ></side-menu>
    <side-menu
      @toggle="toggle"
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', margin: multiTab ? '24px 24px 0' : '24px 24px 0', paddingTop: fixedHeader ? '40px' : '0' }">
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>

</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import MultiTab from '@/components/MultiTab'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import asyncRouterMap from '../config/router.config.js'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: asyncRouterMap
    }
  },
  computed: {
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '50px'
      }
      if (this.sidebarOpened) {
        return '220px'
      }
      return '50px'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
      document.querySelector('.ant-layout-sider').style.width = '50px !important'
      document.querySelector('.ant-layout-sider').style.maxWidth = '50px !important'
      document.querySelector('.ant-layout-sider').style.flex = ' 0 0 50px !important'
    }
  },
  created () {
    this.menus = this.menus.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '220px' : '50px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '50px') || '0')
      }
      return left
    },
    menuSelect () {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose () {
      this.collapsed = false
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
