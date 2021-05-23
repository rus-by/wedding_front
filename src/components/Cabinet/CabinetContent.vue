<template>
  <div class="cabinet-content">
    <cabinet-header @tabChange="tabChange" :currentTab="choosenTab" />

    <users-edit class="container" v-if="choosenTab === 1" />
    <events-edit class="container" v-if="choosenTab === 2" />
    <Messages class="container" v-if="choosenTab === 3"> </Messages>

    <photo-edit class="container" v-if="choosenTab === 4" />
  </div>
</template>

<script>
import CabinetHeader from "./CabinetHeader.vue";

import EventsEdit from "./EventsEdit.vue";
import Messages from "./Messages.vue";
import PhotoEdit from "./PhotoEdit.vue";
import UsersEdit from "./UsersEdit.vue";

export default {
  name: "CabinetContent",
  data() {
    return {
      users: [],
      choosenTab: 1,
    };
  },
  created() {
    if (this.$route.query.tab) {
      this.choosenTab = +this.$route.query.tab;
    }
    this.getUsers();
  },
  methods: {
    tabChange(val) {
      this.choosenTab = val;
    },
    async getUsers() {
      const data = await this.$api.get("/user");
      this.users = data.data;
    },
  },
  components: {
    CabinetHeader,
    UsersEdit,
    EventsEdit,
    Messages,
    PhotoEdit,
  },
};
</script>
<style>
.container {
  margin: 0 auto;
  max-width: 1170px;
}
.manage-little-cell {
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.cabinet-content {
  font-family: "Montserrat" !important;
}
@media screen and (max-width: 840px) {
  .container {
    max-width: 90%;
  }
}
</style>