<template>
  <app-nav-bar></app-nav-bar>
  <div class="pages-container">
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavBar from './components/AppNavBar.vue'

export default {
  components: { AppNavBar }
}
</script>

<style lang="scss" scoped>
  .pages-container {
    margin: 20px auto;
    width: 60%;
  }
</style>
