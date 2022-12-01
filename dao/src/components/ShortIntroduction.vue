<template>
  <div
    id="root"
    style="
      background-color: rgb(36, 37, 38);
      display: flex;
      justify-content: center;
    "
  >
    <div
      style="
        background-color: blue;
        height: 80%;
        width: 80vw;
        margin-top: 65px;
        display: flex;
      "
    >
      <div id="short_text">
        <div style="flex: 3">
          <p
            style="
              font-size: 50px;
              font-family: Georgia, 'Times New Roman', Times, serif;
              color: white;
              position: relative;
              top: 180px;
            "
          >
            Achieving Personal Progress and Growth in the Metaverse
          </p>
        </div>
        <div style="flex: 1; display: flex">
          <p
            style="
              font-size: 25px;
              font-family: Georgia, 'Times New Roman', Times, serif;
              color: white;
              position: relative;
              top: -150px;
            "
          >
            Here you can project real world achievements into the virtual world,
            let's get started!
          </p>
          <div
            style="
              width: 180px;
              height: 75px;
              background-color: antiquewhite;
              position: relative;
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
              <router-link to="/system">Start</router-link>
            </p>
          </div>
        </div>
      </div>
      <div id="short_image">
        <div style="height: 100%; border-radius: 50%">
          <img
            src="../assets/shortintroduction.jpg"
            style="height: 100%; margin-left: 130px; overflow: hidden"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#short_text {
  flex: 5;
  display: flex;
  flex-direction: column;
  background-color: rgb(36, 37, 38);
}
#short_image {
  flex: 3;
  background-color: rgb(36, 37, 38);
}
</style>
