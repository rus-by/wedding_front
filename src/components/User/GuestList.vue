<template>
  <div class="guest-list">
    <img
      src="@/assets/queen.png"
      class="left-corner"
      v-if="type === 'bride'"
      alt=""
    />
    <img
      src="@/assets/king.png"
      class="left-corner"
      v-if="type === 'groom'"
      alt=""
    />
    <img
      src="@/assets/queen.png"
      class="right-corner"
      v-if="type === 'bride'"
      alt=""
    />
    <img
      src="@/assets/king.png"
      class="right-corner"
      v-if="type === 'groom'"
      alt=""
    />
    <img src="@/assets/suits-guests.png" class="guest-suits" alt="" />
  
    <p class="guest" v-for="guest in guests" :key="guest.id">
      {{ guest.salutation }}
    </p>
      <img src="@/assets/suits-guests.png" class="guest-suits-bot" alt="" />
  </div>
</template>
<script>
export default {
  props: ["type", "guests"],
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style scoped>
.guest {
  font-size: 18px;
  color: black;
  font-family: "Orchidea Pro";
}
.guest-list {
  border-radius: 53px;
  background-color: #fff;
  min-height: 535px;
  width: 416px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;
  position: relative;
}
.guest-suits {
  margin-top: 20px;
}
.guest-suits-bot {
  position: absolute;
  bottom: 0px;
  left: 42%
}
.left-corner {
  position: absolute;
  top: 30px;
  left: 23px;
}
.right-corner {
  position: absolute;
  bottom: 30px;
  right: 23px;
  transform: rotate(180deg);
}

@media screen and (max-width: 840px) {
  .guest-list {
     border-radius: 23px;
    width: 197px;
    min-height: 303px;
  }
  .guest {
    font-size: 10px;
  }

  .left-corner {
    top: 14px;
    left: 12px;
    width: 26px;
  }
  .right-corner {
    bottom: 14px;
    right: 12px;
    width: 26px;
  }
  .guest-suits {
    width: 36px;
    margin-top: 10px;
  }
  .guest-suits-bot {
    width: 36px;
  position: absolute;
  bottom: 0px;
  left: 42%
}
}
</style>