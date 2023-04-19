<!-- 库存销量分析 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      timerId: null, // 定时器的标识
    };
  },
  mounted() {
    this.chartInstance = null;
    this.allData = null;
    this.currentIndex = 0; // 当前显示的数据
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
    this.currentIndex = null;
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, "chalk");
      const initOption = {
        // title: {
        //   text: "▎库存和销量分析",
        //   left: 20,
        //   top: 20,
        // },
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await this.$http.get("stock");
      this.allData = this.data;
      // console.log(this.allData);
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const centerArr = [
        ["10%", "20%"],
        ["35%", "20%"],
        ["60%", "20%"],
        ["85%", "20%"],
        ["10%", "70%"],
        ["35%", "70%"],
        ["60%", "70%"],
        ["85%", "70%"],
      ];
      const colorArr = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8B11C"],
        ["#E8821C", "#E55445"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
        ["#23E5E5", "#2E72BF"],
        ["#E5DD45", "#E8B11C"],
        ["#E8821C", "#E55445"],
      ];
      // 处理图表需要的数据
      const start = this.currentIndex * 8;
      const end = (this.currentIndex + 1) * 8;
      const showData = this.allData.slice(start, end);
      const seriesArr = showData.map((item, index) => {
        return {
          type: "pie",
          radius: [10, 5],
          center: centerArr[index],
          hoverAnimation: false, // 关闭鼠标移入到饼图时的动画效果
          labelLine: {
            show: false, // 隐藏指示线
          },
          label: {
            position: "center",
            color: "#5779A5",
            fontWeight: 1000,
          },
          data: [
            {
              name: item.sales,
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0],
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1],
                  },
                ]),
              },
            },
            {
              name: "\n\n\n\n\n\n" + item.name,
              value: item.stock,
              itemStyle: {
                color: "#D7E7F3",
              },
            },
          ],
        };
      });
      const dataOption = {
        series: seriesArr,
      };

      this.chartInstance.setOption(dataOption);
      this.screenAdapter();
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.stock_ref.offsetWidth / 100) * 3.3;
      const innerRadius = titleFontSize * 2;
      const outterRadius = innerRadius * 1.225;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 0.8,
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > 2) {
          this.currentIndex = 0;
        }
        this.updateChart(); // 在更改完currentIndex之后 , 需要更新界面
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped></style>
