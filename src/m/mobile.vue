<script>
import { onMounted, provide, reactive, toRefs } from "vue";
import SelectNav from "@/components/select/SelectNav.vue";
import LineBar from "@/components/charts/LineBar.vue";
import DataTip from "@/components/DataTip.vue";
import Nothing from "@/components/Nothing.vue";
import CardText from "@/components/CardText.vue";

export default {
  name: "storeUp",
  components: { SelectNav, DataTip, CardText, LineBar, Nothing },
  setup() {
    const data = reactive({
      active: 0,
      req: {
        dateSkey: "",
        orgCode: "",
      },
      leftReq: {
        orgCode: "", //项目id/分期id
        pageNo: 1, // 页码 默认1
        pageSize: 50, // 页大小 默认50
        queryPro: "1",
      },
      endDateTime: "",
      // selectNav 组件
      leftActive: 0,
      rightActive: 0,
      rightOption: [
        { text: "全口径", value: 0 },
        { text: "权益口径", value: 1 },
      ],

      cardTextProps1: {
        bgColor: "#FFF8F2", // 背景颜色
        info: "销售物业土储货值 A=B+C",
        unit: "万元",
        info1: "住宅土储货值 B",
        unit1: "万元",
        info2: "公建土储货值 C",
        unit2: "万元",
      },
      cardTextData1: {},
      cardTextProps2: {
        bgColor: "#FFF8F2", // 背景颜色
        info: "土储面积 D=E+F",
        unit: "㎡",
        info1: "销售物业土储面积 E",
        unit1: "㎡",
        info2: "持有物业土储面积 F",
        unit2: "㎡",
      },
      cardTextData2: {},
      // Echarts 组件1
      lineBarOption1: {
        //Echarts 默认参数，不修改可以为空，不能删除、保留结构
        unit: ["%", ""], //单位，根据y轴顺序显示
        legend: {
          data: ["土储货值", "占比"],
        },
        /*grid: {
          left: '16.6%',
          right: '1%',
          top: '48',  //resOption.title.subtext ?  '22.6%': '16.4%' ,
          bottom: '25%'
        },*/
        yAxis: [
          {
            name: "(单位：万元)",
          },
        ],
        /*xAxis: [{
          axisLabel: {
            rotate: '0'
          },
        }],*/
        series: [
          {
            name: "土储货值", //需要和 legend.data 数组内容顺序一致
            stack: "广告",
            barWidth: 10, //柱状条宽度
            itemStyle: {
              color: "#76A0F8", //柱状条的颜色
            },
          },
          {
            name: "占比", //需要和 legend.data 数组内容顺序一致
            itemStyle: {
              color: "#FFC229", //折线图的颜色
            },
            symbol: "none", //取消折点圆圈
          },
        ],
      },
      lineBarData1: {},
      lineBarData2: {},
      lineBarData3: {},
      lineBarData4: {},

      // Echarts 组件2
      lineBarOption2: {
        //Echarts 默认参数，不修改可以为空，不能删除、保留结构
        unit: ["%", ""], //单位，根据y轴顺序显示

        legend: {
          data: ["土储货值", "占比"],
        },
        yAxis: [
          {
            name: "(单位：万元)",
          },
        ],
        series: [
          {
            name: "土储货值", //需要和 legend.data 数组内容顺序一致
            stack: "广告",
            barWidth: 10, //柱状条宽度
            itemStyle: {
              color: "#FFC229", //柱状条的颜色
            },
          },
          {
            name: "占比", //需要和 legend.data 数组内容顺序一致
            itemStyle: {
              color: "#FF666A", //折线图的颜色
            },
            symbol: "none", //取消折点圆圈
          },
        ],
      },

      // Echarts 组件3
      lineBarOption3: {
        //Echarts 默认参数，不修改可以为空，不能删除、保留结构
        unit: ["%", ""], //单位，根据y轴顺序显示

        legend: {
          data: ["土储货值", "占比"],
        },
        yAxis: [
          {
            name: "(单位：㎡)",
          },
        ],
        series: [
          {
            name: "土储货值", //需要和 legend.data 数组内容顺序一致
            stack: "广告",
            barWidth: 10, //柱状条宽度
            itemStyle: {
              color: "#76A0F8", //柱状条的颜色
            },
          },
          {
            name: "占比", //需要和 legend.data 数组内容顺序一致
            itemStyle: {
              color: "#FFC229", //折线图的颜色
            },
            symbol: "none", //取消折点圆圈
          },
        ],
      },

      // Echarts 组件4
      lineBarOption4: {
        //Echarts 默认参数，不修改可以为空，不能删除、保留结构
        unit: ["%", ""], //单位，根据y轴顺序显示

        legend: {
          data: ["土储货值", "占比"],
        },
        yAxis: [
          {
            name: "(单位：㎡)",
          },
        ],
        series: [
          {
            name: "土储货值", //需要和 legend.data 数组内容顺序一致
            stack: "广告",
            barWidth: 10, //柱状条宽度
            itemStyle: {
              color: "#FFC229", //柱状条的颜色
            },
          },
          {
            name: "占比", //需要和 legend.data 数组内容顺序一致
            itemStyle: {
              color: "#FF666A", //折线图的颜色
            },
            symbol: "none", //取消折点圆圈
          },
        ],
      },

      amountEquityTaProjConstructureItem: "", // 权益口径金额
      amountFullTaProjConstructureItem: "", // 全口径金额
      areaEquityTaProjConstructureItem: "", // 权益口径面积
      areaFullTaProjConstructureItem: "", // 全口径面积

      rightSwitch: async (index) => {
        data.rightActive = index;
        await data.handleData();
      },
      tabChange: async (res) => {
        data.active = res.name;
        await data.handleData();
      },
      leftChange: async (index, item) => {
        data.req.orgCode = item.orgCode;
        await data.handleApi(data.req);
      },

      amountFull: () => {
        //全口径
        data.cardTextData1 = {
          num: data.amountFullTaProjConstructureItem.taTaProjCostructure
            ?.saleStorage,
          num1: data.amountFullTaProjConstructureItem.taTaProjCostructure
            ?.residenceStorage,
          num2: data.amountFullTaProjConstructureItem.taTaProjCostructure
            ?.publicStorage,
        };

        data.lineBarData1 = {
          x: data.amountFullTaProjConstructureItem.hzztjgfx?.x,
          bar1: data.amountFullTaProjConstructureItem.hzztjgfx?.bar1,
          line1: data.amountFullTaProjConstructureItem.hzztjgfx?.line1,
        };
        data.lineBarData2 = {
          x: data.amountFullTaProjConstructureItem.cplxjgfx?.x,
          bar1: data.amountFullTaProjConstructureItem.cplxjgfx?.bar1,
          line1: data.amountFullTaProjConstructureItem.cplxjgfx?.line1,
        };
      },
      areaFull: () => {
        //全口径
        data.cardTextData2 = {
          num: data.areaFullTaProjConstructureItem.taTaProjCostructure
            .saleStorage,
          num1: data.areaFullTaProjConstructureItem.taTaProjCostructure
            .residenceStorage,
          num2: data.areaFullTaProjConstructureItem.taTaProjCostructure
            .publicStorage,
        };
        data.lineBarData3 = {
          x: data.areaFullTaProjConstructureItem.hzztjgfx?.x,
          bar1: data.areaFullTaProjConstructureItem.hzztjgfx?.bar1,
          line1: data.areaFullTaProjConstructureItem.hzztjgfx?.line1,
        };
        data.lineBarData4 = {
          x: data.areaFullTaProjConstructureItem.cplxjgfx?.x,
          bar1: data.areaFullTaProjConstructureItem.cplxjgfx?.bar1,
          line1: data.areaFullTaProjConstructureItem.cplxjgfx?.line1,
        };
      },
      amountEquity: () => {
        // 权益口径
        data.cardTextData1 = {
          num: data.amountEquityTaProjConstructureItem.taTaProjCostructure
            ?.saleStorage,
          num1: data.amountEquityTaProjConstructureItem.taTaProjCostructure
            ?.residenceStorage,
          num2: data.amountEquityTaProjConstructureItem.taTaProjCostructure
            ?.publicStorage,
        };

        data.lineBarData1 = {
          x: data.amountEquityTaProjConstructureItem.hzztjgfx?.x,
          bar1: data.amountEquityTaProjConstructureItem.hzztjgfx?.bar1,
          line1: data.amountEquityTaProjConstructureItem.hzztjgfx?.line1,
        };
        data.lineBarData2 = {
          x: data.amountEquityTaProjConstructureItem.cplxjgfx?.x,
          bar1: data.amountEquityTaProjConstructureItem.cplxjgfx?.bar1,
          line1: data.amountEquityTaProjConstructureItem.cplxjgfx?.line1,
        };
      },
      areaEquity: () => {
        // 权益口径
        data.cardTextData2 = {
          num: data.areaEquityTaProjConstructureItem.taTaProjCostructure
            ?.saleStorage,
          num1: data.areaEquityTaProjConstructureItem.taTaProjCostructure
            ?.residenceStorage,
          num2: data.areaEquityTaProjConstructureItem.taTaProjCostructure
            ?.publicStorage,
        };
        data.lineBarData3 = {
          x: data.areaEquityTaProjConstructureItem.hzztjgfx?.x,
          bar1: data.areaEquityTaProjConstructureItem.hzztjgfx?.bar1,
          line1: data.areaEquityTaProjConstructureItem.hzztjgfx?.line1,
        };
        data.lineBarData4 = {
          x: data.areaEquityTaProjConstructureItem.cplxjgfx?.x,
          bar1: data.areaEquityTaProjConstructureItem.cplxjgfx?.bar1,
          line1: data.areaEquityTaProjConstructureItem.cplxjgfx?.line1,
        };
      },
      handleData: () => {
        if (data.rightActive === 0 && data.active === 0) {
          data.amountFull();
        } else if (data.rightActive === 0 && data.active === 1) {
          data.areaFull();
        } else if (data.rightActive === 1 && data.active === 0) {
          data.amountEquity();
        } else if (data.rightActive === 1 && data.active === 1) {
          data.areaEquity();
        }
      },
      handleApi: (req) => {
        const lineBarData1 = {
          x: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-12",
          ],
          bar1: [750, 732, 701, 854, 390, 530, 410, 701, 854, 390, 530, 346],
          line1: [
            862, 1018, 964, 1026, 1679, 1600, 1570, 1018, 964, 1018, 964, 1018,
          ],
          bar2: [530, 410, 701, 854, 530, 346, 390, 701, 854, 390, 750, 732],
          line2: [
            964, 1018, 1018, 862, 1600, 1570, 1018, 964, 1018, 964, 1026, 1679,
          ],
        };
        const lineBarData2 = {
          x: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-12",
          ],
          bar1: [750, 732, 701, 854, 390, 530, 410, 701, 854, 390, 530, 346],
          line1: [
            862, 1018, 964, 1026, 1679, 1600, 1570, 1018, 964, 1018, 964, 1018,
          ],
          bar2: [530, 410, 701, 854, 530, 346, 390, 701, 854, 390, 750, 732],
          line2: [
            964, 1018, 1018, 862, 1600, 1570, 1018, 964, 1018, 964, 1026, 1679,
          ],
        };
        const lineBarData3 = {
          x: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-12",
          ],
          bar1: [750, 732, 701, 854, 390, 530, 410, 701, 854, 390, 530, 346],
          line1: [
            862, 1018, 964, 1026, 1679, 1600, 1570, 1018, 964, 1018, 964, 1018,
          ],
          bar2: [530, 410, 701, 854, 530, 346, 390, 701, 854, 390, 750, 732],
          line2: [
            964, 1018, 1018, 862, 1600, 1570, 1018, 964, 1018, 964, 1026, 1679,
          ],
        };
        const lineBarData4 = {
          x: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-12",
          ],
          bar1: [750, 732, 701, 854, 390, 530, 410, 701, 854, 390, 530, 346],
          line1: [
            862, 1018, 964, 1026, 1679, 1600, 1570, 1018, 964, 1018, 964, 1018,
          ],
          bar2: [530, 410, 701, 854, 530, 346, 390, 701, 854, 390, 750, 732],
          line2: [
            964, 1018, 1018, 862, 1600, 1570, 1018, 964, 1018, 964, 1026, 1679,
          ],
        };
        const cardTextData1 = {
          saleStorage: "80",
          residenceStorage: "3832",
          publicStorage: "3832",
          num3: "3832",
        };
        const cardTextData2 = {
          saleStorage: "80",
          residenceStorage: "3832",
          publicStorage: "3832",
          num3: "3832",
        };
        const res = {
          endDateTime: new Date().toDateString(),
        };
        // storage(req).then((res) => {
        data.endDateTime = res.endDateTime || "--";
        // 权益口径金额
        data.amountEquityTaProjConstructureItem = {
          cplxjgfx: lineBarData2,
          hzztjgfx: lineBarData1,
          taTaProjCostructure: cardTextData1,
        };
        // 全口径金额
        data.amountFullTaProjConstructureItem = {
          cplxjgfx: lineBarData2,
          hzztjgfx: lineBarData1,

          taTaProjCostructure: cardTextData1,
        };
        // 权益口径面积
        data.areaEquityTaProjConstructureItem = {
          cplxjgfx: lineBarData3,
          hzztjgfx: lineBarData4,
          taTaProjCostructure: cardTextData2,
        };
        // 全口径面积
        data.areaFullTaProjConstructureItem = {
          cplxjgfx: lineBarData3,
          hzztjgfx: lineBarData4,
          taTaProjCostructure: cardTextData1,
        };
        data.handleData();
        // });
      },
    });

    onMounted(() => {
      data.handleApi(data.req);
    });
    provide("active", data); //存入获取到的接口数据，去子组件用 inject('data') 取值
    return {
      ...toRefs(data),
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="select">
      <select-nav :rowReverse="false" popupTitle="选择期数" :leftActive="leftActive" :rightActive="rightActive"
        :leftReq="leftReq" @leftChange="leftChange" :rightOption="rightOption" @rightSwitch="rightSwitch">
      </select-nav>
    </div>

    <div class="tab">
      <van-tabs @click-tab="tabChange" v-model:active="active" :key="active">
        <van-tab title="金额">
          <div class="content">
            <div class="data-tip">
              <data-tip :name="'数据截止日期：'" :value="endDateTime"></data-tip>
            </div>
            <div class="pandect">
              <card-text :resOption="cardTextProps1" :resData="cardTextData1"></card-text>
            </div>
            <div class="line-bar">
              <div class="title">货值状态结构分析</div>
              <line-bar :resOption="lineBarOption1" :resData="lineBarData1"></line-bar>
            </div>
            <div class="line-bar">
              <div class="title">产品类型结构分析</div>
              <line-bar :resOption="lineBarOption2" :resData="lineBarData2"></line-bar>
            </div>
          </div>
        </van-tab>
        <van-tab title="面积">
          <div class="content">
            <div class="data-tip">
              <data-tip :name="'数据截止日期：'" :value="endDateTime"></data-tip>
            </div>
            <div class="pandect">
              <card-text :resOption="cardTextProps2" :resData="cardTextData2"></card-text>
            </div>
            <div class="line-bar">
              <div class="title">货值状态结构分析</div>
              <line-bar :resOption="lineBarOption3" :resData="lineBarData3"></line-bar>
            </div>
            <div class="line-bar">
              <div class="title">产品态结构分析</div>
              <line-bar :resOption="lineBarOption4" :resData="lineBarData4"></line-bar>
            </div>
          </div>

        </van-tab>
      </van-tabs>

    </div>
    <nothing></nothing>
  </div>

</template>


<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  .select {
    width: 100%;
    background: #ffffff;
    padding: 10px 16px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.04);
  }

  .data-tip {
    padding: 10px 0;
    text-align: center;
  }

  .pandect {
    height: 128px;
  }

  .tab {
    margin: 12px auto;
    width: 100%;
    background: #ffffff;

    .content {
      padding: 0 16px;

      .line-bar {
        margin-top: 20px;
        width: 100%;
        height: 370px;
        margin-bottom: 50px;

        .title {
          color: #1d252f;
          font-size: 16px;
          margin-bottom: 18px;
        }

        .title-sub {
          font-size: 12px;
          color: #8d9eae;
          margin-bottom: 10px;

          span {
            font-size: 16px;
            color: #f99d35;
            vertical-align: top;
            padding-left: 3px;
          }
        }
      }
    }

    :deep(.van-tabs--line .van-tabs__wrap) {
      height: 32px;
    }

    :deep(.van-tabs__nav) {
      background: rgba(248, 250, 251, 1);
    }

    :deep(.van-tab__panel) {
      background: #ffffff;
    }

    :deep(.van-tab):first-child {
      background: #e9eff3;
      border-radius: 4px 4px 0 0;
      color: #8d9eae;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      padding-top: 2px;
      border-bottom: none;
      margin-right: 4px;
    }

    :deep(.van-tab):nth-child(2) {
      background: #e9eff3;
      border-radius: 4px 4px 0 0;
      color: #8d9eae;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      padding-top: 2px;
      border-bottom: none;
      margin-left: 4px;
    }

    :deep(.van-tab--active):first-child {
      background: #ffffff;
      color: #f99d35;
      margin-right: 4px;
    }

    :deep(.van-tab--active):nth-child(2) {
      background: #ffffff;
      color: #f99d35;
      margin-left: 4px;
    }

    :deep(.van-tabs__line) {
      display: none;
    }
  }
}
</style>