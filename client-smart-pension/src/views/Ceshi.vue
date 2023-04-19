<template>
  <div id="myChart" class="notfound" ref="myChart"></div>
</template>
<script>
// 半透明的颜色值
const colorArr1 = [
  "rgba(154,208,254, 0.9)",
  "rgba(44, 110, 255, 0.5)",
  "rgba(22, 242, 217, 0.5)",
  "rgba(254, 33, 30, 0.5)",
  "rgba(250, 105, 0, 0.5)",
];
// 全透明的颜色值
const colorArr2 = [
  "rgba(202,237,254, 0.1)",
  "rgba(44, 110, 255, 0)",
  "rgba(22, 242, 217, 0)",
  "rgba(254, 33, 30, 0)",
  "rgba(250, 105, 0, 0)",
];
const allData = [
  134, 134, 0, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 0, 134,
  134, 134, 0, 134, 134, 0, 134, 134, 134, 0, 134, 134,
];
export default {
  name: "zheixnatu",
  data() {
    return {
      chartInstance: null,
      startValue: 0, // 区域缩放的起点值
      endValue: 15, // 区域缩放的终点值
      timerId: null, // 定时器的标识
    };
  },
  mounted() {
    this.updateChart();
    this.startInterval();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();

    // setInterval(function () {
    //   yAxisData.push(Math.round(Math.random() * 1000));
    //   if (yAxisData.length > 500) {
    //     yAxisData.shift();
    //   }
    //   totalFlowRate.setOption(totalFlowRateOption);
    // }, 100);
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
  },

  methods: {
    updateChart() {
      var totalFlowRate = this.$echarts.init(
        document.getElementById("myChart")
      );
      var xAxisData = [];
      var yAxisData = [];
      for (var i = 500; i > 0; i--) {
        xAxisData.push(i + "秒前");
      }
      for (i = 1; i < 501; i++) {
        yAxisData.push(null);
      }
      var totalFlowRateOption = {
        title: {
          // text: "Step Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: ["Step Start", "Step Middle", "Step End"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {},
          // },
        },
        xAxis: {
          show: false,
          type: "category",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
          ],
        },
        yAxis: {
          show: false,
          type: "value",
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            // name: "Step Start",
            type: "line",
            step: "start",
            data: allData,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: colorArr1[0],
                }, // %0的颜色值
                {
                  offset: 1,
                  color: colorArr2[0],
                }, // 100%的颜色值
              ]),
            },
            itemStyle: {
              color: "#027DFF", //更改坐标轴文字颜色
            },
          },
        ],
      };

      totalFlowRate.setOption(totalFlowRateOption);
    },

    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > allData.length - 1) {
          this.startValue = 0;
          this.endValue = 15;
        }
        this.updateChart();
      }, 2000);
    },

    screenAdapter() {
      setTimeout(() => {
        var totalFlowRate = this.$echarts.init(
          document.getElementById("myChart")
        );
        totalFlowRate.resize();
      }, 600);

      // this.chartInstance.setOption(adapterOption);
      // this.chartInstance.resize();
    },
  },
};
</script>
<style scoped lang="less">
.notfound {
  width: 100%;
  height: 100%;
}
// /deep/#myChart {
//   width: 8rem !important;
//   height: 4rem !important;
//   padding: 0 !important;
//   margin: 0 !important;
// }
// /deep/canvas {
//   width: 8rem !important;
//   height: 4rem !important;
//   padding: 0 !important;
//   margin: 0 !important;
//   /deep/div {
//     width: 8rem !important;
//     height: 4rem !important;
//     padding: 0 !important;
//     margin: 0 !important;
//   }
// }
</style>
