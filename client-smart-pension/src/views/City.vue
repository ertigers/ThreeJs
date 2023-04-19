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
                    <dt><img src="icon/jy.svg" alt="" /></dt>
                    <dd class="flexh">
                      <h6>养老机构总数</h6>
                      <p><count-to :end-val="165"></count-to></p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl class="flexw">
                    <dt><img src="icon/jy.svg" alt="" /></dt>
                    <dd class="flexh">
                      <h6>养老机构床位总数</h6>
                      <p><count-to :end-val="32806"></count-to></p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </Message>
          </li>
          <li class="li2 backli">
            <Message :title="title[1]">
              <div id="progress">
                <Progress :text="ProgressT"></Progress>
              </div>
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
                  <count-to :end-val="43390"></count-to>
                </span>
                <span class="PieSlotText"> 机构托养 </span>
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
        <div class="centerText" @click="goback">
          <p>安徽省·合肥市</p>
          <img src="/icon/BASE-LINE.svg" alt="" />
        </div>
      </div>
      <div class="pop" @click="displayN" ref="pop">
        <div class="popS"></div>
      </div>
      <div id="bottom" ref="bottom">
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
      <div id="popCenter">
        <ul class="flexh popCenterUl" ref="popCenter">
          <li class="popCenterLi1 popCenterLi">
            <Message :title="title[3]">
              <div id="progress1">
                <Progress :text="ProgressT1"></Progress>
              </div>
            </Message>
          </li>
          <li class="popCenterLi2 popCenterLi">
            <Message :title="title[4]">
              <div class="echartsText">
                <ul class="flexw">
                  <li>
                    <h6>本月累计服务人次</h6>
                    <p><count-to :end-val="93758"></count-to></p>
                  </li>
                  <div class="shu"></div>
                  <li>
                    <h6>今日服务人次</h6>
                    <p><count-to :end-val="3756"></count-to></p>
                  </li>
                </ul>
              </div>
              <div class="echartsText2 flexw">
                <div class="echartsShu1"></div>
                <p>今日机构服务情况</p>
                <div class="echartsShu2"></div>
              </div>
              <div id="echartsTrend"><Rank :data="map2"></Rank></div>
            </Message>
          </li>
          <li class="popCenterLi3 popCenterLi">
            <Message :title="title[5]">
              <div id="echartsTrend1"><Rank :data="map1"></Rank></div>
            </Message>
          </li>
          <li class="popCenterLi4 popCenterLi">
            <Message :title="title[6]">
              <div id="echartsTrend2"><Hot :data="map3"></Hot></div>
            </Message>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three"; //加载three核心依赖
import Pie from "../components/Pie";
import CountTo from "@/components/count-to";
import Progress from "../components/Progress.vue";
import Rank from "../components/Echarts/Rank";
import Hot from "../components/Echarts/Hot";
import datas1 from "../../public/geo/rank.json";
import datas2 from "../../public/geo/rank2.json";
import datas3 from "../../public/geo/hotproduct.json";
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "maps",
  // components: {
  //   HelloWorld,
  // },
  components: {
    Message: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000, import("../components/Message"));
      });
    },
    Pie,
    CountTo,
    Progress,
    Rank,
    Hot,
  },
  data() {
    return {
      map1: datas1,
      map2: datas2,
      map3: datas3,
      title: [
        "全市机构统计信息",
        "全市各区域老年人口统计",
        "全市老年人居住情况",
        "全市老年人年龄分布情况",
        "全市服务站及服务统计",
        "全市老年人婚姻状况",
        "全市老人健康情况",
      ],
      PieVal: [15, 20, 10],
      type: [
        {
          text: "机构托养(1.92%)",
          number: "50321",
          class: "MessageLi1",
          class1: "square21",
        },
        {
          text: "独居(0.11%)",
          number: "3214",
          class: "MessageLi2",
          class1: "square22",
        },
        {
          text: "空巢(0.76%)",
          number: "18378",
          class: "MessageLi1",
          class1: "square23",
        },
        {
          text: "家人同住(97.23%)",
          number: "2532312",
          class: "MessageLi2",
          class1: "square24",
        },
        {
          text: "其他(0.01%)",
          number: "200",
          class: "MessageLi2",
          class1: "square24",
        },
      ],
      type1: [
        {
          text: "50—55周岁",
          number: "1592527",
        },
        {
          text: "55—60周岁",
          number: "1036320",
        },
        {
          text: "60—65周岁",
          number: "1429860",
        },
        {
          text: "65—70周岁",
          number: "623214",
        },
        {
          text: "70—80周岁",
          number: "513327",
        },
      ],
      ProgressT: [
        {
          text: "瑶海区",
          number: "561676",
        },
        {
          text: "蜀山区",
          number: "510614",
        },
        {
          text: "包河区",
          number: "536145",
        },
        {
          text: "庐阳区",
          number: "612737",
        },
      ],
      ProgressT1: [
        {
          text: "65 - 69周岁",
          number: "812312",
        },
        {
          text: "70 - 79周岁",
          number: "342312",
        },
        {
          text: "80 - 89周岁",
          number: "37654",
        },
        {
          text: "90 - 99周岁",
          number: "5231",
        },
        {
          text: "100周岁以上",
          number: "616",
        },
      ],
      imgsrc: [
        require("../assets/img/area-gradient.png"),
        require("../assets/img/area-line.png"),
      ],
    };
  },
  destroyed() {
    this.$destroy("*");
    this.$destroy("Pie");
    this.$destroy("CountTo");
    this.$destroy("Progress");
    this.$destroy("Rank");
    this.$destroy("Hot");
    this.$destroy("datas1");
    this.$destroy("datas2");
    this.$destroy("datas3");
    this.$destroy("AMapLoader");
    this.$destroy("Message");
    window.removeEventListener("resize", this.resizeEvent);
    this.clearScene(this.scene);
    document.body.removeChild(document.getElementById("mask_div1"));
    // this.map.remove(this.gllayer);
    this.gllayer.destroy();
    this.map && this.map.destroy();
    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.scene = null;
    this.rangeMap1 = null;
    this.rangeMap2 = null;
    this.mesh2 = null;
    this.cube = null;
    this.map = null;
    this.div1 = null;
    this.tags = () => {};
    clearInterval(this.timer);
  },
  async mounted() {
    // this.labelRenderer = null;
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

    this.map.on("click", function (e) {
      that.map.clearMap(); //清理地图
      let lng = e.lnglat.getLng(); //获取经度
      let lat = e.lnglat.getLat(); //获取纬度
      //marker点
      let marker = new AMap.Marker({
        position: [lng, lat],
        offset: new AMap.Pixel(-13, -30),
      });
      console.log(lng, lat);
      // _this.lnglat = lng + "," + lat;//将经纬度绑定至input输入框
      that.map.add(marker); //加载点
      that.map.setFitView(); //缩放至地图
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
    var areaDates = customCoords.lngLatsToCoords([[117.160939, 31.808417]]);

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

        // document.body.removeChild(document.getElementsByTagName("div")[0]);

        // 环境光照和平行光
        // var aLight = new THREE.AmbientLight(0xffffff, 1);
        // var dLight = new THREE.DirectionalLight(0xffffff, 0.5);
        // dLight.position.set(1000, -100, 900);
        // var dLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        // dLight1.position.set(1000, 100, 900);
        // this.scene.add(dLight);
        // this.scene.add(aLight);
        // this.scene.add(dLight1);
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
        this.scene.add(this.cube);

        this.tag(this.cube, "江河社区养老院");
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
        this.renderer.render(this.scene, this.camera);
        this.tags(this.cube);
      },
    });
    if (this.map) {
      this.map.add(this.gllayer);
    }

    // this.addOct();
    let that = this; //防止onWindowResize使用时，this直接指向window
    //窗口自适应函数
    window.addEventListener("resize", this.resizeEvent, false);

    // onWindowResize();
    this.cont = document.getElementById("maps");
    this.cont.addEventListener("click", (evt) => {
      this.choose(evt);
    });
    this.timer = setInterval(this.animate, 20);

    // this.timer = setInterval(this.animate, 20);
  },
  methods: {
    resizeEvent() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // that.labelRenderer.setSize(window.innerWidth, window.innerHeight);
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
    // showInfoClick(e) {},
    animate() {
      this.map.render();
      if (this.rangeMap1.offset) {
        this.rangeMap1.offset.y -= 0.05;
        this.rangeMap1.needsUpdate = true;
      }
    },

    choose(event) {
      var Sx = event.clientX; //鼠标单击位置横坐标
      var Sy = event.clientY; //鼠标单击位置纵坐标
      //屏幕坐标转WebGL标准设备坐标
      var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
      var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
      //创建一个射线投射器`Raycaster`
      var raycaster = new THREE.Raycaster();
      // raycaster.layers.enable(1);
      //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
      raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
      raycaster.params.Line.threshold = 0.3;
      //返回.intersectObjects()参数中射线选中的网格模型对象
      // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      console.log(intersects);
      if (intersects) {
        // this.flage = "block";
        console.log(intersects);
      }
    },

    tag(mesh, name) {
      let that = this;
      /**
       * 创建div元素(作为立方体标签)
       */
      this.div1 = document.createElement("div");
      this.div1.id = "mask_div1";
      this.div1.innerHTML = name;
      this.div1.style.padding = "10px";
      this.div1.style.fontSize = "10px";
      this.div1.style.color = "#fff";
      this.div1.style.position = "absolute";
      this.div1.style.backgroundColor = "rgba(4,149,255,0.5)";
      this.div1.style.borderRadius = "5px";
      this.div1.style.cursor = "pointer";
      this.div1.style.zIndex = 99999;
      this.div1.onclick = function () {
        that.$router.push({
          name: "Community",
        });
        // window.location.reload();
      };
      document.body.appendChild(this.div1);

      /**
       * 立方体世界坐标转屏幕坐标
       */
      // 网格模型在threejs三维空间的世界坐标
      this.tags(mesh);
    },

    tags(mesh) {
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
      this.div1.style.left = x - 30 + "px";
      //这里的130px主要是为了标签和模型有一定偏移，当然也可以不设置，两者叠加在一起
      this.div1.style.top = y - 20 + "px";
    },

    displayN() {
      this.$refs.bottom.style.display = "none";
      this.$refs.pop.style.display = "none";
      this.$refs.popCenter.style.visibility = "visible";
      this.$refs.popCenter.style.width = "9rem";
    },
    displayB() {
      this.$refs.popCenter.style.width = "0rem";
      setTimeout(() => {
        this.$refs.bottom.style.display = "block";
        this.$refs.pop.style.display = "block";
        this.$refs.popCenter.style.visibility = "hidden";
      }, 200);
    },
    goback() {
      this.$router.push({
        name: "Home",
      });
      // window.location.reload();
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
  },
};
</script>

<style scoped lang="less">
@import "../assets/css/city.less";
</style>
