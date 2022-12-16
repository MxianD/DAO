<template>
  <div
    id="root"
    style="display: flex; border-bottom: 5px solid rgb(33, 34, 35)"
  >
    <router-link to="/">
      <div id="title">
        <div id="title_image">
          <div
            style="
              width: 100px;
              height: 100px;
              border-radius: 50%;
              overflow: hidden;
            "
          >
            <img
              src="../assets/DAOLogo.png"
              style="width: 100px; height: 100px"
            />
          </div>
        </div>
        <div id="title_text">Super DAO</div>
      </div>
    </router-link>

    <div id="action"></div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
#title {
  width: 40vw;
  background-color: rgb(36, 37, 38);
  display: flex;
  align-items: center;
  height: 150px;
}
#title_image {
  margin-left: 170px;
  /* margin-top: 24px; */
}
#title_text {
  text-align: center;
  font-size: 60px;
  color: rgb(237, 198, 99);
  font-family: Georgia, "Times New Roman", Times, serif;
  height: 100px;
  line-height: 100px;
  margin-left: 24px;
}
#action {
  display: flex;
  width: 60vw;
  background-color: rgb(36, 37, 38);
}
</style>
