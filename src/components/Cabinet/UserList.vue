<template>
  <div class="user-list">
    <User
      @needUpdate="getUsers"
      v-for="user in users"
      :user="user"
      :key="user.id"
    >
    </User>
    <User @needUpdate="getUsers" :key="1488" :isNew="true"> </User>
  </div>
</template>

<script>
import User from "./User";
export default {
  name: "UserList",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      const data = await this.$api.get("/user");
      this.users = data.data;
    },
  },
  components: {
    User,
  },
};
</script>
