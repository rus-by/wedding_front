<template>
  <div class="user-read" v-if="readonly">
    <div class="cell-td fio-cell" @click="expanded = !expanded">
      <p>{{ user.salutation }}</p>
      <img
        class="schevron expanded"
        :class="expanded ? 'rotated' : ''"
        src="@/assets/schevron.png"
        alt=""
      />
      <div class="mob-info expanded" v-if="expanded">
        <p>Статус: {{ state }}</p>
        <p>Сторона: {{ user.relation }}</p>
        <p>Пол: {{ user.sex }}</p>
      </div>
    </div>
    <div class="cell-td status-cell">{{ state }}</div>
    <div class="cell-td relation-cell">{{ user.relation }}</div>
    <div class="cell-td sex-cell">{{ user.sex }}</div>

    <div class="cell-td manage-little-cell" @click="startEdit">
      <img src="@/assets/edit.png" alt="" />
    </div>
    <div class="cell-td manage-little-cell" @click="deleteUser">
      <img src="@/assets/delete.png" alt="" />
    </div>
    <div class="cell-td manage-little-cell" @click="copy">
      <img src="@/assets/copy.png" alt="" />
    </div>

    <div class="manage-mob">
      <div class="cell-td" @click="goToEditPage">
        <img src="@/assets/edit-mob.png" alt="" />
      </div>
      <div class="cell-td" @click="deleteUser">
        <img src="@/assets/trash-mob.png" alt="" />
      </div>
      <div class="cell-td" @click="copy">
        <img src="@/assets/copy-mob.png" width="16" alt="" />
      </div>
    </div>
  </div>

  <div class="user-edit" v-else>
    <div class="cell-td fio-cell">
      <input v-model="salutation" type="text" class="input-name" />
    </div>
    <div class="cell-td status-cell">{{ state }}</div>
    <div class="padding-add relation-cell no-margin">
      <admin-select
        v-model="relation"
        :options="['Жених', 'Невеста']"
        :default="relation"
      />
    </div>
    <div class="padding-add sex-cell no-margin">
      <admin-select v-model="sex" :options="['М', 'Ж']" :default="sex" />
    </div>
    <div class="cell-td manage-little-cell" @click="handleOk">
      <img src="@/assets/check.png" alt="" />
    </div>
    <div v-if="!isNew" class="cell-td manage-little-cell" @click="deleteUser">
      <img src="@/assets/delete.png" alt="" />
    </div>
    <div class="cell-td manage-little-cell" @click="copy">
      <img src="@/assets/copy.png" alt="" />
    </div>
  </div>
</template>

<script>
import AdminSelect from "./AdminSelect.vue";
export default {
  name: "User",
  props: ["user", "isNew"],
  data() {
    return {
      readonly: true,
      salutation: "",
      sex: "М",
      relation: "Жених",
      urlToCopy: "",
      expanded: false,
    };
  },
  created() {
    if (this.isNew) {
      this.readonly = false;
    } else {
      this.urlToCopy = this.user.id;
    }
  },
  methods: {
    startEdit() {
      this.readonly = false;
      this.fillInputs();
    },
    handleOk() {
      this.isNew ? this.createUser() : this.editUser();
    },
    goToEditPage() {
      this.$router.push(`/cabinet/guest/${this.user.id}`);
    },
    async deleteUser() {
      await this.$api.delete(`/user/${this.user.id}`);
      this.needReload();
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
    async copy() {
      this.$copyText(`pavlov.wedding/event/${this.urlToCopy}`).then(
        function (e) {
          console.log(e);
        },
        function (e) {
          console.log(e);
        }
      );
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
      return STATE[this.user.state];
    },
  },
  components: {
    AdminSelect,
  },
};
</script>
<style scoped>
.expanded {
  display: none;
}
.cell-td {
  font-size: 15px;
  padding-left: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
tr {
  height: 40px;
}
.input-name {
  height: 35px;
  width: 380px;
}

.user-edit {
  display: flex;
}
.user-read {
  display: flex;
}
.fio-cell {
  width: 410px;
  border-right: 6px solid #f6f6f6;
}
.status-cell {
  width: 134px;
  border-right: 6px solid #f6f6f6;
}
.relation-cell {
  width: 279px;
  border-right: 6px solid #f6f6f6;
}
.sex-cell {
  width: 135px;
  border-right: 6px solid #f6f6f6;
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

  .user-read > .status-cell,
  .user-read > .relation-cell,
  .user-read > .sex-cell,
  .user-read > .manage-little-cell {
    display: none;
  }
  .cell-td {
    font-size: 10px;
    height: 34px;
  }
  .fio-cell {
    width: 66%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 34px;
    padding-top: 4px;
    padding-bottom: 4px;
    height: auto;
    position: relative;
  }
  .manage-mob {
    width: 34%;
    display: flex;
    justify-content: space-around;
  }
  .schevron {
    position: absolute;
    top: 11px;
    display: block;
    right: 11px;
  }
  .rotated {
    transform: rotate(180deg);
  }
}
</style>