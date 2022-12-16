<template>
  <div style="display: flex; flex-direction: column">
    <router-link to="/me" class="GetPersonalInfo">Me</router-link>
    <router-link to="/reward" class="GetReward">Reward</router-link>
    <router-link to="/job" class="GetJob">Job</router-link>
    <router-link to="/approval" class="GetApproval">Approval</router-link>
  </div>
</template>
<script>
export default {
  name: "LeftNavigator",
  methods: {
    go() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.GetPersonalInfo {
  background-color: rgb(36, 37, 38);
  width: 100%;
  height: 7vh;
  text-align: center;
  line-height: 7vh;
  color: rgb(192, 192, 192);
  font-size: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
  border-bottom: 1px solid;
}
.GetReward {
  background-color: rgb(36, 37, 38);
  width: 100%;
  height: 7vh;
  text-align: center;
  line-height: 7vh;
  color: rgb(192, 192, 192);
  font-size: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
  border-bottom: 1px solid;
}
.GetJob {
  background-color: rgb(36, 37, 38);
  width: 100%;
  height: 7vh;
  text-align: center;
  line-height: 7vh;
  color: rgb(192, 192, 192);
  font-size: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
  border-bottom: 1px solid;
}
.GetApproval {
  background-color: rgb(36, 37, 38);
  width: 100%;
  height: 7vh;
  text-align: center;
  line-height: 7vh;
  color: rgb(192, 192, 192);
  font-size: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
  border-bottom: 1px solid;
}
</style>
