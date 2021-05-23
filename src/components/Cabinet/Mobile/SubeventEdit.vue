<template>
  <div class="user-edit">
    <p class="edit-heading">РЕДАКТИРОВАНИЕ</p>

    <div class="row">
      <div class="heading cell">
        <p>Название</p>
      </div>
      <div class="heading cell">
        <p>Время</p>
      </div>
    </div>

    <div class="row">
      <div class="cell">
        <input v-model="title" type="text" class="input-title" />
      </div>
      <div class="cell" >
        <vue-timepicker class="timepicker" v-model="timeModel">
        </vue-timepicker>
      </div>
    </div>
    <div class="buttons">
      <div class="button red" @click="goBack">
        <p>Назад</p>
      </div>

      <div class="button blue" @click="handleOk">
        <p>Сохранить</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getHours,
  getMinutes,
  startOfDay,
  addMinutes,
  addHours,
} from "date-fns";
// import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "SubeventEdit",
  props: [],
  data() {
    return {
      title: "",
      description: "",
      startDate: new Date(),
      readonly: true,
      timeModel: 0,
      mainEvent: {},
      event: {},
    };
  },
  // computed: {
  //   dateTime() {
  //       let result = '';
  //       const mainDate = new Date(this.event.startDate);
  //       const subDate = new Date(this.subevent.startDate);
  //       const diff = differenceInDays(mainDate ,subDate);
  //       if (diff) {
  //           result += 'День ' + diff + ' ';
  //       }
  //       result += getHours(subDate);
  //       result += ":";
  //       result += getMinutes(subDate);
  //       return result;
  //   },
  //},
  async created() {
    await this.getMain();
    if (this.$route.params.id !== "new") {
      await this.getThisEvent();
      this.fillInputs();
    }
  },
  methods: {
    goBack() {
      this.$router.push("/cabinet");
    },
    handleOk() {
      this.$route.params.id === "new" ? this.createEvent() : this.editEvent();
    },
    async getThisEvent() {
      const id = this.$route.params.id;
      const sub = await this.$api.get(`/event/${id}`);
       this.event = sub.data;
    },
    async getMain() {
      const event = await this.$api.get("/event");
      this.mainEvent = event.data;
    },
    fillInputs() {
      this.title = this.event.title;
      this.timeModel = { HH: null, mm: null };
      let h = String(getHours(new Date(this.event.startDate)));
      let m = String(getMinutes(new Date(this.event.startDate)));
      if (h.length === 1) {
        h = "0" + h;
      }
      if (m.length === 1) {
        m = "0" + m;
      }
      this.timeModel.HH = h;
      this.timeModel.mm = m;
    },
    async deleteEvent() {
      await this.$api.delete(`/event/${this.event.id}`);
      this.needReload();
    },
    async editEvent() {
      this.handleHours();
      await this.$api.put(`/event/${this.event.id}`, {
        title: this.title,
        description: this.description,
        startDate: this.startDate,
      });
      this.readonly = true;
      this.needReload();
    },
    async createEvent() {
      this.handleHours();
      await this.$api.post("/event/subevent", {
        title: this.title,
        startDate: this.startDate,
        description: this.description,
      });
      this.needReload();
    },
    handleHours() {
      const day = startOfDay(new Date(this.mainEvent.startDate));
      const hours = this.timeModel.HH;
      const minutes = this.timeModel.mm;
      const withHours = addHours(day, hours);
      this.startDate = addMinutes(withHours, minutes);
      return this.startDate;
    },
    needReload() {
      this.$emit("needUpdate");
    },
  },
  computed: {
    time() {
      let h = String(getHours(new Date(this.event.startDate)));
      let m = String(getMinutes(new Date(this.event.startDate)));
      if (h.length === 1) {
        h = "0" + h;
      }
      if (m.length === 1) {
        m = "0" + m;
      }
      return String(h) + ":" + String(m);
    },
  },
  components: {
    VueTimepicker,
  },
};
</script>
<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}
.red {
  background: linear-gradient(180deg, #b2384f 0%, #ff103d 100%);
}
.blue {
  background: linear-gradient(180deg, #3b8bea 0%, #003a88 100%);
}
.even-row {
  background-color: #d7eaff;
}
.input-title {
  height: 34px;
  width: 100%;
}
.user-edit {
  font-size: 10px;
  font-weight: 500;
}
.row {
  display: flex;
  align-items: center;
  height: 36px;
  width: 100%;
}
.row p {
  width: 30%;
}
.heading {
  height: 36px;
}
.heading:first-of-type {
  width: 70%;
}
.heading:last-of-type {
  width: 30%;
}
.row > .cell:first-child {
  border-right: 7px solid #f6f6f6;
  width: 70%;
}
.row > .cell:last-child {
  width: 30%;
}
.timepicker {
  font-size: 9px;
}
.cell {
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 7px;
}
.heading {
  background-color: #3b8bea;
  color: white;
}
.button {
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  font-size: 9px;
  width: 100px;
  height: 25px;
  margin-left: 9px;
}
</style>