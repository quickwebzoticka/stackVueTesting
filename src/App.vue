<template>
  <div class="container">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount () {
    if (localStorage.getItem('anketa') === null) localStorage.setItem('anketa', '{}')
    this.$store.dispatch('getInfoFromLocal')
  }
}
</script>

<style lang="scss" src="./assets/style.scss"></style>
