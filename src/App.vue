<template>
  <div id="app">
    <keep-alive>
        <router-view class="view"
                  transition
                  transition-mode="out-in"
                   v-if="$route.meta.keepAlive"
                  >
        </router-view>
    </keep-alive>
    <router-view class="view"
                  transition
                  transition-mode="out-in"
                   v-if="!$route.meta.keepAlive"
                  >
    </router-view>
  </div>
</template>

<script>
 
  export default {
    name: 'App',
   
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app 
  color: #2c3e50
 
</style>
