<template>
  <div class="com-container">
    <div class="title">
      <!-- <span>{{ showTitle }}</span> -->
      <!-- <span class="iconfont title-icon" @click="showChoice = !showChoice"
        >&#xe6eb;</span
      > -->
      <div class="select-con" v-show="showChoice">
        <div
          class="select-item"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
// import data from "../../../public/geo/trend.json";
export default {
  props: ["data"],
  data() {
    return {
      showChoice: false,
    };
  },
  created() {},
  updated() {},

  mounted() {
    this.chartInstance = null;
    this.allData = null;

    this.choiceType = "map"; //显示的哪个数据
    // this.$socket.registerCallBack("trendData", this.getData);
    this.initchart();
    this.getData();
    // 发送数据给服务器, 告诉服务器, 我现在需要数据
    // this.$socket.send({
    //   action: "getData",
    //   socketType: "trendData",
    //   chartName: "trend",
    //   value: "",
    // });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    this.chartInstance = null;
    this.allData = null;

    this.choiceType = null;
  },
  computed: {
    selectTypes() {
      if (!this.allData) {
        return [];
      } else {
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType;
        });
      }
    },
    showTitle() {
      if (!this.allData) {
        return [];
      } else {
        return this.allData[this.choiceType].title;
      }
    },
  },
  methods: {
    //初始化
    initchart() {
      let chart = this.$echarts.getInstanceByDom(this.$refs.trend_ref);
      if (!chart) {
        chart = this.$echarts.init(this.$refs.trend_ref, "chalk");
        this.$once("hook:beforeDestroy", function () {
          this.$echarts.dispose(chart);
        });
      }
      const initOption = {
        grid: {
          top: "20%",
          left: "0%",
          // right: "4%",
          bottom: "15%",
          containLable: true, //距离包含坐标轴上的文字
        },
        tooltip: {
          trigger: "axis",
        },
        // legend: {
        //   left: "0%",
        //   top: "30%",
        //   icon: "circle",
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // boundaryGap: false,
        },
        yAxis: {
          show: false,
          type: "value",
        },
      };

      chart.setOption(initOption);
    },
    //获取服务器数据
    getData() {
      // const { data: ret } = await this.$http.get("trend");
      this.allData = this.data;
      // console.log(this.allData);
      this.updateChart();
    },
    //处理数据
    updateChart() {
      // 半透明的颜色值
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ];
      // 全透明的颜色值
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ];
      //x轴 类目轴数据
      const timeArr = this.allData.common.month;
      //y轴 series数据
      const valueArr = this.allData[this.choiceType].data;

      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index],
              }, // %0的颜色值
              {
                offset: 1,
                color: colorArr2[index],
              }, // 100%的颜色值
            ]),
          },
        };
      });
      //图例的数据
      // const legendArr = valueArr.map((item) => {
      //   return item.name;
      // });
      const dataOption = {
        xAxis: {
          data: timeArr,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#4B83A9", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        // legend: {
        //   data: legendArr,
        // },
        series: seriesArr,
      };
      // console.log(seriesArr);
      let chart = this.$echarts.getInstanceByDom(this.$refs.trend_ref);

      chart.setOption(dataOption);

      // this.chartInstance.setOption(dataOption);
    },
    //屏幕适配 关联到的数据
    screenAdapter() {
      setTimeout(() => {
        const adapterOption = {};
        let chart = this.$echarts.getInstanceByDom(this.$refs.trend_ref);

        chart.setOption(adapterOption);
        chart.resize();
        // this.chartInstance.setOption(adapterOption);
        // this.chartInstance.resize();
      }, 600);
    },
    handleSelect(currentType) {
      this.choiceType = currentType;
      this.updateChart();
      this.showChoice = false;
    },
  },
};
</script>

<style lang="less" scoped>
.com-container {
  position: relative;
  .title {
    position: absolute;
    z-index: 999;
    top: 0.2rem;
    color: white;
    .title-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}

// .com-container {
//   position: absolute;
//   top: 0;
//   left: 0;
// }
</style>
