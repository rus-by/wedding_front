<template>
  <div :class="!isAdmin ? 'media' : 'little-media'">
    <img
      @click="openMedia"
      :src="media.previewLink"
      :class="!isAdmin ? 'media' : 'little-media'"
    />
    <span class="trash-icon ok" @click="deleteMedia" v-if="isAdmin">
      <img src="@/assets/trash.png" alt=""
    /></span>
  </div>
</template>

<script>
export default {
  name: "Media",
  props: ["isAdmin", "media"],
  data() {
    return {
    };
  },
  created() {
    this.getImage();
  },
  methods: {
    async deleteMedia() {
      await this.$api.delete(`/media/${this.media.id}`);
      this.needReload();
    },
    openMedia() {
      this.$emit("openMedia", this.media);
    },
    needReload() {
      this.$emit("needUpdate");
    },
    async getImage() {
      // const img = this.media.previewLink;
      // this.$api
      //   .get(`/media/get-image?link=${img}`, { responseType: "blob" })
      //   .then((response) => {
      //     const self = this;
      //     var reader = new window.FileReader();
      //     reader.readAsDataURL(response.data);
      //     reader.onload = function () {
      //       self.imageSrc = reader.result;
      //     };
      //   });
      this.imageSrc = 'https://events-manager-228.s3.amazonaws.com/Double_Vertical_5.jpg'
    },
  },
  components: {},
};
</script>
<style scoped>
.media {
  width: 360px;
  height: 240px;
  cursor: pointer;
}
.trash-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.little-media {
  width: 213px;
  height: 170px;
  position: relative;
  cursor: pointer;
}
.ok {
  cursor: pointer;
}

@media screen and (max-width: 840px) {
  .little-media {
    width: 103px;
    height: 83px;
  }
  .media {
    width: 103px;
    height: 83px;
  }
}
</style>