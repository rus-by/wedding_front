<template>
  <Spinner v-if="isLoading" />
  <div v-else class="div">
    <EventHeader> </EventHeader>
    <div class="bg-1">
      <div class="container">
        <div class="screen-1" id="invite" >
          <div class="screen-content-1" :class="telegramChoosen ? 'tg-height' : 'e-height'">
            <div class="center-image suits">
              <img src="@/assets/suits.png" class="suits-img" alt="" />
            </div>

            <p class="salutation">{{ dear }} {{ user.salutation }} !</p>

            <p class="info">
              Мы будем рады видеть тебя на нашей свадьбе!
            </p>

            <div class="red-box">
              <div class="left-side side">
                <p>{{ mainDate }}</p>
              </div>

              <div class="white-line"></div>

              <div class="center">
                Музей-Усадьба <br />
                Муравьёвых-Апостолов<br />
                Старая Басманная, д. 23/9, стр. 1
              </div>

              <div class="white-line"></div>

              <div class="right-side side">
                <p>{{ time }}</p>
              </div>
            </div>

            <div class="state">
              <div class="accept state-button" @click="state = 2">
                <hearts :choosen="state === 2"> </hearts>
                <p class="text-accept state-text">Я обязательно приду!</p>
              </div>

              <div class="decline state-button" @click="state = 3">
                <clubs :choosen="state === 3"> </clubs>
                <p class="text-decline state-text">Извините, я не смогу.</p>
              </div>
            </div>

            <div class="send-button">
              <div
                :class="sent ? 'gold-button' : 'gray-button'"
                v-if="state > 1 && state !== 4"
                @click="sendStatus"
              >
                {{ sent ? "Отправлено" : "Отправить" }}
              </div>
            </div>

            <div class="center-image many-suits">
              <img src="@/assets/many-suits.png" alt="" />
            </div>
            <p class="choose-info">
              Выберите удобный способ получения рассылки
            </p>
            <div class="choose-buttons">
              <div @click="emailChoosen = false; telegramChoosen = true" :class="telegramChoosen ? 'gold-button' : 'gray-button'">Telegram</div>
              <div @click="emailChoosen = true; telegramChoosen = false" :class="emailChoosen ? 'gold-button' : 'gray-button'">E-mail</div>
            </div>
            <div class="telegram-choosen" v-if="telegramChoosen">
                <p class="telegram">
              Для удобства получения актульной информации мы создали
              Telegram-bot, <br />
              доступ к которому ты можешь получить ниже.
            </p>
            <p class="telegram-mob">
              Для удобства получения актульной информации <br />
              мы создали Telegram-bot, доступ к которому <br />ты можешь
              получить ниже.
            </p>

            <div class="gray-button">
              <a :href="botHref" class="bot-link"
                >Telegram-bot</a
              >
            </div>
            </div>
            <div class="email-choosen" v-if="emailChoosen">
                <p class="mail">
              Актуальная информация о мероприятии <br>
будет отправлена на почту
            </p>

            <div>
              <input
                v-model="email"
                type="email"
                :class="validationFail ? 'validation-fail' : ''"
                placeholder="E-mail"
                class="gray-button gray-input"
              />
            </div>

            <div class="box-place">
                  <select-box
              v-if="email"
              class="notify"
              v-model="notifyOn"
              :options="options"
              :default="'Уведомить за 1 день'"
            >
            </select-box>
            </div>
          
            <div class="button-place">
              <div
                :class="sent1 ? 'gold-button' : 'gray-button'"
                v-if="email"
                @click="subscribeToMail"
              >
                {{ sent1 ? "Отправлено" : "Отправить" }}
              </div>
            </div>
            </div>
            

            
          </div>
        </div>
      </div>
    </div>
    <div class="bg-2" id="guests">
      <div class="container screen-2">
        <p class="guest-list">Список гостей</p>

        <div class="lists">
          <guest-list :guests="brideGuests" :type="'bride'"> </guest-list>
          <guest-list :guests="groomGuests" :type="'groom'"> </guest-list>
        </div>
      </div>

      <div class="lists-mob">
        <img
          src="@/assets/schevron-guest.png"
          alt=""
          @click="listsToggle = !listsToggle"
        />
        <guest-list :guests="brideGuests" v-if="listsToggle" :type="'bride'">
        </guest-list>
        <guest-list :guests="groomGuests" v-if="!listsToggle" :type="'groom'">
        </guest-list>
        <img
          src="@/assets/schevron-guest.png"
          class="reverse-schv"
          @click="listsToggle = !listsToggle"
          alt=""
        />
      </div>
    </div>

    <div class="bg-3" id="timeline">
      <div class="container screen-3">
        <p class="timeline">Таймлайн</p>

        <div class="subevents">
          <subevent
            v-for="(subevent, idx) in subevents"
            :reverse="idx % 2 === 0"
            :key="subevent.id"
            :event="subevent"
          >
          </subevent>
        </div>
      </div>
    </div>

    <div class="bg-4">
      <div class="container screen-4">
        <p class="remains">До свадьбы осталось</p>

        <Timer :time="event.startDate" />
      </div>
    </div>

    <div class="bg-5">
      <div class="container screen-5">
        <p class="photo" id="photos">Фотографии</p>
        <photo-list />
        <videos />
      </div>
    </div>

    <div class="footer" id="contacts">
      <div class="container footer-wrapper">
        <img
          src="@/assets/footer-arrow.png"
          alt=""
          class="arrow-footer"
          @click="scrollTop"
        />
        <img
          src="@/assets/arrow-mob.png"
          alt=""
          class="arrow-footer-mob"
          @click="scrollTop"
        />
        <div class="footer-elements">
          <p class="bold  m-top-mob">Усадьба Муравьевых-Апостолов</p>
          <p class="not-bold">mahm.ru</p>
          <p class="bottom bold">Старая Басманная, дом 23/9, стр.1</p>
          <p class="not-bold">+7 (499) 265 76 36</p>
        </div>
        <div class="footer-elements">
          <p class="bold m-top-mob">Никита</p>
          <p class="not-bold">+7 (915) 066 66 65</p>
          <p class="bottom bold m-top-mob">Юлия</p>
          <p class="not-bold">+7 (916) 327 55 90</p>
        </div>
        <div class="footer-elements hide-mob">
          <div class="mongoram">
            <img src="@/assets/monogram.png" />
            <p class="footer-date">29 мая 2021</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { getHours, getMinutes } from 'date-fns'
import { compareAsc, closestIndexTo } from "date-fns";
import EventHeader from "../components/User/Header.vue";
import Clubs from "../components/User/Clubs.vue";
import Hearts from "../components/User/Hearts.vue";
import SelectBox from "../components/User/SelectBox.vue";
import GuestList from "../components/User/GuestList.vue";
import Subevent from "../components/User/Subevent.vue";
import Timer from "../components/User/Timer";
import { format } from "date-fns";
import PhotoList from "../components/PhotoList.vue";
import Spinner from "../components/User/Spinner.vue";
import Videos from "../components/User/Videos.vue";
export default {
  name: "MainEvent",
  data() {
    return {
      state: 0,
      event: null,
      user: null,
      isLoading: true,
      email: "",
      notifyOn: "Уведомить за 1 день",
      brideGuests: [],
      groomGuests: [],
      sent: false,
      sent1: false,
      subevents: [],
      validationFail: false,
      listsToggle: false,
      telegramChoosen: true,
      emailChoosen: false,
      botHref: ''
    };
  },
  async created() {
    this.botHref = 'https://t.me/pavlov_wedding_bot' + this.$route.params.id;
    await this.authUser();
    await this.getEvents();
    await this.getUsers();
    await this.sendFirstStatus();
    this.isLoading = false;
  },
  computed: {
    options() {
      const opts = [
                'Уведомить за 1 день',
                'Уведомить за 2 дня',
                'Уведомить за 3 дня']
                return opts.filter(opt => opt !== this.notifyOn);
    },
    mainDate() {
      if (this.event && this.event.startDate) {
        return format(new Date(this.event.startDate), "dd.MM.yy");
      } else {
        return new Date();
      }
    },
    dear() {
      return this.user && this.user.sex === "М" ? "Дорогой" : "Дорогая";
    },
    currentSubevent() {
      const subevents = this.event.subevents;
      const curDate = new Date();
      const greaterDates = subevents.filter((event) =>
        compareAsc(curDate, new Date(event.startDate))
      );
      const closest = closestIndexTo(curDate, greaterDates);
      return greaterDates[closest];
    },

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
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
    async authUser() {
      const id = this.$route.params.id;

      const data = await this.$api.post("/passport/login-user", { id: id });
      this.user = data.data;
      this.state = this.user.state;
    },
    async getEvents() {
      const data = await this.$api.get("/event");
      this.event = data.data;
      this.subevents = this.event.subevents;
    },
    async sendFirstStatus() {
      if (
        this.user.state !== 2 &&
        this.user.state !== 3 &&
        this.user.state !== 4
      ) {
        const id = this.user.id;
        this.$api.put(`/user/state/${id}`, { state: 4 });
      }
    },
    async sendStatus() {
      const id = this.user.id;
      this.$api.put(`/user/state/${id}`, { state: this.state });
      this.sent = true;
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async subscribeToMail() {
      if (!this.validateEmail(this.email)) {
        this.validationFail = true;
        return;
      } else {
        this.validationFail = false;
        let days;
        if (this.notifyOn === "Уведомить за 1 день") {
          days = 1;
        } else if (this.notifyOn === "Уведомить за 2 дня") {
          days = 2;
        } else if (this.notifyOn === "Уведомить за 3 дня") {
          days = 3;
        }
        this.$api.post(`notification/new-mail`, { email: this.email, days });
        this.sent1 = true;
      }
    },
    async getUsers() {
      const data = await this.$api.get("/user");
      const users = data.data;
      this.brideGuests = users.filter((guest) => guest.relation === "Невеста");
      this.groomGuests = users.filter((guest) => guest.relation === "Жених");
    },
  },
  components: {
    EventHeader,
    Clubs,
    Hearts,
    SelectBox,
    GuestList,
    Subevent,
    Timer,
    PhotoList,
    Spinner,
    Videos,
  },
};
</script>
<style>
.div {
  font-family: "Orchidea Pro";
}
.arrow-footer {
  cursor: pointer;
}
.validation-fail {
  border: 3px solid red !important;
}
.gray-input {
  outline: none;
  padding-left: 15px;
  border: none;
}
.gray-input:active {
  outline: none;
}
.footer-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 75px 0;
}
.footer-elements {
  font-size: 16px;
  text-align: center;
}
.bold {
  font-weight: bold;
}
.footer-date {
  margin-top: 8px;
}
.bottom {
  margin-top: 20px;
}
.mongoram {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.photo {
  font-size: 80px;
  font-family: "GoodVibes";
}
.remains {
  font-size: 78px;
  color: #fddd9e;
  font-family: "GoodVibes";
  margin-bottom: 30px;
}
.subevents {
  width: 600px;
}
.timeline {
  font-size: 80px;
  margin-bottom: 30px;
  font-family: "GoodVibes";
}
.lists {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 40px;
}
.screen-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.screen-5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.screen-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.guest-list {
  font-size: 80px;
  color: white;
  font-family: "GoodVibes";
}
.arrow-footer-mob {
  display: none;
}
.bg-3 {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 62px;
  background-image: url("../assets/bg-3.png");
  padding-bottom: 118px;
}
.bg-4 {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 62px;
  background-image: url("../assets/bg-4.png");
  padding-bottom: 118px;
}
.bg-5 {
  padding-top: 90px;
  padding-bottom: 118px;
  box-shadow: 0px 10px 12px 0px #00000040;
}
.bg-2 {
  background-image: url("../assets/bg-2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 93px;
  padding-bottom: 118px;
}
.bg-1 {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("../assets/bg-1.png");
  background-color: black;
}
.screen-1 {
  padding-top: 20px;
  padding-bottom: 64px;
}

.screen-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.notify {
  margin: 10px 0;
}
.mail {
  margin-top: 38px;
  margin-bottom: 30px;
  line-height: 18px;
  font-size: 18px;
}
.bot-link {
  text-decoration: none;
  color: black;
}
.telegram {
  margin-top: 22px;
  margin-bottom: 18px;
  line-height: 18px;
  font-size: 18px;
}
.telegram-mob {
  display: none;
}
.tg-height {
  height: 993px;
}
.e-height {
  height: 1111px;
}
.screen-content-1 {
    transition: height .2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
   padding-bottom: 141px;
  background: linear-gradient(
    179.94deg,
    rgb(255, 255, 255, 0.9) 63.09%,
    rgba(255, 255, 255, 0) 222.98%
  );
  border: 3px solid #dfc066;
}

.container {
  margin: 0 auto;
  max-width: 1170px;
}
.center-image {
  display: flex;
  justify-content: center;
}
.suits {
  margin-top: 56px;
}
.salutation {
  margin-top: 48px;
  font-size: 80px;
  line-height: 78px;
  font-family: "GoodVibes";
}
.info {
  margin-top: 18px;
  font-size: 22px;
  line-height: 30px;
}
.red-box {
  margin-top: 32px;
  height: 80px;
  background: radial-gradient(
    264.2% 264.2% at 50% 50%,
    #e11f17 0%,
    #b81a13 36.98%,
    #000000 100%
  );
  color: white;
  width: 630px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0, 25);
}

.side {
  width: 138px;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
}
.left-side {
  font-family: "NK170";
}

.right-side {
  width: 138px;
  font-family: "NK170";
}

.center {
  width: 357px;
  font-size: 19px;
  line-height: 19px;
  padding-top: 13px;
}

.white-line {
  width: 3px;
  background-color: white;
}
.state-button {
  display: flex;
  cursor: pointer;
}
.state-text {
  margin-left: 8px;
}
.state {
  margin-top: 20px;
}
.send-button {
  height: 80px;
  padding-top: 12px;
}
.gray-button {
  cursor: pointer;
  width: 200px;
  height: 35px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  font-size: 16px;
}
.button-place {
  height: 35px;
}

.gold-button {
  pointer-events: none;
  width: 200px;
  height: 35px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background: linear-gradient(
    279.14deg,
    #dfc066 -15.34%,
    #fff1a5 41.89%,
    #dfc066 91.61%
  );

  cursor: pointer;
}

.lists-mob {
  display: none;
}
.choose-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 69px;
}
.choose-buttons > div:first-child {
  margin-right: 14px;
}
.telegram-choosen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.email-choosen {
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-place {
  height: 55px;
}
.choose-info {
  margin-top: 18px;
}
@media screen and (max-width: 840px) {
  .tg-height {
  height: 450px;
}
.e-height {
  height: 510px;
}
  .choose-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 30px;
}
.choose-buttons > div:first-child {
  margin-right: 5px;
}
  .bg-1 {
    background-image: url("../assets/bg-1-mob.png");
}
.choose-info {
  font-size: 11px;
}
  .arrow-footer {
    display: none;
  }
  .arrow-footer-mob {
    display: block;
    position: absolute;
    left: 0px;
  }
  .screen-1 {
    padding-bottom: 25px
  }
  .screen-content-1 {
    margin: 0 auto;
    padding-bottom: 20px !important;
  }
  .salutation {
    font-size: 28px;
    line-height: 28px;
    margin-top: 21px;
  }
  .suits-img {
    width: 70px;
    height: 11px;
  }
  .info {
    font-size: 11px;
    line-height: 11px;
    margin-top: 10px;
  }
  .red-box {
    height: 40px;
    margin-top: 10px;
    width: 90%;
  }
  .side {
    width: 22%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .white-line {
    width: 1px;
  }
  .suits {
    margin-top: 20px;
  }
  .center {
    width: 55%;
    font-size: 9px;
    line-height: 9px;
    padding-top: 5px;
  }
  .state {
    margin-top: 16px;
    font-size: 11px;
  }
  .state-button {
    align-items: center;
  }
  .many-suits {
    display: none;
  }
  .send-button {
    height: 20px;
    padding-top: 10px;
  }
  .gray-button {
    width: 143px;
    height: 20px;
    font-size: 9px;
    background-color: #FFFFFF;
  }
  .gold-button {
  width: 143px;
    height: 20px;
    font-size: 9px;
}
  .button-place {
    height: 20px;
  }
  .telegram {
    display: none;
  }
  .telegram-mob {
    display: block;
    font-size: 11px;
    margin-bottom: 8px;
  }
  .box-place {
    height: 40px;
  }
  .mail {
    font-size: 11px;
    margin-top: 0;
    margin-bottom: 20px;
  }
  .guest-list {
    font-size: 30px;
    margin-bottom: 20px;
  }
  .lists {
    display: none;
  }
  .lists-mob {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .reverse-schv {
    transform: rotate(180deg);
  }
  .bg-2 {
    padding-top: 33px;
    padding-bottom: 49px;
    box-shadow: 0px 10px 12px 0px rgba(0, 0, 0, 0.25);
  }
  .timeline {
    font-size: 30px;
    margin-bottom: 15px;
  }
  .container {
    max-width: 90%;
  }
  .subevents {
    width: 87%;
  }
  .bg-3 {
    padding-top: 33px;
    padding-bottom: 51px;
    background-image: url("../assets/bg-3-mob.png");
    box-shadow: 0px 10px 12px 0px rgba(0, 0, 0, 0.25);
  }
  .remains {
    font-size: 30px;
  }
  .bg-4 {
    padding-top: 33px;
    padding-bottom: 41px;
    background-image: url("../assets/bg-4-mob.png");
    box-shadow: 0px 10px 12px 0px rgba(0, 0, 0, 0.25);
  }
  .photo {
    font-size: 30px;
  }
  .bg-5 {
    padding-top: 33px;
    padding-bottom: 41px;
  }
  .hide-mob {
    display: none;
  }
  .footer-wrapper {
    flex-direction: column-reverse;
    position: relative;
    padding: 30px 0;
  }
  .bottom {
    margin: 0;
  }
  .footer-elements {
    font-size: 10px;
  }
  
  .m-top-mob {
    margin-top: 10px;
  }
}
</style>