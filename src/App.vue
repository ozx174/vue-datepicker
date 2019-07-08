<template>
  <div id="app">
    <router-view :transitionName="transitionName"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      transitionName () {
        return this.$store.state.effect
      }
    }
  }
</script>

<style lang="stylus">
  #app
    width: 100%;
    height: 100%;
    margin: 0 auto
    max-width 750px
</style>
