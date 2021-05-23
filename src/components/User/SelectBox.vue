<template>
  <div class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>
<style scoped>
.custom-select {
  position: relative;
  width: 200px;
  height: 35px;
  text-align: left;
  outline: none;
  line-height: 35px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
}

.custom-select .selected {
  background-color: #ececec;
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 15px;
  right: 6px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #8F8F8F transparent transparent transparent;
}

.custom-select .open:after {
  position: absolute;
  content: "";
  top: 10px;
  right: 6px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: transparent transparent #8F8F8F transparent;
}

.custom-select .items {
  color: #000;
  overflow: hidden;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  position: absolute;
  background-color: #ececec;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.selectHide {
  display: none;
}

@media screen and (max-width: 840px) {
  .custom-select {
    width: 143px;
    height: 20px;
    line-height: 9px;
    font-size: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .custom-select .selected {
    background-color: transparent;
    padding-left: 0;
  }
  .custom-select .selected:after {
    top: 7px;
    border: 3px solid transparent;
    border-color: #8F8F8F transparent transparent transparent;
  }
  .custom-select .open:after {
   top: 5px;
    border: 3px solid transparent;
    border-color:  transparent transparent #8F8F8F transparent;
}
  .custom-select .items {
    height: 36px;
    top: 20px;
  }
  .custom-select .items > div {
    height: 20px;
  }
}
</style>