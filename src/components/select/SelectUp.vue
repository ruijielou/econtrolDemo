<template>
  <div class="container">
    <div class="select-button space-between-align" :class="{'gray': option.length <= 1}" @click="onShow">
      <span class="name">
        {{ activeName }}
      </span>
      <van-icon class="select-icon" name="play" />
    </div>
    <van-popup class="popup" :show="showPopup" round position="bottom" :style="{ maxHeight: '55%', minHeight: '35%'}">
      <div class="btn space-between">
        <div class="btn-l" @touchend="onClose">取消</div>
        <div class="btn-m">{{ popupTitle }}</div>
        <div class="btn-r" @touchend="onConfirm">完成</div>
      </div>
      <ul class="content">
        <li class="item" v-for="(item, index) in option" :key="index" :class="{'active': activeIndex === index}"
          @click="onChoose(item, index)">
          {{item?.name}}</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, watch } from "vue";
// import { archivesStagePage } from "@/common/api/proAchives";
export default {
  props: {
    req: {
      type: Object,
      default: () => {},
    },
    popupTitle: {
      type: String,
      default: "请选择",
    },
    active: {
      type: Number,
      default: 0,
    },
    needMounEmit: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  setup(props, { emit }) {
    const data = reactive({
      activeName: "",
      showPopup: false,
      activeIndex: 0,
      activeItem: {},
      onConfirm: () => {
        data.showPopup = false;
        data.activeName = data.option[data.activeIndex]?.name;
        emit("confirm", data.activeIndex, data.activeItem);
      },
      onClose: () => {
        data.showPopup = false;
      },
      onShow: () => {
        if (data.option.length > 1) data.showPopup = true;
      },
      onChoose: (item, index) => {
        data.activeIndex = index;
        data.activeItem = item;
      },
      option: [],
      handleApi: async (req) => {
        /* data.option = (await archivesStagePage(req))?.records;
        data.activeName = data.option[data.activeIndex]?.name;*/
      },
      initData: async (req) => {
        let req1 = {
          orgCode: "", //项目id/分期id
          pageNo: 1, // 页码
          pageSize: 50, // 页大小
          queryPro: "1",
        };
        await data.handleApi(Object.assign(req1, req));
        data.activeIndex = props.active;
        data.activeItem = data.option[data.activeIndex];
        if (props.needMounEmit)
          emit("confirm", data.activeIndex, data.activeItem);
      },
    });
    watch(
      () => ({ ...props.req }),
      (res, o) => {
        if (o) {
          data.initData(res);
        }
      }
    );
    onMounted(async () => {
      if (props?.req.orgCode) {
        data.initData(props?.req);
      }
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  .select-button {
    padding: 6px 10px;
    background: #e9eff3;
    border-radius: 4px;
    color: #1d252f;
    font-size: 12px;
    .name {
      display: inline-block;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.gray {
      opacity: 0.3;
    }
    .select-icon {
      margin-left: 8px;
      transform: rotate(90deg);
    }
  }
  .popup {
    .btn {
      width: 100%;
      position: fixed;
      left: 0;
      background: #ffffff;
      border-radius: 16px 16px 0 0;
      z-index: 999999999;
      line-height: 16px;
      color: rgba(29, 37, 47, 1);
      font-size: 16px;
      padding: 18px 16px 15px;
      border-bottom: rgba(248, 250, 251, 0.9) solid 1px;

      .btn-l {
        color: rgba(141, 158, 174, 1);
      }

      .btn-m {
        color: rgba(29, 37, 47, 1);
      }

      .btn-r {
        color: rgba(255, 162, 0, 1);
      }
    }
    .content {
      width: 100%;
      height: calc(100% - 50px);
      margin: 50px 0 20px;
      padding: 0 16px;
      overflow: auto;
      .item {
        font-size: 16px;
        padding: 10px 0;
        color: #1d252f;
        &.active {
          color: #ffa200;
        }
      }
    }
  }
}
</style>