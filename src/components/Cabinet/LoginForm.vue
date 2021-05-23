<template>
  <div class="login">
    <input type="text" placeholder="Логин" v-model="username" />
    <input type="password" placeholder="Пароль" v-model="password" />
    <button @click="auth">Войти</button>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    auth() {
      return this.$api
        .post("/passport/login-admin", {
          username: this.username,
          password: this.password,
        })
        .then((data) => {
          if (data.data.state === 10) {
            this.$emit("success");
          } else {
            alert(data.data.message);
          }
         
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  components: {},
};
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25%
}
</style>