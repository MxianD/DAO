<template>
  <div id="app">
    <!-- <CrowdFund /> -->
    <Home />
  </div>
</template>

<script>
// import CrowdFund from "./components/CrowdFund.vue";
import Home from "./components/Home.vue";
export default {
  name: "app",
  components: {
    Home,
  },
};
</script>
<style>
* {
  margin: 0;
}
</style>
