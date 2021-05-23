<template>
  <div class="overlay" v-on:keyup.right="goRight" v-on:keyup.left="goLeft">
    <div class="close-cross" @click="$emit('close')">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="30.31px"
        height="30.876px"
        viewBox="0 0 121.31 122.876"
        enable-background="new 0 0 121.31 122.876"
        xml:space="preserve"
      >
        <g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
          />
        </g>
      </svg>
    </div>
    <div class="schevron-left" @click="goLeft">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </div>
    <img :src="media.link" class="photo-opened" />
    <div class="schevron-right" @click="goRight">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoFull",
  props: ["media"],
  data() {
    return {
    };
  },
  created() {
    // this.getImage();
  },
  methods: {
    goLeft() {
      this.$emit("go", false);
    },
    goRight() {
      this.$emit("go", true);
    },
    // async getImage() {
    //   const img = this.media.link;
    //   this.$api
    //     .get(`/media/get-image?link=${img}`, { responseType: "blob" })
    //     .then((response) => {
    //       const self = this;
    //       var reader = new window.FileReader();
    //       reader.readAsDataURL(response.data);
    //       reader.onload = function () {
    //         self.imageSrc = reader.result;
    //       };
    //     });
    // },
  },
  watch: {
    media() {
      this.getImage();
    },
  },
  components: {},
};
</script>
<style scoped>
.overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-cross {
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 50px;
  font-weight: bold;
  z-index: 3;
}

.schevron-left {
  position: absolute;
  top: 45%;
  left: 40px;
  font-size: 50px;
  font-weight: bold;
  z-index: 3;
}
.schevron-right {
  position: absolute;
  top: 45%;
  right: 40px;
  font-size: 50px;
  font-weight: bold;
  z-index: 3;
}

.photo-opened {
  max-height: 80vh;
  max-width: 80vw;
}
</style>