<template>
  <div class="subevent" :class="reverse ? 'reverse' : ''">
    <div class="token">
      <p class="time">{{ time }}</p>
    </div>
    <div class="line"></div>
    <p class="text">
      {{ event.title }}
    </p>
  </div>
</template>

<script>
import { getHours, getMinutes } from 'date-fns'
export default {
  name: "Subevent",
  props: ["event", "reverse"],
  data() {
    return {};
  },
  created() {},
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
  methods: {},
  components: {},
};
</script>
<style scoped>
.text {
  height: 68px;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 5px;
  max-width: 330px;
}
.line {
  height: 64px;
  width: 3px;
  border-radius: 50px;
  background-color: #e11f17;
  margin: 0 8px;
}
.time {
  color: #e11f17;
  font-size: 40px;
  font-family: "NK170";
}
.subevent {
  margin-top: 16px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.token {
  background-image: url("../../assets/token.png");
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reverse {
  flex-direction: row-reverse;
}

@media screen and (max-width: 840px) {
  .token {
    width: 86px;
    height: 86px;
    background-image: url("../../assets/token-mob.png");
  }
  .time {
    font-size: 20px;
  }
  .text {
    font-size: 11px;
    max-width: 148px;
  }
  .line {
    height: 36px;
    width: 1px;
  }
  .subevent {
    margin-top: 0px;
  }
}
</style>