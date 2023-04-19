<template>
  <div id="sleep_ref" class="sleep_ref" ref="sleep_ref"></div>
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

// [
//   134, 134, 0, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 134, 0, 134,
//   134, 134, 0, 134, 134, 0, 134, 134, 134, 0, 134, 134,
// ];
export default {
  name: "zheixnatu",
  props: ["data", "index"],
  data() {
    return {};
  },
  mounted() {
    this.chartInstance = null;
    this.startValue = 0; // 区域缩放的起点值
    this.endValue = 5; // 区域缩放的终点值
    this.timerId = null; // 定时器的标识
    this.allData = null;
    this.timerId = null; // 定时器的标识
    this.valueArr = null;
    if (this.data[0].data) {
      this.allData = this.data[0].data;
      this.updateChart();
      this.startInterval();
    }

    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();

    console.log("加载完毕");

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
    this.chartInstance = null;
    this.startValue = null; // 区域缩放的起点值
    this.endValue = null; // 区域缩放的终点值
    this.timerId = null; // 定时器的标识
    this.allData = null;
    this.timerId = null; // 定时器的标识
    this.valueArr = null;
    this.allData = null;
  },

  methods: {
    updateChart() {
      var totalFlowRate = this.$echarts.getInstanceByDom(this.$refs.sleep_ref);
      if (!totalFlowRate) {
        totalFlowRate = this.$echarts.init(this.$refs.sleep_ref);
        this.$once("hook:beforeDestroy", function () {
          this.$echarts.dispose(totalFlowRate);
        });
      }

      this.valueArr = this.allData.map((item) => {
        return item.value;
      });
      this.dateValueArr = this.allData.map((item) => {
        return item.number;
      });
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
          top: "20%",
          left: "-5%",
          // right: "4%",
          bottom: "23%",
          containLable: true, //距离包含坐标轴上的文字
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {},
          // },
        },
        xAxis: {
          show: false,
          type: "category",
          data: this.dateValueArr,
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
            data: this.valueArr,
            symbol: "none",

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
      this.$emit("end", "none");
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        this.$emit(
          `sleepValueArr${this.index}`,
          this.valueArr[this.startValue + 1]
        );
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 5;
        }
        this.updateChart();
      }, 2000);
    },

    screenAdapter() {
      setTimeout(() => {
        if (this.$refs.sleep_ref) {
          var totalFlowRate = this.$echarts.getInstanceByDom(
            this.$refs.sleep_ref
          );
          if (totalFlowRate) {
            totalFlowRate.resize();
          }
        }
      }, 600);

      // this.chartInstance.setOption(adapterOption);
      // this.chartInstance.resize();
    },
  },
};
</script>
<style scoped lang="less">
.sleep_ref {
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

.install {
  position: absolute;
  z-index: 999;
}
</style>
