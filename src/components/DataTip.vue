<template>
  <div class="datatip space-between-align">
    <div class="img">
      <img src="@/assets/info-circle.png" alt="">
    </div>
    <div class="font-12">
      {{ name + value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.datatip {
  display: inline-flex;
  align-items: center;
  color: #8d9eae;
  .img {
    width: 12px;
    height: 12px;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>