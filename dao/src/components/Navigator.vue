<template>
  <div
    id="root"
    style="display: flex; border-bottom: 5px solid rgb(33, 34, 35)"
  >
    <div id="title">
      <div id="title_image">
        <div
          style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 24px;
          "
        >
          <img
            src="../assets/DAOLogo.png"
            style="width: 100px; height: 100px; margin: auto auto"
          />
        </div>
      </div>
      <div id="title_text">
        <div
          style="
            text-align: center;
            margin-top: 41px;
            margin-left: -140px;
            font-size: 60px;
            color: rgb(237, 198, 99);
            font-family: Georgia, 'Times New Roman', Times, serif;
          "
        >
          Super DAO
        </div>
      </div>
    </div>
    <div id="action"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#title {
  width: 40vw;
  background-color: rgb(36, 37, 38);
  display: flex;
}
#title_image {
  display: flex;
  flex: 1;
  justify-content: center;
}
#title_text {
  display: flex;
  flex: 1;
}
#action {
  display: flex;
  width: 60vw;
  background-color: rgb(36, 37, 38);
}
</style>
