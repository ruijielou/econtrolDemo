<template>
  <div class="container">
    <div class="select-button space-between-align" @touchend="showPopup = true">
      <span>
        {{ activeName }}
      </span>
      <div class="select-icon">
        <img src="@/assets/images/icon/calendar.png" alt="">
      </div>
    </div>
    <van-popup class="popup"
      :show="showPopup"
      round
      position="bottom">
      <van-date-picker
        v-bind="$attrs"
        v-model="currDate"
        :title="popupTitle"
        :maxDate="maxDate"
        :columns-type="columnsType"
        @cancel="showPopup = false"
        @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, watch } from 'vue';
import { useRouter } from "vue-router";
let currentYear = new Date().getFullYear();
let currentMonth0 = new Date().getMonth() + 1;
let currentDay0 = new Date().getDate();
const addZero = (val) => val < 10 ? `0${val}` : val;
let currentMonth = addZero(currentMonth0);
let lastMonth = addZero(currentMonth0 - 1);
let currentDay = addZero(currentDay0);
export default {
  props: {
    popupTitle: {
      type: String,
      default: '选择日期'
    },
  },
  components: {
  },
  setup(props, { emit }) {
    const router = useRouter();
    const data = reactive({
      activeName: '',
      showPopup: false,
      columnsType: ['year', 'month'],
      maxDate: null,
      currDate: [],
      confirm: (item) => {
        data.currDate = item?.selectedValues;
        data.activeName = data.currDate.join('-');
        data.showPopup = false;
        emit('confirm', data.activeName);
      },
    })
    watch(()=>(router.currentRoute.value.path), (res, o) => {
      if (res.indexOf('dailyDynamic') > -1) {
        data.columnsType = ['year', 'month', 'day'];
        data.maxDate = new Date(currentYear, currentMonth0 - 1, currentDay0 - 1);
        data.currDate = [String(currentYear), String(currentMonth),  String(currentDay - 1)];
        data.activeName = data.currDate.join('-');
        emit('confirm', data.activeName);
      } else {
        data.columnsType = ['year', 'month'];
        data.maxDate = new Date(currentYear, currentMonth0 - 1);
        data.currDate = [String(currentYear), String(lastMonth)];
        data.activeName = data.currDate.join('-');
        emit('confirm', data.activeName);
      }
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
      // emit('confirm', data.activeName);
    })
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
    .select-icon {
      margin-left: 8px;
      width: 12px;
      height: 12px;
      img {
        width: 100%;
        height: 100%;
      }
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
      margin-top: 50px;
      padding: 0 16px;
      overflow: auto;
      .item {
        font-size: 16px;
        padding: 10px 0;
        color: #1D252F;
        &.active {
          color: #FFA200;
        }
      }
    }
  }
}
</style>