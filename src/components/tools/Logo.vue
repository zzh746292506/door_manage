<template>
  <div class="logo" style="font-size: 22px;">
    <span>{{ !slideTag ? userInfo.protalName : '全品' }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Logo',
  props: {
    slideTag: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  computed: {
    ...mapState('home', [
      'userInfo'
    ])
  }
}
</script>
