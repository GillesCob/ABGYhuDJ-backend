
<template> 
  <div id="app"> 
    <h1>Axios in Vue</h1> 
    <DataFetcher/> 
  </div> 
</template>

<script>
import DataFetcher from './components/DataFetcher.vue'

export default {
  name: 'App',
  components: {
    DataFetcher
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
