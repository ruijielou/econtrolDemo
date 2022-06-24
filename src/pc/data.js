export const line1 = {
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
    data: [{ name: "占比" }, { name: "土储货值", icon: "circle" }],
    right: "4%",
    // icon: "circle",
    itemHeight: 7, //修改icon图形大小
    textStyle: {
      fontSize: 12, //字体大小
      color: "#333",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "0",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,

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
        "开工未达±0",
        "达±0未达售",
        "达售未取证",
        "期房库存",
        "现房库存",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      name: "土储值（万元）",
      max: 1,
      boundaryGap: [0.2, 0.2],
    },
    {
      type: "value",
      scale: true,
      name: "占比（%）",
      max: 100,
      min: 0,
      boundaryGap: [0.2, 0.2],
      axisLabel: {
        formatter: (value) => {
          return `${value}%`;
        },
      },
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
      name: "土储货值",
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
};

export const line2 = {
  title: {
    text: "产品结构",
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
    // data: ["占比", "土储货值"],
    data: [{ name: "占比" }, { name: "土储货值", icon: "circle" }],
    right: "4%",
    itemHeight: 7, //修改icon图形大小
    textStyle: {
      fontSize: 12, //字体大小
      color: "#333",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "0",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      position: "bottom",
      axisLine: {
        onZero: true,
      },
      axisLabel: {
        interval: 0,
        rotate: 0,
        formatter: (value) => {
          let ret = ""; //拼接加\n返回的类目项
          let maxLength = 2; //每项显示文字个数
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
        "住宅",
        "写字楼",
        "公寓",
        "商铺",
        "车位",
        "储藏室",
        "配套",
        "购物中心",
        "酒店",
      ],
    },
    {
      type: "category",
      boundaryGap: false,
      offset: -30,
      axisTick: {
        show: false,
      },
      position: "bottom",
      axisLine: {
        onZero: true,
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: 0,
        formatter: (value) => {
          return `${value}%`;
        },
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      name: "土储值（万元）",
      max: 1,
      boundaryGap: [0.2, 0.2],
    },
    {
      type: "value",
      scale: true,
      name: "占比（%）",
      max: 100,
      min: 0,
      boundaryGap: [0.2, 0.2],
      axisLabel: {
        formatter: (value) => {
          return `${value}%`;
        },
      },
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "土储货值",
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
};

const colors = ['#5470C6', '#91CC75', '#EE6666'];
const barChart = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  legend: {
    data: ['Evaporation', 'Precipitation', 'Temperature']
  },
  xAxis: [
    {
      type: 'category',
       alignTicks: false,
      axisTick: {
        alignWithLabel: false
      },
      // prettier-ignore
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Evaporation',
      position: 'right',
      alignTicks: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Precipitation',
      position: 'right',
      show:false,
      alignTicks: true,
      offset: 80,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: '温度',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      yAxisIndex: 1,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 2,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};

export const chartData = [
  {
    title: "土储",
    remark: "注： 默认为全口径",
    operation: [{text:"金额", isDefault: true}, {text: "面积", isDefault: false}],
    operationTool: [
      {
        title: "销售物业土储货值",
        value: "0.00",
        company: "万元",
        flex: 2,
      },
      {
        title: "近12个月累计签约金额",
        value: "0.00",
        company: "万元",
        flex: 2
      },
      {
        title: "储销比",
        value: "0.00",
        company: "",
        flex: 3
      },
    ],
    chartData: [{ ...line1 }, { ...line2 }],
  },
  {
    title: "预算版供货目标完成情况",
    remark: "注： 默认为全口径",
    operation: [{text:"金额", isDefault: true}, {text: "面积", isDefault: false}],
    operationTool: [],
    chartData: [{ ...barChart, title: {text: "供货货值"} }, { ...barChart, title: {text: "本年供货情况"}}],
  },
  {
    title: "签约目标完成情况",
    remark: "注： 默认为全口径",
    operation: [],
    operationTool: [],
    chartData: [{ ...barChart, title: {text: "签约金额"} }, { ...barChart, title: {text: "本年签约情况"}}],
  },
];
