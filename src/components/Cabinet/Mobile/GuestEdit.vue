<template>
  <div class="user-edit">
    <p class="edit-heading">РЕДАКТИРОВАНИЕ</p>
    <div class="row">
      <div class="heading cell">
        <p>Критерий</p>
      </div>
      <div class="heading cell">
        <p>Гость</p>
      </div>
    </div>
    <div class="row">
      <div class="cell">
        <p>ФИО</p>
      </div>
      <div class="cell">
        <input v-model="salutation" type="text" class="input-fio" />
      </div>
    </div>
    <div class="row even-row">
      <div class="cell">
        <p>Статус</p>
      </div>
      <div class="cell">
        <p>{{ state }}</p>
      </div>
    </div>
    <div class="row">
      <div class="cell">
        <p>Сторона</p>
      </div>
      <div class="cell">
        <admin-select
          v-model="relation"
          :options="['Жених', 'Невеста']"
          :default="relation"
        />
      </div>
    </div>

    <div class="row even-row">
      <div class="cell">
        <p>Пол</p>
      </div>
      <div class="cell">
        <admin-select v-model="sex" :options="['М', 'Ж']" :default="sex" />
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
import AdminSelect from "../AdminSelect.vue";
export default {
  name: "GuestEdit",
  props: [],
  data() {
    return {
      salutation: "",
      sex: "М",
      relation: "Жених",
      urlToCopy: "",
      user: {},
    };
  },
  async created() {
    if (this.$route.params.id !== "new") {
      await this.getUser();
      this.fillInputs();
    }
  },
  methods: {
    goBack() {
      this.$router.push("/cabinet");
    },
    startEdit() {
      this.fillInputs();
    },
    async getUser() {
      const id = this.$route.params.id;
      const data = await this.$api.get(`/user/${id}`);
      this.user = data.data;
    },
    handleOk() {
      this.$route.params.id === "new" ? this.createUser() : this.editUser();
    },
    async editUser() {
      await this.$api.put(`/user/${this.user.id}`, {
        salutation: this.salutation,
        sex: this.sex,
        relation: this.relation,
      });
      this.needReload();
      this.readonly = true;
    },
    async createUser() {
      await this.$api.post("/user", {
        salutation: this.salutation,
        sex: this.sex,
        relation: this.relation,
      });
      this.needReload();
    },
    fillInputs() {
      this.salutation = this.user.salutation;
      this.sex = this.user.sex;
      this.relation = this.user.relation;
    },
    needReload() {
      this.$emit("needUpdate");
    },
  },
  computed: {
    state() {
      const STATE = {
        1: "Создан",
        2: "Придет",
        3: "Не придет",
        4: "Перешел по ссылке",
      };
      return STATE[this.user.state] ? STATE[this.user.state] : "-";
    },
  },
  components: {
    AdminSelect,
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
.input-fio {
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
  width: 30%;
}
.heading:last-of-type {
  width: 70%;
}
.row > .cell:first-child {
  border-right: 7px solid #f6f6f6;
  width: 30%;
}
.row > .cell:last-child {
  width: 70%;
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