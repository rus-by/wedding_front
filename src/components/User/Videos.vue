<template>
  <div>
    <p class="video" v-if="videos.length">Видео</p>
    <iframe
      class="frame"
      v-for="video in videos"
      :key="video.id"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      :src="video.link"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  name: "VideoList",

  data() {
    return {
      videos: [],
    };
  },
  created() {
    this.getVideos();
  },
  methods: {
    async getVideos() {
      const data = await this.$api.get("/media/videos");
      this.videos = data.data;
    },
  },
  components: {},
};
</script>
<style scoped>
.video {
  font-size: 80px;
  margin-top: 40px;
  font-family: "GoodVibes";
}
.frame {
  width: 360px;
  height: 240px;
  display: block;
  margin-top: 20px;
}
@media screen and (max-width: 840px) {
  .video {
    margin-top: 20px;
    font-size: 30px;
  }
  .frame {
    width: 105px;
    height: 84px;
  }
}
</style>