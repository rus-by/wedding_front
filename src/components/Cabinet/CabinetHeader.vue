<template>
  <div class="header">
    <div class="container">
      <div class="mongoram">
        <img class="logo" src="@/assets/adm.png" />
      </div>
      <ul class="menu">
        <li
          @click="changeTab(1)"
          class="menu-item"
          :class="currentTab === 1 ? 'underline' : ''"
        >
          <a>Список гостей</a>
        </li>
        <li
          @click="changeTab(2)"
          class="menu-item"
          :class="currentTab === 2 ? 'underline' : ''"
        >
          <a>События</a>
        </li>
        <li
          @click="changeTab(3)"
          class="menu-item"
          :class="currentTab === 3 ? 'underline' : ''"
        >
          <a>Рассылка</a>
        </li>
        <li
          @click="changeTab(4)"
          class="menu-item"
          :class="currentTab === 4 ? 'underline' : ''"
        >
          <a>Фото и видео</a>
        </li>
      </ul>
      <div class="burger" @click="showMenu = !showMenu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div class="mobile-nav" :class="showMenu ? 'show' : 'hide'">
      <li
        @click="changeTab(1)"
        class="menu-item"
        :class="currentTab === 1 ? 'underline' : ''"
      >
        <a>Список гостей</a>
      </li>
      <li
        @click="changeTab(2)"
        class="menu-item"
        :class="currentTab === 2 ? 'underline' : ''"
      >
        <a>События</a>
      </li>
      <li
        @click="changeTab(3)"
        class="menu-item"
        :class="currentTab === 3 ? 'underline' : ''"
      >
        <a>Рассылка</a>
      </li>
      <li
        @click="changeTab(4)"
        class="menu-item"
        :class="currentTab === 4 ? 'underline' : ''"
      >
        <a>Фото и видео</a>
      </li>
      <img
        src="@/assets/close-cross.png"
        alt=""
        @click="showMenu = false"
        class="cross"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["currentTab"],
  data() {
    return {
      showMenu: false,
    };
  },
  created() {},
  methods: {
    changeTab(val) {
      this.$router.push(`/cabinet/?tab=${val}`);
      this.$emit("tabChange", val);
      this.showMenu = false;
    },
  },
  components: {},
};
</script>
<style scoped>
.underline {
  text-decoration: underline;
}
.header {
  z-index: 2;

  position: sticky;
  top: 0px;
  width: 100%;

  background-color: #c3dbf5;
}
.container {
  display: flex;
  justify-content: space-between;
  height: 105px;
  align-items: center;
  margin: 0 auto;
  max-width: 1170px;
}
.menu {
  display: flex;
  align-items: center;
}
.menu-item {
  margin-left: 72px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
.mobile-nav {
  display: none;
}
.burger {
  display: none;
}
@media screen and (max-width: 840px) {
  .menu-item {
    margin: 0;
    margin-top: 70px;
  }
  .container {
    max-width: 90%;
    height: 60px;
  }
  .menu {
    display: none;
  }
  .burger {
    height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 23px;
    flex-direction: column;
  }
  .line {
    height: 2px;
    width: 100%;
    background-color: #3b8bea;
  }
  .mobile-nav {
    background: white;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    transition: 0.2s ease;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    flex-direction: column;
  }
  .cross {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .show {
    left: 0%;
    opacity: 1;
  }

  .hide {
    opacity: 0;
    left: 100%;
    display: none;
  }
  .logo {
    width: 28px;
  }
}
</style>