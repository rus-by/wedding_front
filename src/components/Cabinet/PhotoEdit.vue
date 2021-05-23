<template>
  <div class="photo-edit">
    <p class="list photo-list">ФОТОГРАФИИ</p>

    <photo-list class="photos" ref="photoList" :isAdmin="true" />
    <label class="pretty-file">
      Выбрать файлы
      <input
        type="file"
        ref="fileinp"
        @change="selectFiles"
        accept="image/x-png,image/gif,image/jpeg"
        class="custom-file-input"
        multiple
      />
    </label>

    <p class="list video-list">ВИДЕО</p>
    <div class="table-videos">
      <div class="th link">Ссылка</div>
      <div class="th manage-edit-cell">Управление</div>
    </div>
    <video-row
      @needUpdate="getVideos"
      v-for="(video, idx) in videos"
      :video="video"
      :class="idx % 2 === 0 ? 'even' : 'odd'"
      :key="video.id"
    />

    <video-row
      :isNew="true"
      v-if="adding"
      @needUpdate="getVideos"
      :mainEvent="event"
      :key="228"
    />
    <div
      class="add-video"
      :class="adding ? 'red' : 'blue'"
      @click="adding = !adding"
    >
      <p>{{ adding ? "Отменить" : "Добавить видео" }}</p>
    </div>
  </div>
</template>

<script>
import PhotoList from "../PhotoList.vue";
import VideoRow from "./VideoRow.vue";

export default {
  name: "Messages",
  data() {
    return {
      message: "",
      readonly: true,
      videos: [],
      adding: false,
    };
  },
  created() {
    this.getVideos();
  },
  methods: {
    async selectFiles() {
      this.files = this.$refs.fileinp.files;
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }
      await this.$api.post("/media/upload-images", formData);
      this.$refs.photoList.getPhotos();
    },
    async getVideos() {
      const data = await this.$api.get("/media/videos");
      this.videos = data.data;
      this.adding = false;
    },
  },
  components: {
    PhotoList,
    VideoRow,
  },
};
</script>
<style>
.photos {
  margin-top: -30px;
  margin-left: -30px;
}
.video-list {
  margin-top: 120px !important;
}
.add-video {
  margin-top: 56px;
  width: 246px;
  height: 40px;
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}
.red {
  background: linear-gradient(180deg, #b2384f 0%, #ff103d 100%);
}
.blue {
  background: linear-gradient(180deg, #3b8bea 0%, #003a88 100%);
}
.pretty-file {
  margin-top: 56px;
  width: 246px;
  height: 40px;
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(180deg, #3b8bea 0%, #003a88 100%);
}

.pretty-file input[type="file"] {
  display: none;
}
.list {
  color: #0e4d9f;
  font-size: 36px;
  font-weight: bold;
}
.photo-list {
  margin-bottom: 20px !important;
}
.photo-edit {
  background-color: #f6f6f6;
  padding: 24px 15px 57px 15px;
  display: flex;
  flex-direction: column;
}

.table-videos {
  font-size: 15px;
  display: flex;
}
.link {
  width: 950px;
  padding-left: 8px;
  border-right: 6px solid #f6f6f6;
}
.manage-edit-cell {
  width: 208px;
}

@media screen and (max-width: 840px) {
  .photos {
    margin: 0;
  }
  .pretty-file {
    font-size: 10px;
    width: 120px;
    height: 25px;
    margin-top: 20px;
  }
  .video-list {
    margin-top: 64px !important;
  }
  .table-videos {
    margin: 0;
  }
  .link {
    width: 66%;
  }
  .add-video {
    width: 120px;
    height: 24px;

    font-size: 10px;
  }
  .photo-edit {
    background-color: transparent;
    padding: 24px 0 57px 0;
  }
}
</style>