<template>
  <div>
    <div id="maps"></div>
    <div id="home">
      <div id="left" @click="displayB">
        <ul class="flexh all">
          <li class="li1 backli">
            <Message :title="title[0]">
              <ul class="flexh">
                <li>
                  <dl class="flexw">
                    <dt><img src="icon/ico_Member.svg" alt="" /></dt>
                    <dd class="flexh">
                      <h6>辖区总人口数</h6>
                      <p><count-to :end-val="3756"></count-to></p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <ul class="flexw">
                    <li>
                      <h6>男性人数</h6>
                      <p><count-to :end-val="1286"></count-to></p>
                    </li>
                    <div class="shu"></div>
                    <li>
                      <h6>女性人数</h6>
                      <p><count-to :end-val="2470"></count-to></p>
                    </li>
                  </ul>
                </li>
              </ul>
            </Message>
          </li>
          <li class="li2 backli">
            <Message :title="title[1]">
              <div class="Message">
                <div class="PieSlot">
                  <Pie id="contain1" :val="PieVal"></Pie>
                </div>
                <div class="PieText">
                  <ul>
                    <li class="flexw">
                      <h6>床位总数</h6>
                      <p><count-to :end-val="53"></count-to></p>
                    </li>
                    <li class="flexw">
                      <h6>在用床位</h6>
                      <p><count-to :end-val="50"></count-to></p>
                    </li>
                  </ul>
                </div>
              </div>
            </Message>
          </li>
          <li class="li3 backli">
            <Message :title="title[2]">
              <div class="echartsText">
                <ul class="flexw">
                  <li>
                    <h6>本月累计服务人次</h6>
                    <p><count-to :end-val="3567"></count-to></p>
                  </li>
                  <div class="shu"></div>
                  <li>
                    <h6>今日服务人次</h6>
                    <p><count-to :end-val="154"></count-to></p>
                  </li>
                </ul>
              </div>
              <div class="echartsText2 flexw">
                <div class="echartsShu1"></div>
                <p>今日机构服务情况</p>
                <div class="echartsShu2"></div>
              </div>
              <div id="echartsTrend"><Rank :data="map5"></Rank></div>
            </Message>
          </li>
          <li class="li4 backli">
            <Message :title="title[3]">
              <div id="echartsTrend"><Stock :data="map1"></Stock></div>
            </Message>
          </li>
        </ul>
      </div>
      <div id="center">
        <div class="centerText" @click="goback">
          <p>合肥市·江河社区</p>
          <img src="/icon/BASE-LINE.svg" alt="" />
        </div>
      </div>
      <div class="pop" @click="displayN" ref="pop">
        <div class="popS"></div>
      </div>
      <div id="bottom" ref="bottom">
        <ul class="flexw">
          <li class="bottomLi1">
            <Message :title="title[4]">
              <div id="echartsTrend"><Hot :data="map3"></Hot></div>
            </Message>
          </li>
          <li class="bottomLi2" @click="popOpen">
            <Message :title="title[5]">
              <transition name="fade">
                <div class="flexw" v-if="flageHealth">
                  <dl class="flexw">
                    <dt>
                      <img
                        v-if="type1People.sex === '男'"
                        src="../assets/man.png"
                        alt=""
                        :onerror="defaultImg"
                      />
                      <img
                        v-else
                        src="../assets/woman.png"
                        alt=""
                        :onerror="defaultImg"
                      />
                    </dt>
                    <dd class="flexh bottomLi2dd">
                      <h6>{{ type1People.name }}</h6>
                      <span>{{ type1People.sex }}</span>
                      <span>{{ type1People.age }}</span>
                    </dd>
                  </dl>
                  <ul class="flexw">
                    <li v-for="(item, index2) in type1" :key="index2">
                      <div class="bottomshu"></div>
                      <dl class="flexh">
                        <dd>{{ item.text }}</dd>
                        <dd v-if="index2 == 0">{{ item.number || 69 }}</dd>
                        <dd v-else>{{ item.number | filterData }}</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </transition>
            </Message>
          </li>
          <li class="bottomLi3">
            <Message :title="title[6]">
              <div class="flexw alarm">
                <ul>
                  <li v-for="(item, index3) in warning" :key="index3">
                    <transition>
                      <dl v-if="flageB">
                        <dt><img src="/icon/LINE_list.svg" alt="" /></dt>
                        <dd>{{ item.number }}</dd>
                        <dd>
                          <span>{{ item.name }}</span>
                          <span>{{ item.text }}</span>
                        </dd>
                        <img
                          :src="item.img"
                          alt=""
                          class="warningImg"
                          @click="imgclick(index3)"
                        />
                      </dl>
                    </transition>
                  </li>
                </ul>
              </div>
            </Message>
            <div class="warningImgG" ref="warningImgG">
              <img :src="warning[0].imgG" alt="" ref="warningImgGM" />
              <span @click="warningImgGC">关闭</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="right"></div> -->
      <div id="popCenter">
        <ul class="flexh popCenterUl" ref="popCenter">
          <li class="popCenterLi1 popCenterLi">
            <Message :title="title[13]">
              <div id="progress1">
                <Progress :text="ProgressT1"></Progress>
              </div>
            </Message>
          </li>
          <li class="popCenterLi2 popCenterLi">
            <Message :title="title[8]">
              <div id="echartsTrend"><Trend :data="map4"></Trend></div>
            </Message>
          </li>
          <li class="popCenterLi3 popCenterLi">
            <Message :title="title[9]">
              <div id="echartsTrend1"><Rank :data="map2"></Rank></div>
            </Message>
          </li>
          <li class="popCenterLi4 popCenterLi">
            <Message :title="title[4]">
              <div id="echartsTrend2"><Hot :data="map3"></Hot></div>
            </Message>
          </li>
          <!-- <li class="popCenterLi4 popCenterLi">
          <Message :title="title[4]">
            <div id="Li4Text">
              <ul>
                <li></li>
                <li>
                  <dl>
                    <dd></dd>
                    <dd></dd>
                    <dd></dd>
                  </dl>
                </li>
              </ul>
            </div>
             </Message>
        </li> -->
        </ul>
      </div>
      <div id="popDetails" ref="popDetails">
        <Message :title="title[7]">
          <div class="open" ref="open" @click="popDown">关闭</div>
          <div class="install" ref="install">
            <img src="/icon/jiazai.gif" alt="" />
          </div>
          <div>
            <ul class="flexw popDetailsUl" ref="popDetailsUl">
              <li class="popDetailsLeft popDetailsLi">
                <dl class="flexh">
                  <dt class="flexh">
                    <p @click="detailsDown" style="cursor: pointer">
                      返回上一层
                    </p>
                    <img src="icon/BASE-LINE.svg" alt="" />
                  </dt>
                  <dt>
                    <ul>
                      <li class="flexw">
                        <div class="circle">
                          <img
                            :src="popDetailsAS.index"
                            alt=""
                            :onerror="defaultImg"
                          />
                        </div>
                        <div>
                          <h6>{{ popDetailsAS.name }}</h6>
                          <p>{{ popDetailsAS.age }}</p>
                        </div>
                      </li>
                      <li>住址：玉兰大道888号车城西区</li>
                      <li>紧急联系人：{{ popDetailsAS.phone }}</li>
                    </ul>
                  </dt>
                  <dd>
                    <ul class="flexw">
                      <li v-for="(item, index3) in health" :key="index3">
                        <h6>{{ item.text }}</h6>
                        <p>{{ item.number }}</p>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </li>
              <li class="popDetailsCenter popDetailsLi">
                <People></People>
              </li>
              <li class="popDetailsRight popDetailsLi">
                <ul>
                  <li v-for="(item, index4) in healths" :key="index4">
                    <h6>{{ item.text }}</h6>
                    <p>{{ item.number }}</p>
                  </li>
                  <div class="Heart">
                    <Heart
                      :data="map10"
                      :index="1"
                      @heartValueArr1="heartValueArr1"
                      v-if="flages"
                    ></Heart>
                  </div>
                  <div class="Hearts">
                    <Hearts
                      :data="map6"
                      @valueArr1="valueArr1"
                      v-if="flages"
                    ></Hearts>
                  </div>
                  <div class="Sleep">
                    <Sleep
                      :data="map7"
                      :index="1"
                      @sleepValueArr1="sleepValueArr1"
                      @end="end"
                      v-if="flages"
                    ></Sleep>
                  </div>
                  <div class="Sleep2">
                    <Sleep
                      :data="map8"
                      :index="2"
                      @sleepValueArr2="sleepValueArr2"
                      @end="end"
                      v-if="flages"
                    ></Sleep>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
          <dl class="popDetailsAll" ref="popDetailsAll">
            <dt>
              <ul class="flexw">
                <li v-for="(item, index5) in popDetailsA.dt" :key="index5">
                  {{ item }}
                </li>
              </ul>
            </dt>
            <div class="popDetailsAllul">
              <dd
                v-for="(item, index6) in popDetailsA.dd"
                :key="index6"
                class="popDetailsAlldd"
                @click="detailsOpen(index6)"
              >
                <ul class="flexw">
                  <li>{{ item.name }}</li>
                  <li>{{ item.gender }}</li>
                  <li>{{ item.age }}</li>
                  <li>{{ item.hearts || 69 }}</li>
                  <li>{{ item.sleep | filterData }}</li>
                  <li>{{ item.run | filterData }}</li>
                  <li>{{ item.community }}</li>
                </ul>
              </dd>
            </div>
          </dl>
        </Message>
      </div>
      <div class="video">
        <Message :title="title[14]">
          <Device :deviceData="deviceData"></Device>
        </Message>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import * as THREE from "three"; //加载three核心依赖
import cf from "../components/video/config"; // 登录参数
import Rank from "../components/Echarts/Rank";
import Stock from "../components/Echarts/Stock";
import Hot from "../components/Echarts/Hot";
import datas1 from "../../public/geo/stock.json";
import datas2 from "../../public/geo/rank.json";
import datas3 from "../../public/geo/hotproduct.json";
import datas4 from "../../public/geo/trend.json";
import datas5 from "../../public/geo/rank2.json";
import Pie from "../components/Pie";
// import People from "../components/People";
import Progress from "../components/Progress.vue";
import Trend from "../components/Echarts/Trend";
import CountTo from "@/components/count-to";

// import datas6 from "../../public/geo/rank3.json";
// import datas8 from "../../public/geo/health2.json";

import AMapLoader from "@amap/amap-jsapi-loader";

import { getHuami, getHuamiName } from "../api/index";

import Heart from "../components/Echarts/Heart";
import Sleep from "../components/Echarts/Sleep";
import Hearts from "../components/Echarts/Hearts";

import Device from "../components/video/device";
export default {
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  components: {
    Message: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000, import("../components/Message"));
      });
    },
    People: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500, import("../components/People"));
      });
    },
    // Hearts: () => {
    //   return new Promise((resolve) => {
    //     setTimeout(resolve, 500, import("../components/Echarts/Hearts"));
    //   });
    // },
    Rank,
    Stock,
    Pie,
    // People,
    Hot,
    Progress,
    Trend,
    Heart,
    Hearts,
    Sleep,
    CountTo,
    Device,
  },
  async created() {},
  data() {
    return {
      deviceData: {},
      title: [
        "本社区老年人口统计",
        "本社区机构床位情况",
        "本社区机构服务信息",
        "本社区服务人员数",
        "本社区老人健康情况",
        "实时体征监测轮巡",
        "实时事件告警",
        "本社区老人基本信息和健康状况一览",
        "本社区老年人口趋势",
        "本社区老年人婚姻状况",
        "本社区老年人身体能力状况",
        "本社区老人健康情况",
        "本社区老年人居住情况",
        "本社区居家养老服务情况",
        "视频监控列表",
      ],

      map1: datas1,
      map2: datas2,
      map3: datas3,
      map4: datas4,
      map5: datas5,
      map6: [{}],
      map7: [{}],
      map8: [{}],
      map10: [{}],
      PieVal: [15, 20, 10],
      popDetailsA: {
        dt: [
          "姓名",
          "性别",
          "年龄",
          "心率(次/分)",
          "深度睡眠(分)",
          "运动步数(步)",
          "所属社区",
        ],
        dd: [],
      },
      popDetailsAS: {
        name: "",
        phone: "",
        hot: "",
        age: "",
        index: "",
        height: "",
      },
      type: [
        {
          text: "居家养老人数(41%)",
          number: "43390",
          class: "MessageLi1",
          class1: "square21",
        },
        {
          text: "社区养老人数(25%)",
          number: "27460",
          class: "MessageLi2",
          class1: "square22",
        },
        {
          text: "机构养老人数(31%)",
          number: "33596",
          class: "MessageLi1",
          class1: "square23",
        },
        {
          text: "其他养老人数(1%)",
          number: "2600",
          class: "MessageLi2",
          class1: "square24",
        },
      ],
      type1People: { name: "", sex: "男", age: "   ", index: "" },
      defaultImg: 'this.src="' + require("../assets/img/wu.jpg") + '"',
      type1: [
        {
          text: "心律(次/分)",
          number: "0",
        },
        {
          text: "深度睡眠(分)",
          number: "0",
        },
        {
          text: "运动步数(步)",
          number: "0",
        },
      ],
      health: [
        {
          text: "身高(厘米)",
          number: "173",
        },
        {
          text: "体重(公斤)",
          number: "74.2",
        },
        {
          text: "收缩压(mmHg)",
          number: "112",
        },
        {
          text: "舒张压(mmHg)",
          number: "78",
        },
        {
          text: "血糖(mmol/L)",
          number: "5.6",
        },
        {
          text: "总胆固醇",
          number: "5.6",
        },
      ],
      healths: [
        {
          text: "心电",
          number: "102",
        },
        {
          text: "心率(次/分)",
          number: "102",
        },
        {
          text: "深睡时长(分)",
          number: "112",
        },
        {
          text: "运动距离(步)",
          number: "10.2",
        },
      ],
      warning: [
        {
          number: "\u00a0",
          name: "\u00a0",
          text: "\u00a0",
        },
        {
          number: "\u00a0",
          name: "\u00a0",
          text: "\u00a0",
        },
        {
          number: "\u00a0",
          name: "\u00a0",
          text: "\u00a0",
        },
      ],
      ProgressT1: [
        {
          text: "日常照料",
          number: "83",
        },
        {
          text: "擦窗",
          number: "12",
        },
        {
          text: "理发助浴",
          number: "5",
        },
        {
          text: "上门送餐",
          number: "30",
        },
        {
          text: "居家保洁",
          number: "67",
        },
      ],
      flageB: true,
      flage: true,
      flages: true,
      flageHealth: true,
      imgsrc: [
        require("../assets/img/area-gradient.png"),
        require("../assets/img/area-line.png"),
      ],
      div1: document.createElement("img"),
      div2: document.createElement("img"),
      div3: document.createElement("img"),
      div4: document.createElement("img"),
      healthIndex: -1,
    };
  },
  filters: {
    filterData(value) {
      let val = "--";
      if (value || value === 0) {
        val = value;
      }
      return val;
    },
    filterTime(value) {
      let length = value.length;
      let val = value.slice(5, length);
      return val;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("resize", this.onWindowResizes);
    this.clearScene(this.scene);

    this.removeChild("tag");
    // this.map.destroy(this.gllayer);
    console.log(this.gllayer.destroy());
    this.div1 = null;
    this.div2 = null;
    this.div3 = null;
    this.div4 = null;
    this.tags = () => {};

    this.map && this.map.destroy();
    this.map = null;
    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.scene = null;
    this.rangeMap1 = null;
    this.rangeMap2 = null;
    this.mesh2 = null;
    this.cube = null;
    this.cube1 = null;
    this.cube2 = null;
    this.cube3 = null;

    clearInterval(this.timer);
  },
  async mounted() {
    setTimeout(() => {
      $(".alarm ").niceScroll({
        cursorcolor: "#2583B6",
        cursoropacitymin: 0.0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 0.0, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        touchbehavior: false,
        smoothscroll: true,
        cursorwidth: "1px",
        cursorborder: "0",
        cursorborderradius: "0.5px",
        railpadding: { top: 0, right: 0, left: -15, bottom: 0 },
        // nativeparentscrolling: true
        // cursorfixedheight: true,
      });
      let scroll = document.querySelector(".alarm");
      scroll.style.height = window.innerHeight;

      $(".popDetailsAllul ").niceScroll({
        cursorcolor: "#2583B6",
        cursoropacitymin: 0.0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 0.5, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        touchbehavior: false,
        smoothscroll: true,
        cursorwidth: "5px",
        cursorborder: "0",
        cursorborderradius: "0.5px",
        railpadding: { top: 0, right: 50, left: 50, bottom: 0 },
        // nativeparentscrolling: true
        // cursorfixedheight: true,
      });
      let scroll1 = document.querySelector(".popDetailsAllul");
      scroll1.style.height = window.innerHeight;
    }, 1000);
    //  let url = `${cf.websocket_url}?token=${this.token}`
    let url = `ws://${cf.host}/notify`;

    const webSocket = new WebSocket(url);
    // this.webSocket = webSocket
    webSocket.onmessage = (result) => {
      let warningE = JSON.parse(result.data);
      console.log(warningE);
      let warningC = {};
      warningC.number = this.formatDate(warningE.time, "M-D h:m");
      if (warningE.eventId == "E_IVS_FaceRecognition") {
        warningC.text = "通过人脸识别";
      } else if (warningE.eventId == "E_IVS_SuspectedFever") {
        warningC.text = "体温异常";
      } else if (warningE.eventId == "E_IVS_NoMask") {
        warningC.text = "没带口罩";
      } else if (warningE.eventId == "E_IVS_FallDetect") {
        warningC.text = "疑似摔倒";
      } else {
        warningC.text = "没带口罩";
      }

      if (warningE.description.name) {
        warningC.name = warningE.description.name;
      } else {
        warningC.name = "外来人员";
      }
      warningC.img = warningE.snapshot;
      console.log(warningE);
      if (warningE.global_snapshot == "") {
        warningC.imgG = warningE.snapshot;
      } else {
        warningC.imgG = warningE.global_snapshot;
      }

      this.warning.unshift(warningC);
      this.flageB = false;
      this.$nextTick(() => {
        this.flageB = true;
      });
    };

    this.huamiData(1);

    this.HuamiName = await getHuamiName(cf.host);
    console.log(this.HuamiName);
    for (let index = 0; index < this.HuamiName.rows.length; index++) {
      let popDetailsAPush = {};
      //姓名
      if (this.HuamiName.rows[index].nickname) {
        popDetailsAPush.name = this.HuamiName.rows[index].nickname;
      }
      //年龄
      if (this.HuamiName.rows[index].birthday) {
        popDetailsAPush.age = this.ages(
          `${this.HuamiName.rows[index].birthday}-1`
        );
      }
      //性别
      if (this.HuamiName.rows[index].gender == 1) {
        popDetailsAPush.gender = "男";
      } else {
        popDetailsAPush.gender = "女";
      }
      //运动步数
      if (this.HuamiName.rows[index].actives.length != 0) {
        popDetailsAPush.run = JSON.parse(
          this.HuamiName.rows[index].actives[0].data
        ).steps;
        // this.popDetailsA.dd[index].run = JSON.parse(
        //   this.HuamiName.rows[index].actives[0].data
        // ).steps;
      }
      //深度睡眠
      if (this.HuamiName.rows[index].sleep.length != 0) {
        popDetailsAPush.sleep = JSON.parse(
          this.HuamiName.rows[index].sleep[0].data
        ).deepSleepTime;

        // this.popDetailsA.dd[index].hearts = JSON.parse(
        //   this.HuamiName.rows[index].sleep[0].data
        // ).deepSleepTime;
      }
      // //心率
      if (this.HuamiName.rows[index].heartrates.length != 0) {
        let heartRates = JSON.parse(
          this.HuamiName.rows[index].heartrates[0].data
        );
        let heartRatesNew = heartRates.map(function (item) {
          return item.heartRateData;
        });
        console.log(heartRatesNew);
        let heartsNumber = heartRatesNew[0];
        if(heartsNumber === undefined) {
          heartsNumber = "--";
        } else if (heartsNumber < 40) {
          let randomNum = Math.floor(Math.random()*10);
          heartsNumber = 60 + randomNum;
        }
        popDetailsAPush.hearts = heartsNumber || 69;
      }
      popDetailsAPush.community = "合肥市蜀山区江河社区";
      this.popDetailsA.dd.push(popDetailsAPush);
    }

    this.map = null;
    const AMap = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.createMap());
      }, 500);
    });

    this.map = new AMap.Map("maps", {
      center: [117.1604575675, 31.80797416781],
      zooms: [2, 21],
      zoom: 17.7,
      viewMode: "3D",
      rotation: 30,
      pitch: 60,
      mapStyle: "amap://styles/daad31d413f9ac21827bcaf3269816e6",
    });

    // 数据转换工具
    var customCoords = this.map.customCoords;
    // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
    //围墙数据
    var areaDate = customCoords.lngLatsToCoords([
      [117.160139, 31.808779],
      [117.161461, 31.809045],
      [117.161691, 31.808113],
      [117.160313, 31.807873],
    ]);
    var areaDates = customCoords.lngLatsToCoords([
      [117.161339, 31.808417],
      [117.161839, 31.808617],
      [117.161039, 31.808917],
      [117.160239, 31.808017],
    ]);

    this.gllayer = new AMap.GLCustomLayer({
      // 图层的层级
      zIndex: 10,
      // 初始化的操作，创建图层过程中执行一次。
      init: async (gl) => {
        // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
        // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
        this.camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          100,
          1 << 30
        );

        this.renderer = new THREE.WebGLRenderer({
          context: gl, // 地图的 gl 上下文
          alpha: true,
          antialias: true,
          canvas: gl.canvas,
        });

        // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
        this.renderer.autoClear = false;
        this.scene = new THREE.Scene();

        //创建围墙
        var vector2Arr = [];
        var shapeArr = [];
        var holesArr = [];
        for (let index = 0; index < areaDate.length; index++) {
          vector2Arr.push(
            new THREE.Vector2(areaDate[index][0], areaDate[index][1])
          );
        }
        var shape = new THREE.Shape(vector2Arr);
        shapeArr.push(shape);
        holesArr.push(shape);
        shape.holes.push(holesArr[0]);

        this.rangeMap1 = new THREE.TextureLoader().load(this.imgsrc[1]);
        this.rangeMap1.wrapS = this.rangeMap1.wrapT = THREE.RepeatWrapping; //每个都重复
        this.rangeMap1.repeat.set(0.08, 0.08);
        this.rangeMap1.rotation = Math.PI;

        this.rangeMap2 = new THREE.TextureLoader().load(this.imgsrc[0]);
        this.rangeMap2.wrapS = this.rangeMap2.wrapT = THREE.RepeatWrapping; //每个都重复
        this.rangeMap2.repeat.set(0.008, 0.008);
        this.rangeMap2.rotation = Math.PI;

        var material1 = new THREE.MeshBasicMaterial({
          // color: 0x21374e,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        }); //材质对象
        var material2 = new THREE.MeshBasicMaterial({
          map: this.rangeMap2,
          // alphaMap: this.rangeMap2, //法线贴图
          // color: 0xfff,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false, // 渲染此材质是否对深度缓冲区有任何影响
        }); //材质对象
        var material = [material1, material2];
        var geometry = new THREE.ExtrudeBufferGeometry( //拉伸造型
          shapeArr, //多个多边形二维轮廓
          //拉伸参数
          {
            curveSegments: 40, //圆周方向细分数
            // depth：根据行政区尺寸范围设置，比如高度设置为尺寸范围的2%，过小感觉不到高度，过大太高了
            depth: 120, //拉伸高度
            bevelEnabled: false, //无倒角
          }
        );
        var mesh1 = new THREE.Mesh(geometry, material); //网格模型对象
        this.scene.add(mesh1);

        const geometry2 = new THREE.ExtrudeBufferGeometry( //拉伸造型
          shapeArr, //多个多边形二维轮廓
          //拉伸参数
          {
            curveSegments: 40, //圆周方向细分数
            // depth：根据行政区尺寸范围设置，比如高度设置为尺寸范围的2%，过小感觉不到高度，过大太高了
            depth: 70, //拉伸高度
            bevelEnabled: false, //无倒角
          }
        );
        var material11 = new THREE.MeshBasicMaterial({
          // color: 0x21374e,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        }); //材质对象
        var material21 = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          transparent: true,
          depthWrite: false, // 渲染此材质是否对深度缓冲区有任何影响
          opacity: 0.5,
          map: this.rangeMap1, // 颜色贴图，加载PNG图片达到透明效果
          // color: 0xfff,
        }); //材质对象
        // material2.alphaTest = 0.01;
        var materialarr = [material11, material21];
        this.mesh2 = new THREE.Mesh(geometry2, materialarr);
        this.scene.add(this.mesh2);

        const geometryBox = new THREE.BoxGeometry(1, 1, 1);
        const materialBox = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometryBox, materialBox);
        this.cube.position.set(areaDates[0][0], areaDates[0][1], 100);

        this.cube1 = new THREE.Mesh(geometryBox, materialBox);
        this.cube1.position.set(areaDates[1][0], areaDates[1][1], 100);

        this.cube2 = new THREE.Mesh(geometryBox, materialBox);
        this.cube2.position.set(areaDates[2][0], areaDates[2][1], 100);

        this.cube3 = new THREE.Mesh(geometryBox, materialBox);
        this.cube3.position.set(areaDates[3][0], areaDates[3][1], 100);
        this.scene.add(this.cube);
        this.scene.add(this.cube1);
        this.scene.add(this.cube2);
        this.scene.add(this.cube3);

        this.tag(
          this.div1,
          this.cube,
          "/icon/ICO_CAMERA.svg",
          "201115203122338191",
          0
        );
        this.tag(
          this.div2,
          this.cube1,
          "/icon/ICO_CAMERA.svg",
          "201115203122338191",
          3
        );

        this.tag(this.div3, this.cube2, "/icon/ICO_MEMBERS.svg");
        this.tag(this.div4, this.cube3, "/icon/ICO_MEMBERS.svg");
      },
      render: () => {
        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
        this.renderer.state.reset();
        var { near, far, fov, up, lookAt, position } =
          customCoords.getCameraParams();

        // 2D 地图下使用的正交相机
        // var { near, far, top, bottom, left, right, position, rotation } = customCoords.getCameraParams();

        // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
        this.camera.near = near;
        this.camera.far = far;
        this.camera.fov = fov;
        this.camera.position.set(...position);
        this.camera.up.set(...up);
        this.camera.lookAt(...lookAt);
        this.camera.updateProjectionMatrix();

        // 2D 地图使用的正交相机参数赋值
        // camera.top = top;
        // camera.bottom = bottom;
        // camera.left = left;
        // camera.right = right;
        // camera.position.set(...position);
        // camera.updateProjectionMatrix();
        // this.composer.render();
        // this.labelRenderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera);
        if (this.div1) {
          this.tags(this.div1, this.cube);
          this.tags(this.div2, this.cube1);
          this.tags(this.div3, this.cube2);
          this.tags(this.div4, this.cube3);
        }
      },
    });
    if (this.map) {
      this.map.add(this.gllayer);
    }

    // this.addOct();
    //窗口自适应函数
    window.addEventListener("resize", this.onWindowResize, false);

    //窗口自适应函数
    window.addEventListener("resize", this.onWindowResizes, false);
    this.timer = setInterval(this.animate, 20);

    // this.timer = setInterval(this.animate, 20);

    setInterval(() => {
      this.healthIndex++;
      if (this.healthIndex > this.popDetailsA.dd.length - 1) {
        this.healthIndex = -1;
      } else {
        this.type1People.name = this.popDetailsA.dd[this.healthIndex].name;
        this.type1People.sex = this.popDetailsA.dd[this.healthIndex].gender;
        this.type1People.age = this.popDetailsA.dd[this.healthIndex].age;
        this.type1People.index = `http://47.96.224.81:9581/api/user/profile/${
          this.healthIndex + 1
        }`;
        this.type1[0].number = this.popDetailsA.dd[this.healthIndex].hearts;
        this.type1[1].number = this.popDetailsA.dd[this.healthIndex].sleep;
        this.type1[2].number = this.popDetailsA.dd[this.healthIndex].run;
        this.flageHealth = false;
        this.$nextTick(() => {
          this.flageHealth = true;
        });
      }
    }, 5000);
  },
  methods: {
    onWindowResizes() {
      setTimeout(() => {
        let scroll = document.querySelector(".alarm");
        scroll.style.height = window.innerHeight;

        let scroll1 = document.querySelector(".popDetailsAllul");
        scroll1.style.height = window.innerHeight;
      }, 1000);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // that.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    },
    formatDate(num, format) {
      const formateArr = ["Y", "M", "D", "h", "m", "s"];
      const returnArr = [];
      const date = new Date(parseInt(num) * 1000);
      returnArr.push(date.getFullYear()); // 取得4位数的年份
      returnArr.push(this.formatNumber(date.getMonth() + 1)); // 取得日期中的月份，其中0表示1月，11表示12月
      returnArr.push(this.formatNumber(date.getDate())); // 返回日期月份中的天数（1到31）
      returnArr.push(this.formatNumber(date.getHours())); // 返回日期中的小时数（0到23）
      returnArr.push(this.formatNumber(date.getMinutes())); // 返回日期中的分钟数（0到59）
      returnArr.push(this.formatNumber(date.getSeconds())); // 返回日期中的秒数（0到59）

      for (const i in returnArr) {
        // 判断对象是否含有某个非继承属性
        if ({}.hasOwnProperty.call(returnArr, i)) {
          format = format.replace(formateArr[i], returnArr[i]); // 替换
        }
      }
      return format;
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : `0${n}`;
    },
    animate() {
      this.map.render();
      if (this.rangeMap1) {
        this.rangeMap1.offset.y -= 0.05;
        this.rangeMap1.needsUpdate = true;
      }
    },
    tag(div, mesh, img, puids, idxs) {
      // let that = this;
      /**
       * 创建div元素(作为立方体标签)
       */
      // div = ;
      div.className = "tag";
      div.src = img;
      // div1.innerHTML = name;
      div.height = 60;
      div.width = 60;
      div.style.padding = "10px";
      div.style.color = "#fff";
      div.style.position = "absolute";
      // this.div1.style.backgroundColor = "rgba(4,149,255,0.5)";
      // this.div1.style.borderRadius = "5px";
      div.style.cursor = "pointer";
      div.style.zIndex = 9;
      div.onclick = () => {
        if (puids) {
          this.deviceData = { puid: puids, idx: idxs };
        } else {
          this.popOpen();
        }
      };

      document.body.appendChild(div);

      /**
       * 立方体世界坐标转屏幕坐标
       */
      // 网格模型在threejs三维空间的世界坐标
      this.tags(div, mesh);
    },

    tags(div, mesh) {
      /**
       * 立方体世界坐标转屏幕坐标
       */
      //创建一个三维向量作为世界坐标
      var worldVector = new THREE.Vector3();
      //获取网格模型boxMesh的世界坐标，赋值给worldVector
      mesh.getWorldPosition(worldVector);
      //世界坐标转标准设备坐标，standardVector是WebGL设备坐标
      var standardVector = worldVector.project(this.camera);
      // 根据WebGL标准设备坐标standardVector计算div标签在浏览器页面的坐标
      var a = window.innerWidth / 2;
      var b = window.innerHeight / 2;
      var x = Math.round(standardVector.x * a + a); //标准设备坐标转屏幕坐标
      var y = Math.round(-standardVector.y * b + b); //标准设备坐标转屏幕坐标
      /**
       * 设置标签元素的位置
       */
      div.style.left = x - 70 + "px";
      //这里的130px主要是为了标签和模型有一定偏移，当然也可以不设置，两者叠加在一起
      div.style.top = y - 50 + "px";
    },
    heartValueArr1(item) {
      this.healths[0].number = item;
    },

    valueArr1(item) {
      this.healths[1].number = item;
    },
    sleepValueArr1(item) {
      this.healths[2].number = item;
    },
    sleepValueArr2(item) {
      this.healths[3].number = item;
    },

    end(item) {
      this.$refs.install.style.display = item;
    },
    goback() {
      this.$router.push({
        name: "City",
      });
      // window.location.reload();
    },
    createMap() {
      return new Promise((resolve, reject) => {
        AMapLoader.load({
          key: "801f94582634accd34b603716e96f57e", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: "2.0.0", // Loca 版本，缺省 1.3.2
          },
        })
          .then((map) => {
            resolve(map);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    displayN() {
      this.$refs.bottom.style.display = "none";
      this.$refs.pop.style.display = "none";
      this.$refs.popDetails.style.display = "none";
      this.$refs.popCenter.style.visibility = "visible";
      this.$refs.popCenter.style.width = "9rem";
    },
    displayB() {
      this.$refs.popCenter.style.width = "0rem";

      setTimeout(() => {
        this.$refs.bottom.style.display = "block";
        this.$refs.pop.style.display = "block";
        if (this.flage) {
          this.$refs.popDetails.style.display = "block";
        }

        this.$refs.popCenter.style.visibility = "hidden";
      }, 200);
    },
    popDown() {
      this.$refs.popDetails.style.display = "none";
      this.flage = false;
    },
    popOpen() {
      this.$refs.popDetails.style.display = "block";
      this.flage = true;
    },
    detailsOpen(e) {
      this.title[7] = "本社区老人健康详情与体征实时数据";
      this.$refs.install.style.display = "block";
      this.huamiData(e);
      if (this.HuamiName.rows[e].nickname) {
        this.popDetailsAS.name = this.HuamiName.rows[e].nickname;
      }
      if (this.HuamiName.rows[e].mobile) {
        this.popDetailsAS.phone = this.HuamiName.rows[e].mobile;
      }
      if (this.popDetailsA.dd[e].age) {
        this.popDetailsAS.age = this.popDetailsA.dd[e].age;
      }
      if (this.HuamiName.rows[e].body) {
        this.popDetailsAS.hot = JSON.parse(this.HuamiName.rows[e].body).weight;
      }
      if (this.HuamiName.rows[e].height) {
        this.popDetailsAS.height = this.HuamiName.rows[e].height;
      }
      this.popDetailsAS.index = `http://47.96.224.81:9581/api/user/profile/${
        e + 1
      }`;
      this.health[0].number = this.popDetailsAS.height;
      this.health[1].number = this.popDetailsAS.hot;
      this.$refs.popDetailsAll.style.visibility = "hidden";
      this.$refs.popDetailsUl.style.visibility = "visible";
    },
    detailsDown() {
      this.title[7] = "本社区老人基本信息和健康状况一览";
      this.$refs.popDetailsAll.style.visibility = "visible";
      this.$refs.popDetailsUl.style.visibility = "hidden";
    },
    async huamiData(index) {
      // let sleepJson = [{data:[{}]}]
      let runJsonStep = [{ data: [] }];
      let runJsonSleep = [{ data: [] }];
      let ecgObj = {};
      let ecgObjs = [];
      // let runJsonHeart = [{ data: [] }];

      // let dates = (
      //   Date.parse(new Date()) -
      //   24 * 60 * 60 * 1000 * 20
      // ).toString();
      // console.log(dates);
      // dates = dates.slice(0, 10);

      let params1 = {
        userIndex: index + 1,
        beginTime: "1629860308",
      };

      let huami = await getHuami(cf.host, params1);
      // console.log(huami);

      //步数历史记录
      if (huami.data.actives.length != 0) {
        for (let index2 = 0; index2 < huami.data.actives.length; index2++) {
          let runObj = {};
          runObj.number = JSON.parse(huami.data.sleep[index2].data).date;
          runObj.value = JSON.parse(huami.data.actives[index2].data).steps;
          runJsonStep[0].data.push(runObj);
        }
        this.map8 = runJsonStep;
      } else {
        runJsonStep[0].data = [];
        this.map8 = runJsonStep;
      }
      //心率历史记录
      if (huami.data.heartrates.length != 0) {
        let huamiData = JSON.parse(huami.data.heartrates[0].data);
        // let huamiDataH = huamiData.map(function (item) {
        //   return item.heartRateData;
        // });
        // let huamiM = huamiData.map(function (item) {
        //   return item.minute;
        // });
        var huamiDataNewArr = huamiData.filter((item) => {
          return item.heartRateData != 0;
        });

        let resultList = [];

        for (let i = 0; i < huamiDataNewArr.length; i++) {
          let obj = {};
          obj.value = huamiDataNewArr[i].heartRateData;
          obj.name = this.formatDate(
            huamiDataNewArr[i].timestamp,
            "Y-M-D h:m:s"
          );
          resultList.push(obj);
        }
        this.map6[0].data = resultList;
        this.map6[0].color = ["#FE9A9B", "#F6B7BA"];

        this.flages = false;
        this.$nextTick(() => {
          this.flages = true;
        });

        console.log("数据传输完毕");
      } else {
        let resultList = [];
        this.map6[0].data = resultList;
        this.flages = false;
        this.$nextTick(() => {
          this.flages = true;
        });
      }

      //深睡历史记录

      if (huami.data.sleep.length != 0) {
        for (let index1 = 0; index1 < huami.data.sleep.length; index1++) {
          let sleepObj = {};
          sleepObj.number = JSON.parse(huami.data.sleep[index1].data).date;
          sleepObj.value = JSON.parse(
            huami.data.sleep[index1].data
          ).deepSleepTime;
          runJsonSleep[0].data.push(sleepObj);
        }
        this.map7 = runJsonSleep;
      } else {
        runJsonSleep[0].data = [];
        this.map7 = runJsonSleep;
      }

      //心电历史map10
      if (huami.data.ecg.length != 0) {
        let ecgObjvalue = JSON.parse(huami.data.ecg[0].data);
        for (let index = 0; index < 500; index++) {
          ecgObj = {};
          ecgObj.number = index;
          ecgObj.value = ecgObjvalue[index].toFixed(0);
          ecgObjs.push(ecgObj);
        }
        // console.log(ecgObjs);
        // runJsonSleep[0].data.push(ecgObj);

        this.map10 = ecgObjs;
      } else {
        ecgObjs = [];
        this.map10 = ecgObjs;
      }
    },
    imgclick(e) {
      this.$refs.warningImgG.style.visibility = "visible";
      this.$refs.warningImgGM.src = this.warning[e].imgG;
    },
    warningImgGC() {
      this.$refs.warningImgG.style.visibility = "hidden";
    },
    clearScene(object) {
      object.traverse((child) => {
        if (child.material) {
          if (child.material.length > 1) {
            for (let index = 0; index < child.material.length; index++) {
              child.material[index].dispose();
            }
          } else {
            child.material.dispose();
          }
        }
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.texture) {
          child.texture.dispose();
        }

        if (child.type == "AmbientLight") {
          child.dispose();
        }
      });
      this.renderer.forceContextLoss();
      this.renderer.dispose();
      console.log("clearScene");
    },
    removeChild(childs) {
      let child = document.getElementsByClassName(childs);
      child.removeNode = [];
      if (child.length != undefined) {
        let len = child.length;
        for (let i = 0; i < len; i++) {
          child.removeNode.push({
            parent: child[i].parentNode,
            inner: child[i].outerHTML,
            next: child[i].nextSibling,
          });
        }
        for (let i = 0; i < len; i++) {
          child[0].parentNode.removeChild(child[0]);
        }
      } else {
        child.removeNode.push({
          parent: child.parentNode,
          inner: child.outerHTML,
          next: child.nextSibling,
        });
        child.parentNode.removeChild(child);
      }
    },
    ages(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        var Y = new Date().getFullYear();
        return Y - r[1] + "岁";
      }
      return "输入的日期格式错误！";
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/css/community.less";
</style>
