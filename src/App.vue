<template>
  <div id="app">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="content">
      <!-- <transition name="slide" mode="out-in" appear> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      <!-- </transition> -->
    </div>
    
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'

export default {
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif
}
#app {
  overflow: hidden;
}
.content {
  padding: 115px 15px 30px;
}
.slide-enter {
  opacity: 0;
  transform: translateX(-200px);
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.slide-enter-active, .slide-leave-active {
  transition: 1s ease-in-out;
}
</style>
