<template>
  <div v-if="readonly" class="video-read">
    <div class="cell-td link">{{ video.link }}</div>
    <div class="manage-edit-cell">
      <div class="cell-td manage-little-cell" @click="startEdit">
        <img src="@/assets/edit.png" alt="" />
      </div>
      <div class="cell-td manage-little-cell" @click="deleteVideo">
        <img src="@/assets/delete.png" alt="" />
      </div>
    </div>
  </div>

  <div v-else class="video-edit">
    <div class="cell-td link">
      <input v-model="videoUrl" type="text" class="input-video" />
    </div>
    <div class="manage-edit-cell">
      <div class="cell-td manage-little-cell ok" @click="handleOk">
        <img src="@/assets/check.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Messages",
  props: ["isNew", "video"],
  data() {
    return {
      message: "",
      readonly: true,
      videoUrl: "",
    };
  },
  created() {
    if (this.isNew) {
      this.readonly = false;
    }
  },
  methods: {
    handleOk() {
      this.isNew ? this.newVideoUrl() : this.editVideo();
    },
    startEdit() {
      this.readonly = false;
      if (this.video) {
        this.fillInputs();
      }
    },
    fillInputs() {
      this.videoUrl = this.video.link;
    },
    async newVideoUrl() {
      await this.$api.post("/media/upload-video", { link: this.videoUrl });
      this.needReload();
    },
    async editVideo() {
      await this.$api.put(`/media/${this.video.id}`, { link: this.videoUrl });
      this.readonly = true;
      this.needReload();
    },
    async deleteVideo() {
      await this.$api.delete(`/media/${this.video.id}`);
      this.needReload();
    },
    needReload() {
      this.$emit("needUpdate");
    },
  },
  components: {},
};
</script>
<style scoped>
.video-edit {
  display: flex;
  height: 40px;
  align-items: center;
}
.video-read {
  display: flex;
  height: 40px;
  align-items: center;
}
.input-video {
  width: 916px;
}
.ok {
  cursor: pointer;
}
.manage-edit-cell {
  width: 208px;
  padding-left: 8px;
  display: flex;
  justify-items: space-between;
}
@media screen and (max-width: 840px) {
  .video-edit,
  .video-read {
    font-size: 10px;
  }
  .input-video {
    width: 220px;
    margin-top: 2px;
  }
}
</style>