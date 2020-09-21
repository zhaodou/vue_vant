<template>
  <div id="app">
    <tab-header></tab-header>
  </div>
</template>

<script>
import TabHeader from "./components/TabHeader";
export default {
  
  data() {
    return {};
  },
  components: {
    TabHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
