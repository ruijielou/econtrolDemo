<template>
  <div :id="id" style="width: 100%; height: 100%"></div>

</template>

<script>
import { inject, watch, reactive, toRefs } from "vue";
import { v4 as uuid } from "uuid";
import no_data from "@/assets/no_data.png";

export default {
  name: "Line",
  props: {
    option: Object,
  },
  setup(props) {
    const echarts = inject("echarts");

    const data = reactive({
      id: uuid(),
      option: null,
      no_data: no_data,
      echartsInit: async () => {
        let myChart = echarts.init(document.getElementById(data.id));
        console.log(props);
        let resOption = props.option;
        // resOption = {
        //   ...resOption,
        //   legend: {
        //     data: resOption.legend || ["", ""],
        //     show: true,
        //     left: "left",
        //     itemHeight: 7, //修改icon图形大小
        //     textStyle: {
        //       fontSize: 12, //字体大小
        //       color: "#8D9EAE",
        //     },
        //     padding: [1, 0, 0, 2], //可
        //   },
        // };

        // 绘制图表
        await myChart.setOption(resOption);
        // await myChart.resize();

        window.onresize = function () {
          //自适应大小
          myChart.resize();
        };
      },
    });
    watch(
      () => ({ ...props.option }),
      async (res, o) => {
        console.log(res, "======res");
        if (res) {
          await Promise.all([(data.option = res)]);

          await data.echartsInit();
        }
      },
      { immediate: true, deep: true }
    );
    return {
      ...toRefs(data),
    };
  },
};
</script>


<style scoped>
</style>