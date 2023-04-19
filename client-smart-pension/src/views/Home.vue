<template>
  <div id="home">
    <div id="left">
      <ul class="flexh all">
        <li class="li1 backli">
          <Message :title="title[0]">
            <ul class="flexh">
              <li>
                <dl class="flexw">
                  <dt><img src="icon/ico_Member.svg" alt="" /></dt>
                  <dd class="flexh">
                    <h6>辖区总人口数</h6>
                    <p><count-to :end-val="11597000"></count-to></p>
                  </dd>
                </dl>
              </li>
              <li>
                <ul class="flexw">
                  <li>
                    <h6>男性人数</h6>
                    <p><count-to :end-val="6597000"></count-to></p>
                  </li>
                  <div class="shu"></div>
                  <li>
                    <h6>女性人数</h6>
                    <p><count-to :end-val="5000000"></count-to></p>
                  </li>
                </ul>
              </li>
            </ul>
          </Message>
        </li>
        <li class="li2 backli">
          <Message :title="title[1]">
            <div id="echartsTrend"><Trend :data="map2"></Trend></div>
          </Message>
        </li>
        <li class="li3 backli">
          <Message :title="title[2]"
            ><div class="Message">
              <div class="PieSlot">
                <Pie id="contain1" :val="PieVal"></Pie>
              </div>
              <img src="/icon/xuanzhuan1.png" alt="" class="xuanzhuan" />
              <span class="PieSlotNum">
                <count-to :end-val="27460"></count-to>
              </span>
              <span class="PieSlotText"> 居家养老人数 </span>
            </div>
            <div class="MessageList">
              <ul>
                <li
                  v-for="(item, index1) in type"
                  :key="index1"
                  :class="item.class"
                >
                  <span>
                    <div class="square">
                      <div :class="item.class1"></div>
                      <div class="square2"></div>
                    </div>
                    {{ item.text }}
                  </span>
                  <span class="MessageNum">
                    <count-to :end-val="item.number"></count-to>
                  </span>
                </li>
              </ul>
            </div>
          </Message>
        </li>
      </ul>
    </div>
    <div id="center">
      <div class="centerText">
        <p>安徽省</p>
        <img src="/icon/BASE-LINE.svg" alt="" />
      </div>

      <div class="pop">
        <div class="popS"></div>
      </div>

      <Model :data="mapData" @listenToChildEvent="showMsgFromChild"></Model>
    </div>
    <div id="bottom">
      <ul class="flexw">
        <li v-for="(item, index2) in type1" :key="index2">
          <div class="bottomshu"></div>
          <dl class="flexh">
            <dd><count-to :end-val="item.number"></count-to></dd>
            <dd>{{ item.text }}</dd>
          </dl>
        </li>
      </ul>
    </div>
    <div id="pop" :style="{ display: flage }">
      <!-- <img src="/icon/DIALOG_BASE.svg" alt="" /> -->
      <dl>
        <dt>{{ ModelValue[1].name }}</dt>
        <dd class="ModelDd1">行政面积：</dd>
        <dd>{{ ModelValue[1].area }}</dd>
        <dd class="ModelDd1">所属地区：</dd>
        <dd>安徽省 合肥市</dd>
        <dd class="ModelDd1">行政区划代码：</dd>
        <dd>{{ ModelValue[1].code }}</dd>
        <dd class="ModelDd1">行政驻地：</dd>
        <dd>{{ ModelValue[1].station }}</dd>
        <dd class="ModelDd1">地区常住人口：</dd>
        <dd>{{ ModelValue[1].people }}</dd>
      </dl>
    </div>
    <a
      class="download"
      href="/static/PluginInstaller_v2.1.21.1203.exe"
      download=""
      >插件下载</a
    >
  </div>
</template>

<script>
import Trend from "../components/Echarts/Trend";
import datas2 from "../../public/geo/trend.json";
import Pie from "../components/Pie";
import CountTo from "@/components/count-to";
import Model from "../components/HomeC/Model.vue";
import mapData from "../assets/map/anhui.json";
export default {
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  components: {
    Message: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500, import("../components/Message"));
      });
    },
    Trend,
    Pie,
    CountTo,
    Model,
  },
  data() {
    return {
      title: ["全省老龄人口统计", "全省老龄人口趋势", "全省养老服务占比"],
      map2: datas2,
      flage: "none",
      mapData: mapData,
      PieVal: [15, 20, 10],
      type: [
        {
          text: "居家养老人数(12%)",
          number: 1433905,
          class: "MessageLi1",
          class1: "square21",
        },
        {
          text: "社区养老人数(21%)",
          number: 2327460,
          class: "MessageLi2",
          class1: "square22",
        },
        {
          text: "机构养老人数(14%)",
          number: 1659840,
          class: "MessageLi1",
          class1: "square23",
        },
        {
          text: "其他养老人数(53%)",
          number: 5621254,
          class: "MessageLi2",
          class1: "square24",
        },
      ],
      type1: [
        {
          text: "50—55周岁",
          number: 2558528,
        },
        {
          text: "55—60周岁",
          number: 2441290,
        },
        {
          text: "60—65周岁",
          number: 2846985,
        },
        {
          text: "65—70周岁",
          number: 1607841,
        },
        {
          text: "70—80周岁",
          number: 2802100,
        },
      ],
      ModelValue: [0, 0],
    };
  },
  mounted() {},
  methods: {
    showMsgFromChild(val) {
      this.ModelValue = val;
      this.flage = val[0];
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/css/home.less";
#home {
  position: relative;
  .download {
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
    font-size: 0.1rem;
    color:#5779A5;
  } 
}
</style>
