<template>
  <div class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        :class="i % 2 === 0 ? 'even' : 'odd'"
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
  text-align: left;
  outline: none;
  line-height: 24px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 24px;
  margin-top: 7px;
}

.custom-select .selected {
  color: #000;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #000 transparent transparent transparent;
}

.custom-select .items {
  color: #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  border: 1px solid black;
}
.even {
  background-color: #d7eaff;
}
.odd {
  background-color: #fff;
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
    font-size: 10px;
    display: flex;
    width: 100%;
    padding-left: 0;
  }
  .custom-select .selected:after {
    top: 8px;
  }
  .custom-select .items {
    top: -8px;
    left: -6px;
  }
  .selected {
    width: 200px;
  }
}
</style>