<template>
  <div id="root">
    <Navigator id="navigator" />
    <ShortIntroduction id="short_introduction" />
    <div id="how_to_use" style="background-color: rgb(36, 37, 38)">
      <div
        style="
          margin: 0 auto;
          background-color: rgba(255, 255, 255, 0.05);
          width: 80vw;
          height: 60%;
          margin-top: 50px;
          border-radius: 5% 5% 5% 5%;
          display: flex;
        "
      >
        <div style="flex: 1"></div>
        <div style="flex: 1">
          <p
            style="
              font-size: 70px;
              font-family: Georgia, 'Times New Roman', Times, serif;
              color: white;
              position: relative;
              top: 50px;
            "
          >
            Here you can see your and others' growth and efforts in the virtual
            world and the real world
          </p>
          <div
            style="
              width: 180px;
              height: 75px;
              background-color: antiquewhite;
              position: relative;
              top: 250px;
              border-radius: 10%;
            "
          >
            <p
              style="
                font-size: 30px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-weight: 600;
                position: relative;
                top: 20px;
                left: 40px;
              "
            >
              Check
            </p>
          </div>
        </div>
      </div>
      <div
        style="
          background-color: rgba(255, 255, 255, 0.05);
          margin: 0 auto;
          width: 60vw;
          height: 30%;
          margin-top: 30px;
          border-radius: 5% 5% 5% 5%;
          display: flex;
        "
      >
        <div style="flex: 1"></div>
        <div style="flex: 1">
          <p
            style="
              font-size: 50px;
              font-family: Georgia, 'Times New Roman', Times, serif;
              color: white;
              position: relative;
              top: 50px;
            "
          >
            View recent DAO pending decisions
          </p>
          <div
            style="
              width: 180px;
              height: 75px;
              background-color: antiquewhite;
              position: relative;
              top: 130px;
              border-radius: 10%;
            "
          >
            <p
              style="
                font-size: 30px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-weight: 600;
                position: relative;
                top: 20px;
                left: 50px;
              "
            >
              View
            </p>
          </div>
        </div>
      </div>
    </div>
    <PartnerShip id="partnership" />
    <Ecosystem id="ecosystem" />
  </div>
</template>

<script>
import Ecosystem from "./Ecosystem.vue"; //生态
import Navigator from "./Navigator.vue"; //导航栏
import PartnerShip from "./PartnerShip.vue"; //合作
import ShortIntroduction from "./ShortIntroduction.vue"; //简介
export default {
  components: { Navigator, ShortIntroduction, Ecosystem, PartnerShip },
  name: "home",
  component: {},
};
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
  width: 98 vw;
  height: 250vh;
}
#navigator {
  flex: 1;
  background-color: rgb(36, 37, 38);
}
#short_introduction {
  flex: 5;
  background-color: rgb(36, 37, 38);
}
#how_to_use {
  flex: 8;
  background-color: rgb(36, 37, 80);
}
#ecosystem {
  flex: 2;
  background-color: rgb(36, 37, 38);
}
#partnership {
  flex: 2;
  background-color: rgb(36, 37, 38);
}
</style>
