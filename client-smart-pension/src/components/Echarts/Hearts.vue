<!-- 地区销售排行 -->
<template>
  <div class="com-chart" ref="rank_ref"></div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0, // 区域缩放的起点值
      endValue: 20, // 区域缩放的终点值
      timerId: null, // 定时器的标识
      valueArr: null,
    };
  },

  mounted() {
    this.chartInstance = null;
    this.allData = null;
    this.startValue = 0; // 区域缩放的起点值
    this.endValue = 20; // 区域缩放的终点值
    this.timerId = null; // 定时器的标识
    this.valueArr = null;
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
    this.chartInstance = null;
    this.allData = null;
    this.startValue = null; // 区域缩放的起点值
    this.endValue = null; // 区域缩放的终点值
    this.timerId = null; // 定时器的标识
    this.valueArr = null;
  },
  methods: {
    initChart() {
      let chartInstance = this.$echarts.getInstanceByDom(this.$refs.rank_ref);
      if (!chartInstance) {
        chartInstance = this.$echarts.init(this.$refs.rank_ref, "chalk");
        this.$once("hook:beforeDestroy", function () {
          this.$echarts.dispose(chartInstance);
        });
      }
      const initOption = {
        title: {
          // text: "发热哨点上报",
          // left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "-5%",
          // right: "4%",
          bottom: "23%",
          containLable: true, //距离包含坐标轴上的文字
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          show: false,
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
      chartInstance.setOption(initOption);
      chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await this.$http.get("rank");
      // this.$http.get("/geo/rank.json").then(function (result) {
      //   console.log(result);
      // });
      if (this.data[0].data) {
        this.allData = this.data[0].data;
        this.updateChart();
        this.startInterval();
      }

      // 对allData里面的每一个元素进行排序, 从大到小进行
      // this.allData.sort((a, b) => {
      //   return b.value - a.value;
      // });
      // console.log(this.allData);
    },
    updateChart() {
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#FF5555", "#FF8888"],
        ["#5052EE", "#AB6EE5"],
      ];
      // 处理图表需要的数据
      // 所有省份所形成的数组

      const provinceArr = this.allData.map((item) => {
        return item.name;
      });
      // 所有省份对应的销售金额
      this.valueArr = this.allData.map((item) => {
        return item.value;
      });
      const dataOption = {
        xAxis: {
          data: provinceArr,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#4B83A9", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: this.valueArr,

            itemStyle: {
              color: (arg) => {
                let targetColorArr = null;
                if (arg.value > 90) {
                  targetColorArr = colorArr[1];
                } else if (arg.value > 30) {
                  targetColorArr = this.data[0].color;
                } else {
                  targetColorArr = colorArr[2];
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0],
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1],
                  },
                ]);
              },
            },
          },
        ],
      };
      // this.chartInstance.setOption(dataOption);
      let chartInstance = this.$echarts.init(this.$refs.rank_ref, "chalk");
      chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      setTimeout(() => {
        if (this.$refs.rank_ref) {
          const titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6;
          const adapterOption = {
            title: {
              textStyle: {
                fontSize: titleFontSize,
              },
            },
            series: [
              {
                barWidth: titleFontSize,
                itemStyle: {
                  // barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
                },
              },
            ],
          };
          let chartInstance = this.$echarts.init(this.$refs.rank_ref, "chalk");
          chartInstance.setOption(adapterOption);
          chartInstance.resize();
        }
      }, 600);

      // this.chartInstance.setOption(adapterOption);
      // this.chartInstance.resize();
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        this.$emit("valueArr1", this.valueArr[this.startValue + 2]);

        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 20;
        }
        this.updateChart();
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped></style>
