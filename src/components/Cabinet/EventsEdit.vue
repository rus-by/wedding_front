<template>
  <div class="events-edit">
    <p class="list">ГЛАВНОЕ СОБЫТИЕ</p>

    <div class="table-events">
      <div class="th main-date">Дата свадьбы</div>
      <div class="th manage-edit-cell">Управление</div>
    </div>

    <div v-if="readonly" class="event-read">
      <div class="cell-td main-date white-bg">{{ getDate }}</div>
      <div class="cell-td manage-edit-cell white-bg">
        <div class="cell-td manage-little-cell" @click="readonly = false">
          <img src="@/assets/edit.png" alt="" />
        </div>
      </div>
    </div>

    <div v-else class="event-edit">
      <div class="cell-td main-date white-bg">
        <datepicker @selected="handleSelect" :value="mainDate" />
      </div>
      <div class="cell-td manage-edit-cell white-bg">
        <div class="cell-td manage-little-cell ok" @click="editEvent">
          <img class="width-16" src="@/assets/check.png" alt="" />
        </div>
      </div>
    </div>

    <p class="list subs">ПОДСОБЫТИЯ</p>

    <div class="table-events">
      <div class="th title-cell">Название</div>
      <div class="th time-cell">Время</div>
      <div class="th manage-edit-cell">Управление</div>
    </div>

    <event-form
      @needUpdate="getEvent"
      v-for="(subevent, idx) in subevents"
      :mainEvent="event"
      :class="idx % 2 === 0 ? 'even' : 'odd'"
      :event="subevent"
      :key="subevent.id"
    />

    <event-form
      :isNew="true"
      v-if="adding"
      @needUpdate="getEvent"
      :mainEvent="event"
      :key="228"
    />

    <div
      class="add-event ok"
      :class="adding ? 'red' : 'blue'"
      @click="adding = !adding"
    >
      <p>{{ adding ? "Отменить" : "Добавить событие" }}</p>
    </div>

    <div
      class="add-event-mob blue"
      @click="goToMobAdd"
    >
      <p>Добавить событие</p>
    </div>

  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import { format, setHours } from "date-fns";

export default {
  name: "EventsEdit",
  data() {
    return {
      event: {},
      subevents: [],
      adding: false,
      readonly: true,
      mainDate: new Date(),
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    handleSelect(date) {
      this.mainDate = date;
    },
    goToMobAdd() {
      this.$router.push(`/cabinet/subevent/new`);
    },
    async getEvent() {
      const data = await this.$api.get("/event");
      this.event = data.data;
      this.subevents = data.data.subevents;
      this.adding = false;
      this.mainDate = new Date(this.event.startDate);
    },
    async editEvent() {
      const date = setHours(this.mainDate, 19);
      await this.$api.put(`/event/${this.event.id}`, { startDate: date });
      this.readonly = true;
      this.getEvent();
    },
  },
  computed: {
    getDate() {
      if (this.event.startDate) {
        return format(new Date(this.event.startDate), "dd.MM.yyyy");
      } else {
        return new Date();
      }
    },
  },
  components: {
    EventForm,
    Datepicker,
  },
};
</script>
<style>
.width-16 {
  width: 16px;
}
.subs {
  margin-top: 110px;
}
.ok {
  cursor: pointer;
}
.white-bg {
  background-color: #fff;
}
.cell-td {
  font-size: 15px;
  padding-left: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
.padding-check {
  padding-left: 10px;
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
.main-date {
  padding-left: 8px;
  width: 950px;
  border-right: 6px solid #f6f6f6;
}
.manage-edit-cell {
  width: 208px;
  padding-left: 8px;
}
.title-cell {
  width: 750px;
  padding-left: 8px;
  border-right: 6px solid #f6f6f6;
}
.time-cell {
  width: 187px;
  border-right: 6px solid #f6f6f6;
  padding-left: 8px;
}
.list {
  color: #0e4d9f;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 44px;
}
.events-edit {
  background-color: #f6f6f6;
  padding: 24px 15px 57px 15px;
  display: flex;
  flex-direction: column;
  margin-top: 60px !important;
}
.add-event {
  margin-top: 56px;
  width: 246px;
  height: 40px;
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
}
.red {
  background: linear-gradient(180deg, #b2384f 0%, #ff103d 100%);
}
.blue {
  background: linear-gradient(180deg, #3b8bea 0%, #003a88 100%);
}
.th {
  background-color: #3b8bea;
  color: white;
}
.table-events {
  font-size: 15px;
  display: flex;
}

.odd {
  background-color: #d7eaff;
}
.even {
  background-color: #fff;
}
.add-event-mob {
  display: none;
}
@media screen and (max-width: 840px) {
  .events-edit {
    background-color: transparent;
    padding: 24px 0 57px 0;
  }
  .subs {
    margin-top: 70px;
  }
  .table-events {
    margin-left: 0px;
  }
  .list {
    font-size: 15px;
    margin-bottom: 34px;
  }
  .time-cell {
    display: none !important;
  }
  .th {
    font-size: 10px;
    height: 34px;
    display: flex;
    align-items: center;
    padding-left: 8px;
  }
  .title-cell {
    width: 64%;
  }
  .manage-edit-cell {
    width: 36% !important;
  }
  .main-date {
    font-size: 10px;
    width: 64%;
  }
  .cell-td {
    font-size: 10px;
  }

  .add-event {
    display: none;
  }
  .add-event-mob {
    margin-top: 56px;
width: 120px;
    height: 24px;
    font-size: 10px;
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  }
}
</style>