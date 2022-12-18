<template>
  <div
    style="display: flex; flex-direction: column; width: 100vw; height: 100vh"
  >
    <Navigator class="TopNavigator"></Navigator>
    <div class="BottomContent">
      <LeftNavigator class="LeftNavigator"></LeftNavigator>
      <div class="RightContent">
        <el-card class="box-card" style="width: 50vw">
          <template #header>
            <div class="card-header">
              <strong class="font_1" style="font-size: 30px"
                >Commit Project</strong
              >
              <!-- <el-button class="button" text>Operation button</el-button> -->
            </div>
          </template>
          <div class="CommitContent">
            <div class="font_1">
              <strong style="margin-right: 50px"> Select Job</strong>
              <el-cascader
                v-model="value"
                :options="dataList"
                @change="handleChange"
              />
            </div>

            <div class="font_1">
              <strong>Evidence</strong>
              <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
              >
                <el-icon class="el-icon--upload"
                  ><upload-filled style="height: 70vh"
                /></el-icon>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </div>
            <div
              style="margin-top: 8vh; display: flex; justify-content: flex-end"
            >
              <el-button size="large" @click="commitEvidence()"
                >commit</el-button
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
  name: "Approval",
  components: { LeftNavigator, Navigator },
  data() {
    return {
      dataList: [
        { value: "Approval_A", label: "Approval_A" },
        { value: "Approval_B", label: "Approval_B" },
        { value: "Approval_C", label: "Approval_C" },
      ],
    };
  },
  methods: {
    commitEvidence() {
      console.log("this is evidence!");
    },
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
.CommitContent {
  height: 70vh;
  display: flex;
  flex-direction: column;
}
</style>
