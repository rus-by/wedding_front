<template>
  <div class="message">
    <p class="list">ОТПРАВИТЬ СООБЩЕНИЕ</p>

    <textarea v-model="message" class="tarea"> </textarea>
    <div class="send" @click="sendMessage">
      <p>Отправить</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      message: "",
    };
  },

  methods: {
    async sendMessage() {
      this.$api.post("/notification", { message: this.message });
    },
  },
  components: {},
};
</script>
<style>
.tarea {
  width: 100%;
  height: 136px;
  font-size: 24px;
}
.send {
  margin-top: 56px;
  width: 246px;
  height: 40px;
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(180deg, #3b8bea 0%, #003a88 100%);
}
.list {
  color: #0e4d9f;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 44px;
}
.message {
  background-color: #f6f6f6;
  padding: 24px 15px 57px 15px;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 840px) {
  .message {
    background-color: transparent;
  }
  .list {
    font-size: 15px !important;
  }

  .send {
    width: 120px;
    height: 24px;
    font-size: 10px;
    margin-top: 30px;
  }
}
</style>