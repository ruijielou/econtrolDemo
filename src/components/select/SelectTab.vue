<template>
  <div class="select-tab flex-start">
    <div
      class="select-tab__item"
      :class="{'select-tab__item--active': active === index}"
      v-for="(item, index) in list"
      :key="index"
      @click="choose(item, index)">
      {{item.text}}
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
export default {
  props: ['list'],
  components: {
  },
  setup(props, {emit}) {
    const data = reactive({
      active: 0,
      choose: (item, index) => {
        data.active = index;
        emit('select', index, item);
      }
    });
    onMounted(() => {

    });
    return {
      ...toRefs(data),
    };
  }
}
</script>

<style lang="less" scoped>
.select-tab {
  &__item {
    padding: 2px 10px;
    font-size: 12px;
    color: #8D9EAE;
    border: 1px solid rgba(233, 239, 243, 1);
    border-right: 1px solid transparent;
    &:first-child {
      border-radius: 20px 0px 0px 20px;
    }
    &:last-child {
      border-radius: 0px 20px 20px 0px;
      border: 1px solid rgba(233, 239, 243, 1);
    }
  }
  &__item--active {
    color: #FFA200;
    border: 1px solid rgba(255, 162, 0, 1);
    &:last-child {
      border: 1px solid rgba(255, 162, 0, 1);
    }
  }
}
</style>