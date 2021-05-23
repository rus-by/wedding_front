<template>
  <div>
    <cabinet-header />
    <div class="editPage">
      <guest-edit v-if="show === 1" />
      <subevent-edit v-if="show === 2" />
    </div>
  </div>
</template>

<script>
import CabinetHeader from "../components/Cabinet/CabinetHeader.vue";
import GuestEdit from "../components/Cabinet/Mobile/GuestEdit.vue";
import SubeventEdit from "../components/Cabinet/Mobile/SubeventEdit.vue";

export default {
  name: "EditPage",
  data() {
    return {
      show: 0,
    };
  },
  async created() {
    if (this.$route.path.includes("guest")) {
      this.show = 1;
    } else if (this.$route.path.includes("subevent")) {
      this.show = 2;
    }
  },
  methods: {},
  components: {
    GuestEdit,
    SubeventEdit,
    CabinetHeader,
  },
};
</script>
<style >
.editPage {
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Montserrat" !important;
}
.edit-heading {
  font-size: 15px;
  font-weight: 800;
  color: #0e4d9f;
  margin: 37px 0;
}
</style>