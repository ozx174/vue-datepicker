<template>
  <transition :name="transitionName">
    <keep-alive>
      <router-view class="view-wrapper"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
  export default {
    props: {
      transitionName: {
        type: String,
        default: 'next'
      }
    }
  }
</script>

<style lang="stylus">
  .view-wrapper
    overflow-x: hidden
    overflow-y: auto
    position: absolute
    width: 100%;
    max-width 750px
    top: 0
    bottom: 0
    background: #fff
</style>
