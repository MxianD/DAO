<template>
  <div
    style="display: flex; flex-direction: column; width: 100vw; height: 100vh"
  >
    <Navigator class="TopNavigator"></Navigator>
    <div class="BottomContent">
      <LeftNavigator class="LeftNavigator"></LeftNavigator>
      <div class="RightContent">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  height: 5vh;
                  justify-content: space-evenly;
                "
              >
                <div style="display: flex">
                  <span style="margin-top: 4px" class="font_1"
                    >Name: {{ nickName }}</span
                  >
                  <!-- <el-input v-model="input" :placeholder="nickName" style="" /> -->
                </div>

                <span style="margin-top: 20px" class="font_1"
                  >Reputation: {{ reputation }}</span
                >
              </div>
            </div>
          </template>
          <div>
            <div style="display: flex; flex-direction: column; height: 20vh">
              <span style="" class="font_1">Level: {{ level }} </span>
              <span style="margin-top: 15px" class="font_1"
                >Token: {{ token }}</span
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNavigator from "./LeftNavigator.vue";
import Navigator from "./Navigator.vue";

export default {
  name: "Me",
  components: { LeftNavigator, Navigator },
  data() {
    return {
      nickName: "Lord",
      reputation: "King",
      level: 100,
      token: 100,
    };
  },
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
/* .LeftNavigator ::v-deep .GetPersonalInfo {
  background-color: aliceblue;
} */
.RightContent {
  background-color: rgb(67, 67, 67);
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
