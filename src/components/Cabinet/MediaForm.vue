<template>
  <div class="media-form">
    <input
      type="file"
      ref="fileinp"
      @change="selectFiles"
      accept="image/x-png,image/gif,image/jpeg"
      multiple
    />
    <input type="text" v-model="videoUrl" />
    <button @click="newPhotos">load</button>
  </div>
</template>

<script>
export default {
  name: "MediaForm",
  data() {
    return {
      files: [],
      videoUrl: "",
    };
  },
  methods: {
    async selectFiles() {
      this.files = this.$refs.fileinp.files;
    },
    async newPhotos() {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }
      await this.$api.post("/media/upload-images", formData);
    },
    async newVideoUrl() {
      await this.$api.post("/media/upload-video", { link: this.videoUrl });
    },
  },
  components: {},
};
</script>
<style scoped>
</style>