<template>
  <div class="container">
    <div class="select-button space-between-align"
      @click="showPopup">
      <span class="name">
        {{ popupValue }}
      </span>
      <van-icon class="select-icon" name="play" />
    </div>
    <select-pro/>
  </div>
</template>

<script>
import { toRefs, reactive, provide, onMounted, watch } from 'vue';
import {useStore} from "vuex";
import SelectPro from "@/components/select/SelectPro";
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
    
    needMounEmit: {
      type: Boolean,
      default: false
    },
  },
  components: {
    SelectPro
  },
  setup(props, { emit }) {
    const store = useStore();
    const data = reactive({
      popupValue: store.state.user.companyName || '请选择',
      popupType: false,
      orgCode: '',
      req: {
        userId: '',
        orgCode: '',
        orgLevelId: '',
      },
      showPopup: () => {
        data.popupType = true
      },
    })
    watch(() => ({...data.req}), (res, o) => {
      if (o && res && res !== o) {
        emit('confirm', res);
      }
    },{immediate: true, deep: true})
    onMounted(async () => {
    })
    provide("profilesListData", data)  //存入获取到的接口数据，去子组件用 inject('data') 取值
    return {
      ...toRefs(data),
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .select-button {
    padding: 6px 10px;
    background: #E9EFF3;
    border-radius: 4px;
    color: #1D252F;
    font-size: 12px;
    .name {
      display: inline-block;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .select-icon {
      margin-left: 8px;
      transform: rotate(90deg);
    }
  }
}
</style>