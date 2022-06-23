<template>
  <div class="select-tab flex-start">
    <div
      class="select-tab__item"
      :class="{'select-tab__item--active': active1 === index}"
      v-for="(item, index) in list"
      :key="index"
      @click="choose(item, index)">
      {{item.text}}
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, watch} from "vue";
export default {
  props: ['list', 'active'],
  components: {
  },
  setup(props, {emit}) {
    const data = reactive({
      active1: 0,
      choose: (item, index) => {
        data.active1 = index;
        emit('select', index, item);
      }
    });
    onMounted(() => {
      data.active1 = props.active;
    })
    watch(() => props.active, (n) => {
      data.active1 = n;
    }, {deep: true});
    return {
      ...toRefs(data),
    };
  }
}
</script>

<style lang="less" scoped>
.select-tab {
  &__item {
    padding: 6px 10px;
    margin-right: 4px;
    font-size: 12px;
    color: #8D9EAE;
    background: rgba(233, 239, 243, 0.45);
    &:first-child {
    }
    &:last-child {
      // background: #FFAC00;
    }
  }
  &__item--active {
    color: #FFA200;
    background: rgba(255, 172, 0, 0.1);

  }
}
</style>