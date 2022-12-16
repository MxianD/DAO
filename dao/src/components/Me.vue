<template>
  <div
    style="display: flex; flex-direction: column; width: 100vw; height: 100vh"
  >
    <Navigator class="TopNavigator"></Navigator>
    <div class="BottomContent">
      <LeftNavigator class="LeftNavigator"></LeftNavigator>
      <div class="RightContent">Me</div>
    </div>
  </div>
</template>

<script>
import LeftNavigator from "./LeftNavigator.vue";
import Navigator from "./Navigator.vue";

export default {
  name: "Me",
  components: { LeftNavigator, Navigator },
};
</script>

<style scoped>
.TopNavigator {
  background-color: rgb(36, 37, 38);
  flex: 1;
}
.BottomContent {
  flex: 9;
  display: flex;
  flex-direction: row;
}
.LeftNavigator {
  background-color: rgb(36, 37, 38);
  flex: 1;
}
.RightContent {
  background-color: blueviolet;
  flex: 7;
}
</style>
