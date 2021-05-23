<template>
  <div class="users-edit">
    <p class="list">СПИСОК ГОСТЕЙ</p>

    <div class="table-users">
      <div class="th fio-cell">ФИО</div>
      <div class="th status-cell">Статус</div>
      <div class="th relation-cell">Сторона</div>
      <div class="th sex-cell">Пол</div>
      <div class="th manage-cell">Управление</div>
    </div>
    <div class="table-users-mob">
      <div class="th fio-cell">ФИО</div>
      <div class="th manage-cell">Управление</div>
    </div>

    <User
      :class="idx % 2 === 0 ? 'even' : 'odd'"
      @needUpdate="getUsers"
      v-for="(user, idx) in users"
      :user="user"
      :key="user.id"
    >
    </User>
    <User
      v-if="adding"
      @needUpdate="getUsers"
      :user="{}"
      :key="1488"
      :isNew="true"
    >
    </User>

    <div
      class="add-guest"
      :class="adding ? 'red' : 'blue'"
      @click="adding = !adding"
    >
      <p>{{ adding ? "Отменить" : "Добавить гостя" }}</p>
    </div>

  <div
      class="add-guest-mob blue"
      @click="goToMobAdd"
    >
      <p>Добавить гостя</p>
    </div>

  </div>
</template>

<script>
import User from "./User.vue";

export default {
  name: "UserEdit",
  data() {
    return {
      users: [],
      adding: false,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    goToMobAdd() {
      this.$router.push(`/cabinet/guest/new`);
    },
    async getUsers() {
      const data = await this.$api.get("/user");
      this.users = data.data;
      this.adding = false;
    },
  },
  components: {
    User,
  },
};
</script>
<style scoped>
.list {
  color: #0e4d9f;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 44px;
}
.users-edit {
  background-color: #f6f6f6;
  padding: 24px 15px 57px 15px;
  display: flex;
  flex-direction: column;
}
.add-guest {
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
  cursor: pointer;
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
  border-right: 6px solid #f6f6f6;
  padding-left: 8px;
  font-size: 15px;
}
.table-users {
  display: flex;
  font-size: 18px;
}
.fio-cell {
  width: 410px;
}
.status-cell {
  width: 134px;
}
.relation-cell {
  width: 279px;
}
.sex-cell {
  width: 135px;
}
.manage-cell {
  width: 200px;
}
.odd {
  background-color: #d7eaff;
}
.even {
  background-color: #fff;
}
.table-users-mob {
  display: none;
}
.add-guest-mob {
  display: none;
}
@media screen and (max-width: 840px) {
  .list {
    font-size: 15px;
    margin-bottom: 35px;
  }
  .table-users {
    display: none;
  }
  .table-users-mob {
    display: flex;
  }
  .th {
    font-size: 10px;
    height: 34px;
    display: flex;
    align-items: center;
  }
  .fio-cell {
    width: 66%;
  }
  .manage-cell {
    width: 34%;
    border: none;
  }
  .add-guest {
    display: none;
    
  }
  .add-guest-mob {
    margin-top: 56px;
font-size: 9px;
    width: 100px;
    height: 25px;
  border-radius: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}
  .users-edit {
    background-color: transparent;
    padding: 0;
    padding-top: 37px;
  }
}
</style>