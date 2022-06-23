<script>
import { ref, reactive, toRefs } from "vue";
import Line from "@/components/charts/line.vue";
export default {
  components: { Line },
  setup() {
    const data = reactive({
      LineOption: {
        title: {
          text: "货值状态",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["占比", "土储"],
          itemHeight: 7, //修改icon图形大小
          textStyle: {
            fontSize: 12, //字体大小
            color: "#333",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: 0,
              formatter: (value) => {
                let ret = ""; //拼接加\n返回的类目项
                let maxLength = 4; //每项显示文字个数
                let valLength = value.length; //X轴类目项的文字个数
                let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于5,
                  for (let i = 0; i < rowN; i++) {
                    let temp = ""; //每次截取的字符串
                    let start = i * maxLength; //开始截取的位置
                    let end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              },
            },
            data: [
              "项目未启动",
              "项目已启动分期未启动",
              "启动未开工",
              "开工未达+-0",
              "达+-0未达售",
              "达售未取证",
              "期房库存",
              "现房库存",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
          {
            type: "value",
            scale: true,
            name: "Order",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            name: "占比",
            type: "line",
            stack: "Total",
            yAxisIndex: 0, // 配置多个y轴
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "rgb(157,117,235)",
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: "土储",
            type: "bar",
            stack: "Total",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "rgb(106,145,245)",
            },
            data: [],
          },
        ],
      },
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<template>
  <div class="home_page">
    <div class="chart_block">
      <div class="title flex flex-justify-between">
        <h5>土储</h5>
        <span class="remark">注： 默认为全口径</span>
      </div>
      <van-divider />
      <div class="filter flex">
        <div>
          <van-button class="my-button" size="small" plain type="warning">金额</van-button>
          <van-button class="my-button" style="margin-left: 10px;" size="small" plain>面积</van-button>
        </div>
        <div class="flex flex-2 flex-justify-center flex-align-middle">
          <span>销售物业土储货值</span>
          <span class="warning-text">0.00</span>
          <span>万元</span>
        </div>
        <div class="flex flex-2 flex-justify-center flex-align-middle">
          <span>销售物业土储货值</span>
          <span class="warning-text">0.00</span>
          <span>万元</span>
        </div>
        <div class="flex flex-3 flex-justify-center flex-align-middle">
          <span>销售物业土储货值</span>
          <span class="warning-text">0.00</span>
          <span>万元</span>
        </div>
      </div>
      <van-grid :border="false" clickable :column-num="2">
        <van-grid-item icon="home-o" text="路由跳转">
          <Line :option="LineOption" />
        </van-grid-item>
        <van-grid-item icon="search" text="URL 跳转" url="https://github.com" />
      </van-grid>
    </div>
  </div>
</template>
<style lang="less" scoped>
@color: #ccc;
.home_page {
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
    .van-grid-item {
      height: 30vh;
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
  }
}
</style>