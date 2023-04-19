<!-- 热销商品图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <!-- <span class="iconfont arr-left" @click="toLeft" :style="comStyle"
      >&#xe6ef;</span
    >
    <span class="iconfont arr-right" @click="toRight" :style="comStyle"
      >&#xe6ed;</span
    > -->
    <!-- <span class="cat-name" :style="comStyle">{{ catName }}</span> -->
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, // 当前所展示出的一级分类数据
      titleFontSize: 0,
    };
  },
  computed: {
    catName() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.currentIndex].name;
      }
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + "px",
      };
    },
  },
  mounted() {
    this.chartInstance = null;
    this.allData = null;
    this.currentIndex = 0; // 当前所展示出的一级分类数据
    this.titleFontSize = 0;
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    this.chartInstance = null;
    this.allData = null;
    this.currentIndex = null; // 当前所展示出的一级分类数据
    this.titleFontSize = null;
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, "chalk");
      const initOption = {
        // title: {
        //   text: "▎ 热销商品的占比",
        //   left: 20,
        //   top: 20,
        // },
        legend: {
          // orient:"vertical",
          x: "right",
          top: "20%",

          // icon: "circle",
        },
        tooltip: {
          show: true,

          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 100;
            } else {
              // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else {
              // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: (arg) => {
            // console.log(arg)
            const thirdCategory = arg.data.children;
            // 计算出所有三级分类的数值总和
            let total = 0;
            thirdCategory.forEach((item) => {
              total += item.value;
            });
            let retStr = "";
            thirdCategory.forEach((item) => {
              retStr += `
              ${item.name}:${parseInt((item.value / total) * 100) + "%"}
              <br/>
              `;
            });
            return retStr;
          },
        },
        series: [
          {
            type: "pie",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
            },
            hoverAnimation: false,
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await this.$http.get("hotproduct");
      this.allData = this.data;
      // console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      const legendData = this.allData[this.currentIndex].children.map(
        (item) => {
          return item.name;
        }
      );
      let legendData1 = [];
      legendData1.push(legendData[0]);
      legendData1.push(legendData[1]);

      let legendData2 = [];
      legendData2.push(legendData[2]);
      legendData2.push(legendData[3]);
      let legendData3 = [];
      legendData3.push(legendData[4]);
      legendData3.push(legendData[5]);

      // console.log(legendData1);
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children, // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
          };
        }
      );
      const dataOption = {
        legend: [
          {
            data: legendData1,
            y: "10%",
            x: "46%",
          },
          {
            data: legendData2,
            y: "40%",
            x: "46%",
          },
          {
            data: legendData3,
            y: "70%",
            x: "46%",
          },
        ],
        series: [
          {
            data: seriesData,
            center: ["35%", "50%"], //图的位置，距离左跟上的位置
            // radius: ["60%", "20%"],
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
      this.screenAdapter();
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.hot_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize,
          },
        },
        legend: [
          {
            itemWidth: this.titleFontSize / 1,
            itemHeight: this.titleFontSize / 1,
            itemGap: this.titleFontSize / 2.5,
            textStyle: {
              fontSize: this.titleFontSize / 0.8,
            },
          },
          {
            itemWidth: this.titleFontSize / 1,
            itemHeight: this.titleFontSize / 1,
            itemGap: this.titleFontSize / 2.5,
            textStyle: {
              fontSize: this.titleFontSize / 0.8,
            },
          },
          {
            itemWidth: this.titleFontSize / 1,
            itemHeight: this.titleFontSize / 1,
            itemGap: this.titleFontSize / 2.5,
            textStyle: {
              fontSize: this.titleFontSize / 0.8,
            },
          },
        ],
        tooltip: [
          {
            itemWidth: this.titleFontSize / 1,
            itemHeight: this.titleFontSize / 1,
            itemGap: this.titleFontSize / 2.5,
            textStyle: {
              fontSize: this.titleFontSize / 0.8,
            },
          },
        ],
        series: [
          {
            radius: [this.titleFontSize * 4.5, this.titleFontSize * 2.5],
            // center: ["50%", "60%"],
            center: ["17%", "50%"], //图的位置，距离左跟上的位置
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    toLeft() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1;
      }
      this.updateChart();
    },
    toRight() {
      this.currentIndex++;
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0;
      }
      this.updateChart();
    },
  },
};
</script>

<style lang="less" scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.arr-right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.cat-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
