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
              <h3 class="font_1" style="font-size: 30px">Job</h3>
              <!-- <el-button class="button" text>Operation button</el-button> -->
            </div>
          </template>
          <div>
            <el-table
              :data="dataList"
              style="width: 100%"
              :row-style="{ fontFamily: 'Georgia', fontSize: '20px' }"
            >
              <el-table-column label="Title" prop="title" />

              <el-table-column label="Description" prop="desc" />
              <el-table-column label="Reward" prop="reward" />
              <el-table-column label="Num" prop="num" />
            </el-table>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 20px">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
            />
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
  name: "Job",
  components: { LeftNavigator, Navigator },
  data() {
    return {
      dataList: [
        {
          title: "Approval_A",
          desc: "Help us review a certain amount of proof materials every day to get paid, otherwise you will be punished",
          reward: "reward:token:1 punishment:token:-1",
          num: 1,
        },
        {
          title: "Approval_B",
          desc: "Help us review a certain amount of proof materials every day to get paid, otherwise you will be punished",
          reward: "reward:token:1 punishment:token:-1",
          num: 1,
        },
        {
          title: "Approval_C",
          desc: "Help us review a certain amount of proof materials every day to get paid, otherwise you will be punished",
          reward: "reward:token:1 punishment:token:-1",
          num: 1,
        },
      ],
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
.RightContent {
  background-color: rgb(67, 67, 67);
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-table thead {
  color: black;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 20px;
}
</style>
