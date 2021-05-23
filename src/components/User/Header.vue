<template>
  <div class="header">
    <div class="container">
      <div>
        <img class="mongoram" src="@/assets/monogram.png" />
      </div>
      <ul class="menu">
        <li class="menu-item">
          <a href="#invite">Приглашение</a>
        </li>
        <li class="menu-item">
          <a href="#guests">Список гостей</a>
        </li>
        <li class="menu-item">
          <a href="#timeline">Таймлайн</a>
        </li>
        <li class="menu-item">
          <a href="#photos">Фотографии</a>
        </li>
        <li class="menu-item">
          <a href="#contacts">Контакты</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: [],
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
.header {
  z-index: 2;

  position: sticky;
  top: 0px;
  width: 100%;

  background-color: #fff;
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
.menu-item > a {
  margin-left: 72px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  text-align: center;
}

.menu-item > a:hover {
  border-bottom: 1px solid black;
}
@media screen and (max-width: 840px) {
  .menu-item > a {
    font-size: 8px;
    margin-left: 12px;
  }
  .mongoram {
    width: 30px;
  }
  .container {
    max-width: 90%;
  }
  .menu-item > a:hover {
  border-bottom: none;
  text-decoration: underline;
}
}
</style>