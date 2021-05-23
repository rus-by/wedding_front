<template>
  <div class="cabinet">
    <login-form @success="isAuth = true" v-if="!isAuth"> </login-form>
    <cabinet-content v-else> </cabinet-content>
  </div>
</template>

<script>
import CabinetContent from "../components/Cabinet/CabinetContent.vue";

import LoginForm from "../components/Cabinet/LoginForm.vue";
export default {
  name: "Cabient",
  data() {
    return {
      isAuth: false,
    };
  },
  async created() {
    const res = await this.getMe();
    if (res.data.state === 10) {
      this.isAuth = true;
    }
  },

  methods: {
    async getMe() {
      return this.$api.post("/passport/me");
    },
  },
  components: {
    LoginForm,
    CabinetContent,
  },
};
</script>
<style scoped>
.cabinet {
}
</style>