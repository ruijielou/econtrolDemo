<template>
  <div
    class="select-nav space-between-align"

    :class="{'row-reverse': rowReverse}">
    <div class="left" >
      <slot name="left"></slot>
      <slot name="default">
        <select-up
          v-if="leftReq"
          :active="leftActive"
          :req="leftReq"
          :needMounEmit="needMounEmit"
          :popupTitle="popupTitle"
          @confirm="onConfirm"></select-up>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
      <ul class="right-ul flex-start" name="default">
        <li
          class="item"
          :class="{'active': active === index}"
          @click="selectRight(item, index)"
          v-for="(item, index) in rightOption"
          :key="index">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SelectUp from './SelectUp.vue';
import { toRefs, reactive, onMounted, watch } from 'vue';
export default {
  components: {
    SelectUp
  },
  props: {
    popupTitle: {
      type: String,
      default: '请选择'
    },
    rowReverse: {
      type: Boolean,
      default: false
    },
    leftReq: {
      type: Object,
      default: () => {}
    },
    slotLeft: {
      type: Boolean,
      default: true
    },
    slotRight: {
      type: Boolean,
      default: false
    },
    needMounEmit: {
      type: Boolean,
      default: false
    },
    leftActive: {
      type: Number,
      default: 0
    },
    rightActive: {
      type: Number,
      default: 0
    },
    rightOption: {
      type: Array,
      default: () => []
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      active: 0,
      selectRight: (item, index) => {
        data.active = index;
        emit('rightSwitch', index, item);
      },
      onConfirm: (index, item) => {
        emit('leftChange', index, item);
      }
    })
    onMounted(() => {
      data.active = props.rightActive;
    })
    watch(() => props.rightActive, (n) => {
      data.active = n;
    }, {deep: true});
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.select-nav {
  &.row-reverse {
    flex-direction: row-reverse;
  }
  
  .right-ul {
    background: #E9EFF3;
    border-radius: 4px;
    padding: 2px;
    .item {
      padding: 4px 10px;
      font-size: 12px;
      color: #8D9EAE;
      background: #E9EFF3;
      &.active {
        color: #1D252F;
        background: #fff;
      }
    }
  }
}
</style>