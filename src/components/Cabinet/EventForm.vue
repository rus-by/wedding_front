<template>
  <div class="event-read" v-if="readonly">
    <div class="cell-td title-cell" @click="expanded = !expanded">
      <p>{{ event.title }}</p>
      <img
        class="schevron expanded"
        :class="expanded ? 'rotated' : ''"
        src="@/assets/schevron.png"
        alt=""
      />
      <div class="mob-info expanded" v-if="expanded">
        <p>Время: {{ time }}</p>
      </div>
    </div>
    <div class="cell-td time-cell">{{ time }}</div>
    <div class="manage-mob">
      <div class="cell-td" @click="goToEditPage">
        <img src="@/assets/edit-mob.png" alt="" />
      </div>
      <div class="cell-td" @click="deleteEvent">
        <img src="@/assets/trash-mob.png" alt="" />
      </div>
    </div>
    <div class="cell-td manage-little-cell" @click="startEdit">
      <img src="@/assets/edit.png" alt="" />
    </div>
    <div class="cell-td manage-little-cell" @click="deleteEvent">
      <img src="@/assets/delete.png" alt="" />
    </div>
  </div>

  <div class="event-edit" v-else>
    <div class="cell-td title-cell">
      <input v-model="title" type="text" class="input-title" />
    </div>
    <div class="cell-td time-cell time-edit">
      <vue-timepicker class="timepicker" v-model="timeModel"></vue-timepicker>
    </div>
    <div class="cell-td manage-little-cell" @click="handleOk">
      <img src="@/assets/check.png" alt="" />
    </div>
    <div v-if="!isNew" class="cell-td manage-little-cell" @click="deleteEvent">
      <img src="@/assets/delete.png" alt="" />
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
  name: "EventForm",
  props: ["isNew", "mainEvent", "event"],
  data() {
    return {
      title: "",
      description: "",
      startDate: new Date(),
      readonly: true,
      timeModel: 0,
      expanded: false,
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
  created() {
    if (this.isNew) {
      this.readonly = false;
    }
  },
  methods: {
    goToEditPage() {
      this.$router.push(`/cabinet/subevent/${this.event.id}`);
    },
    handleOk() {
      this.isNew ? this.createEvent() : this.editEvent();
    },
    startEdit() {
      this.readonly = false;
      if (this.event) {
        this.fillInputs();
      }
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
.cell-td {
  font-size: 15px;
  padding-left: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
.title-cell {
  padding-left: 8px;
  width: 750px;
}
.time-cell {
  padding-left: 8px;
  width: 187px;
  font-size: 15px;
}
.time-edit {
  font-size: 16px !important;
}
.input-title {
  width: 734px;
  height: 35px;
}
.event-edit {
  display: flex;
  height: 40px;
  align-items: center;
}
.event-read {
  display: flex;
  height: 40px;
  align-items: center;
}
.manage-mob {
  display: none;
}
.schevron {
  display: none;
}
@media screen and (max-width: 840px) {
  .expanded {
    display: block;
  }
  .time-edit {
    font-size: 9px !important;
  }
  .cell-td {
    font-size: 9px;
  }
  .event-read > .time-cell,
  .event-read > .manage-little-cell {
    display: none;
  }
  .manage-mob {
    width: 34%;
    display: flex;
    justify-content: space-around;
  }
  .schevron {
    position: absolute;
    top: 11px;
    right: 11px;
    display: block;
  }
  .title-cell {
    width: 64%;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .rotated {
    transform: rotate(180deg);
  }
}
</style>