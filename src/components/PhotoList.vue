<template>
  <div class="photo-list" v-if="photos.length">
    <media
      v-for="photo in photos"
      :media="photo"
      :key="photo.id"
      @openMedia="openMedia"
      @needUpdate="getPhotos"
      :isAdmin="isAdmin"
      class="media-outer"
    >
    </media>

    <photo-full
      v-if="photoOpened"
      :media="photoOpened"
      @close="closePhoto"
      @go="movePhoto"
    />
  </div>
  <div class="photo-stub" v-else-if="!isAdmin">
    Скоро здесь появятся фотографии :)
  </div>
</template>

<script>
import PhotoFull from "./Cabinet/PhotoFull.vue";
import Media from "./Cabinet/PhotoPreview.vue";
export default {
  name: "PhotoList",
  props: ["isAdmin"],
  data() {
    return {
      photos: [],
      photoOpenedIdx: 0,
      photoOpened: null,
    };
  },
  created() {
    this.getPhotos();
  },
  methods: {
    closePhoto() {
      this.photoOpened = null;
      this.photoOpenedIdx = 0;
    },
    movePhoto(value) {
      this.photoOpenedIdx = value
        ? this.photoOpenedIdx + 1
        : this.photoOpenedIdx - 1;
      if (this.photoOpenedIdx + 1 > this.photos.length) {
        this.photoOpenedIdx = 0;
      }
      if (this.photoOpenedIdx < 0) {
        this.photoOpenedIdx = this.photos.length - 1;
      }
      this.photoOpened = this.photos[this.photoOpenedIdx];
    },
    async getPhotos() {
      const data = await this.$api.get("/media/images");
      this.photos = data.data;
    },
    openMedia(photo) {
      const idx = this.photos.findIndex((img) => img === photo);
      this.photoOpenedIdx = idx;
      this.photoOpened = photo;
    },
  },
  components: {
    Media,
    PhotoFull,
  },
};
</script>
<style scoped>
.photo-list {
  display: flex;
  flex-wrap: wrap;
}
.media-outer {
  margin-top: 30px;
  margin-left: 30px;
}

.photo-stub {
  font-size: 40px;
}

@media screen and (max-width: 840px) {
  .media-outer {
    margin-top: 9px;
    margin-left: 0px;
    margin-right: 9px;
  }
  .photo-stub {
    font-size: 20px;
  }
}
</style>