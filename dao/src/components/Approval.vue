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
                v-model="user.userJobId"
                :options="userJobList"
                @change="handleChange"
              />
            </div>

            <div class="font_1">
              <strong>Evidence</strong>
              <el-upload
                class="upload-demo"
                drag
                action="http://127.0.0.1:8080/job/commit"
                multiple
                ref="upload"
                :data="user"
                name="image"
                :auto-upload="false"
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
              <el-button class="ml-3" type="success" @click="submitUpload">
                upload to server
              </el-button>
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
import qs from "qs";
export default {
  name: "Approval",
  components: { LeftNavigator, Navigator },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      userJobList: [],
      user: {
        useraddress: "0xecd7317B4d5A00716f30f12ef855A57A59DD9253",
        userJobId: 0,
      },
    };
  },
  methods: {
    submitUpload() {
      if (this.user.userJobId == 0) {
        alert("Please choose Job!");
      } else {
        this.$refs.upload.submit();
      }
    },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      await this.axios
        .post(
          "http://127.0.0.1:8080/job/getSelfUserJob",
          qs.stringify({
            useraddress: "0xecd7317B4d5A00716f30f12ef855A57A59DD9253",
          })
        )
        .then((res) => {
          console.log("Approval", res.data.userJobList);
          //  this.userJobList = res;
          for (let i = 0; i < res.data.userJobList.length; i++) {
            let obj = {
              value: "",
              label: "",
            };
            obj.value = res.data.userJobList[i].title;
            obj.label = res.data.userJobList[i].title;
            this.userJobList.push(obj);
            console.log("i", i, this.userJobList);
          }
        });
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
