<template>
  <div class="container flex-content-between" :style="{background:resOption.bgColor}">
    <div class="item1">
      <div class="item1-info">{{ resOption.info }}</div>
      <div class="item1-num">
        {{ val.num ? Number(val.num).toLocaleString() : '--' }}<span class="font-12">{{ resOption.unit }}</span>
      </div>
    </div>
    <div class="item2 space-between">
      <div class="item2-list">
        <div class="item2-info">{{ resOption.info1 }}</div>
        <div class="item2-num">
          {{ val.num1 ? Number(val.num1).toLocaleString() : '--' }}<span class="font-12">{{ resOption.unit1 }}</span>
        </div>
      </div>
      <div class="item2-list">
        <div class="item2-info">{{ resOption.info2 }}</div>
        <div class="item2-num">
          {{ val.num2 ? Number(val.num2).toLocaleString() : '--' }}<span class="font-12">{{ resOption.unit2 }}</span>
        </div>
      </div>
      <div v-if="resOption.info3" class="item2-list">
        <div class="item2-info">{{ resOption.info3 }}</div>
        <div class="item2-num">
          {{ val.num3 ? Number(val.num3).toLocaleString() : '--' }}<span class="font-12">{{ resOption.unit3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, watch} from "vue";

export default {
  name: "CardText",
  props: {
    resOption: Object,
    resData: Object,
  },
  components: {},
  setup(props) {
    const data = reactive({
      val: {}
    });
    onMounted(() => {

    });
    watch(() => ({...props.resData}), (res) => {
      data.val = res
    }, {immediate: true, deep: true});
    return {
      ...toRefs(data),
    };
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #FFF8F2;
  background-blend-mode: normal;
  border-radius: 10px;
  padding: 16px 20px;

  .item1 {
    width: 100%;
    height: 50%;

    .item1-info {
      color: rgba(141, 158, 174, 1);
      font-size: 12px;
    }

    .item1-num {
      color: rgba(249, 157, 53, 1);
      font-size: 24px;
      line-height: 32px;
      margin-top: 2px;
    }
  }

  .item2 {
    width: 100%;
    flex: 1;

    .item2-list {
      .item2-info {
        color: rgba(141, 158, 174, 1);
        font-size: 12px;
      }

      .item2-num {
        color: #313D4B;
        font-size: 16px;
        line-height: 20px;

        span {
        }
      }
    }

  }
}

</style>