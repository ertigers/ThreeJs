<template>
  <div id="myChart_ref" class="myChart_ref" ref="myChart_ref"></div>
</template>
<script>
const colorArr1 = [
  "rgba(11, 168, 44, 0.8)",
  "rgba(44, 110, 255, 0.5)",
  "rgba(22, 242, 217, 0.5)",
  "rgba(254, 33, 30, 0.5)",
  "rgba(250, 105, 0, 0.5)",
];
// 全透明的颜色值
const colorArr2 = [
  "rgba(0,210,246, 0.8)",
  "rgba(44, 110, 255, 0)",
  "rgba(22, 242, 217, 0)",
  "rgba(254, 33, 30, 0)",
  "rgba(250, 105, 0, 0)",
];

export default {
  name: "zheixnatu",
  props: ["data", "index"],
  data() {
    return {};
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
    this.startValue = null; // 区域缩放的起点值
    this.endValue = null; // 区域缩放的终点值
    this.timerId = null; // 定时器的标识
    this.allData = null;
    this.timerId = null; // 定时器的标识
    this.valueArr = null;
  },
  mounted() {
    this.startValue = 0; // 区域缩放的起点值
    this.endValue = 20; // 区域缩放的终点值
    this.timerId = null; // 定时器的标识
    this.allData = null;
    this.valueArr = null;
    this.dataList = null;
    this.valueList = null;
    if (this.data) {
      this.allData = this.data;
      this.updateChart();
      this.startInterval();
    }

    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  methods: {
    updateChart() {
      let chartInstance = this.$echarts.getInstanceByDom(
        this.$refs.myChart_ref
      );
      if (!chartInstance) {
        chartInstance = this.$echarts.init(this.$refs.myChart_ref);
        this.$once("hook:beforeDestroy", function () {
          this.$echarts.dispose(chartInstance);
        });
      }
      this.dateList = this.data.map((item) => {
        return item.value;
      });
      this.valueList = this.data.map((item) => {
        return item.number;
      });

      var totalFlowRateOption = {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
          },
        ],

        title: [],
        tooltip: {
          trigger: "axis",
        },
        xAxis: [
          {
            show: false,
            data: this.valueList,
            type: "category",
          },
        ],
        yAxis: [{ show: false, type: "value" }],
        grid: [
          {
            top: "20%",
            left: "-5%",
            // right: "4%",
            bottom: "23%",
            containLable: true, //距离包含坐标轴上的文字
          },
        ],
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            type: "line",
            data: this.dateList,
            symbol: "none",
            lineStyle: {
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
          },
        ],
      };

      chartInstance.setOption(totalFlowRateOption);
    },

    screenAdapter() {
      setTimeout(() => {
        if (this.$refs.myChart_ref) {
          var totalFlowRate = this.$echarts.getInstanceByDom(
            this.$refs.myChart_ref
          );
          if (totalFlowRate) {
            totalFlowRate.resize();
          }
        }
      }, 300);
    },

    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      // this.$emit("end", "none");
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        this.$emit(
          `heartValueArr${this.index}`,
          this.dateList[this.startValue + 1]
        );
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 20;
        }
        this.updateChart();
      }, 1000);
    },
  },
};
</script>
<style scoped lang="less">
#myChart_ref {
  width: 100%;
  height: 100%;
}
</style>
