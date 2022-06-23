<template>
  <div class="eselect-container">
    <div class="select-button space-between-align" @click="onShow">
      <span>
        {{ activeName }}
      </span>
      <van-icon class="select-icon" name="play" />
    </div>
     <div class="content-wrapper">  
       <ul class="content" v-show="showList">
         <li
           class="item"
           v-for="(item, index) in option"
           :key="index"
           :class="{'active': activeIndex === index}"
           @click="onChoose(item, index)">
           {{item?.text}}</li>
       </ul>

     </div>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, watch } from 'vue';
export default {
  props: {
    req: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Number,
      default: 0
    },
    option: {
      type: Array,
      default: () => []
    }
  },
  components: {
  },
  setup(props, { emit }) {
    const data = reactive({
      activeName: '',
      showList: false,
      activeIndex: 0,
      activeItem: {},
      onShow: () => {
        if (props.option.length > 1) data.showList = !data.showList;
      },
      onChoose: (item, index) => {
        data.showList = false;
        data.activeName = item.text;
        data.activeIndex = index;
        emit('confirm', index, item);
      },
      initData: () => {
        data.activeIndex = props.active;
        data.activeItem = props.option[data.activeIndex];
        data.activeName = props.option[data.activeIndex]?.text;

        emit('confirm', data.activeIndex, data.activeItem);
      }
    })
    watch(() => ({...props.req}), (res, o) => {
      // if (res?.orgCode) {
      //   data.initData(res);
      // }
    })
    onMounted(() => {
      data.initData();
    })
    return {
      ...toRefs(data),
    }
  }
}
</script>

<style lang="less" scoped>
.eselect-container {
  position: relative;
  .select-button {
    width: 100px;
    height: 28px;
    padding: 6px 10px;
    background: #E9EFF3;
    border-radius: 4px;
    color: #1D252F;
    font-size: 12px;
    .select-icon {
      margin-left: 8px;
      transform: rotate(90deg);
    }
  }
  .content-wrapper {
    position: absolute;
    top: 32px;
    left: 0;
    z-index: 1;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 7px #E9EFF3;
    .content {
      max-height: 200px;
      overflow: scroll;
    }
    .item {
      width: 100px;
      line-height: 48px;
      padding-left: 15px;
      font-size: 14px;
      color: #455467;
      &.active {
        color: #F99D35;
      }
    }
  }
}
</style>