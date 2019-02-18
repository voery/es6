<template>
  <div id="app">
    <div class="left">
      <left></left>  
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import left from './components/leftBar/left.vue'

export default {
  name: 'app',
  components: {
    left
  }
}
</script>

<style lang="less">
@import './less/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  .left{
     width: 30%;
     border-right: 1px solid #ddd;
     box-sizing: border-box;
     position: fixed;
     left:0;
     overflow-y: scroll;
     height: 100%;
  }
  .right{
    width: 70%;
    box-sizing: border-box;
    margin-left: 30%;
  }
}
</style>
