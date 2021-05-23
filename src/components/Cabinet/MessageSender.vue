<template>
  <div class="message-sender">
    <input type="text" v-model="message" />
    <button @click="send">send</button>
  </div>
</template>

<script>
export default {
  name: "MessageSender",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async send() {
      this.$api.post("/notification", { message: this.message });
    },
  },
  components: {},
};
</script>
