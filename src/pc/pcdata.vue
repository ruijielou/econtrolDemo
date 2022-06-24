<script>
import { ref, reactive, toRefs } from "vue";
import Line from "@/components/charts/line.vue";
import { chartData, line1, line2 } from "./data";
export default {
  components: { Line },
  setup() {
    const data = reactive({
      line1,
      line2,
      chartData,
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<template>
  <div class="home_page">
    <div class="chart_block" v-for="item in chartData" :key="item.title">
      <div class="title flex flex-justify-between">
        <h5>{{item.title}}</h5>
        <span class="remark">{{item.remark}}</span>
      </div>
      <van-divider />
      <div class="filter flex">
        <div class="operation_tool">
          <van-button v-for="btn in item.operation" class="my-button" :key="btn.text" size="small"
            :plain="btn.isDefault" :type="btn.isDefault ? 'warning': ''">{{btn.text}}</van-button>
          <!-- <van-button class="my-button" style="margin-left: 10px;" size="small" plain>面积</van-button> -->
        </div>
        <div class="flex flex-justify-left flex-align-middle" :class="`flex-${opera.flex}`" :key="opera.title"
          v-for="opera in item?.operationTool">
          <span>{{opera.title}}</span>
          <span class="warning-text">{{opera.value}}</span>
          <span>{{opera.company}}</span>
        </div>
      </div>
      <div class="flex grid_block">
        <div class="flex-1" :key="index" v-for="(chart, index) in item.chartData">
          <Line :option="chart" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@color: #ccc;
.home_page {
  height: 100%;
  overflow: auto;
  background-color: rgb(239, 242, 244);
  .my-button {
    padding-left: 2em;
    padding-right: 2em;
    border-radius: 4px;
  }
  .chart_block {
    margin: 6px 12px;
    padding: 1em 0;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    .grid_block {
      height: 3rem;
    }
    .title {
      padding: 0 2em;
      // border-bottom: 1px solid @color;
      .remark {
        color: @color;
      }
    }
    .warning-text {
      color: var(--van-button-warning-background-color);
      font-size: 0.2rem;
      margin-left: 1em;
      margin-right: 0.5em;
    }
    .filter {
      padding: 1em 2em;
    }
    .operation_tool > button {
      margin-right: 1em;
    }
  }
}
</style>