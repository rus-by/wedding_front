<template>
  <div class="timer">
    <vue-countdown
      v-if="processDays"
      :time="processDays"
      v-slot="{ days, hours, minutes, seconds }"
    >
      <div class="wrapper">
        <div class="time-wrapper">
          <div class="golden-border">
            <p>{{ days.toString().length === 1 ? "0" : days.toString()[0] }}</p>
            <p>
              {{
                days.toString().length === 1
                  ? days.toString()[0]
                  : days.toString()[1]
              }}
            </p>
          </div>
          <p class="title-time">дней</p>
        </div>

        <div class="hearts">
          <img src="@/assets/heart.png" alt="" />
          <img src="@/assets/heart.png" alt="" />
        </div>

        <div class="hearts-mob">
          <img src="@/assets/heart-mob.png" alt="" />
          <img src="@/assets/heart-mob.png" alt="" />
        </div>

        <div class="time-wrapper">
          <div class="golden-border">
            <p>
              {{ hours.toString().length === 1 ? "0" : hours.toString()[0] }}
            </p>
            <p>
              {{
                hours.toString().length === 1
                  ? hours.toString()[0]
                  : hours.toString()[1]
              }}
            </p>
          </div>
          <p class="title-time">часов</p>
        </div>

        <div class="hearts">
          <img src="@/assets/heart.png" alt="" />
          <img src="@/assets/heart.png" alt="" />
        </div>

        <div class="hearts-mob">
          <img src="@/assets/heart-mob.png" alt="" />
          <img src="@/assets/heart-mob.png" alt="" />
        </div>

        <div class="time-wrapper">
          <div class="golden-border">
            <p>
              {{
                minutes.toString().length === 1 ? "0" : minutes.toString()[0]
              }}
            </p>
            <p>
              {{
                minutes.toString().length === 1
                  ? minutes.toString()[0]
                  : minutes.toString()[1]
              }}
            </p>
          </div>
          <p class="title-time">минут</p>
        </div>

        <div class="hearts">
          <img src="@/assets/heart.png" alt="" />
          <img src="@/assets/heart.png" alt="" />
        </div>

        <div class="hearts-mob">
          <img src="@/assets/heart-mob.png" alt="" />
          <img src="@/assets/heart-mob.png" alt="" />
        </div>

        <div class="time-wrapper">
          <div class="golden-border">
            <p>
              {{
                seconds.toString().length === 1 ? "0" : seconds.toString()[0]
              }}
            </p>
            <p>
              {{
                seconds.toString().length === 1
                  ? seconds.toString()[0]
                  : seconds.toString()[1]
              }}
            </p>
          </div>
          <p class="title-time">секунд</p>
        </div>
      </div>
    </vue-countdown>
  </div>
</template>

<script>
import { differenceInMilliseconds } from "date-fns";
import VueCountdown from "@chenfengyuan/vue-countdown";
export default {
  name: "Timer",
  props: ["time"],
  data() {
    return {
      difference: 21,
    };
  },

  computed: {
    processDays() {
      if (this.time) {
        return differenceInMilliseconds(new Date(this.time), new Date());
      } else {
        return null;
      }
    },
  },
  methods: {},
  components: {
    VueCountdown,
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.golden-border p {
  font-family: "NK170";
}
.golden-border {
  width: 170px;
  color: #fddd9e;
  font-size: 134px;
  height: 170px;
  display: flex;
  line-height: 163px;
  justify-content: space-around;
  background-image: url("../../assets/timer_border.png");
}
.time-wrapper {
  display: flex;
  flex-direction: column;
  color: #fddd9e;
  font-size: 25px;
  align-items: center;
}
.hearts {
  margin: 0 16px;
}
.hearts-mob {
  display: none;
}
@media screen and (max-width: 840px) {
  .golden-border {
    width: 69px;
    height: 69px;
    font-size: 55px;
    line-height: 66px;
    background-image: url("../../assets/timer-border-mob.png");
  }
  .hearts {
    display: none;
  }
  .hearts-mob {
    display: block;
    position: relative;
    bottom: 12px;
    left: 1px;
    width: 14px;
  }
  .title-time {
    font-size: 11px;
  }
}
</style>