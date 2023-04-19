<template>
  <div id="map"></div>
</template>

<script>
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js"; //性能优化扩展
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";
// import Stats from "three/examples/jsm/libs/stats.module.js"; //加载three帧数扩展依赖
// import { addColor } from "../../../public/api/shaderline.js";
export default {
  props: ["data"],
  data() {
    return {};
  },
  async mounted() {
    //掩膜材质
    this.postprocess = null;
    this.ModelName = {
      code: "340100",
      area: "11445.1 km²",
      people: "818.9万人",
      station: "合肥市蜀山区东流路100号",
    };
    (this.pointGroup = null),
      (this.circleSize = 2.0),
      (this.chooseMesh = null),
      (this.renderCycleTime = 20),
      (this.renderInterval = null),
      (this.camera = null);
    this.scene = null;
    this.renderer = null;
    this.labelRenderer = null;
    this.geos_line = [];
    this.geos_circle = [];
    this.controls = null;
    this.meshGroup = null;
    this.spritGroup = null;

    // this.stats = null;
    await this.createScene();
    this.config = null;

    this.createTween();
    this.createLabelRender();
    this.createRender();
    this.createControl();

    // for (let index = 0; index < 1; index++) {
    //   //1改成监控数据数量
    //   this.createVideoImg();
    //   this.createVideoImg2();
    // }

    window.addEventListener("resize", this.resizeEvent);
    this.map = document.getElementById("map");
    this.map.addEventListener("click", (evt) => {
      this.choose(evt);
    });
    //初始化帧数检测器
    // this.stats = new Stats();
    // this.stats.domElement.style.top = "100px";
    // this.map.appendChild(this.stats.domElement);
  },
  watch: {
    // viewSwitch() {
    //   if (this.viewSwitch != "map") {
    //     document.body.removeChild(this.labelRenderer.domElement);
    //     this.renderCycleTime = 1000;
    //     clearInterval(this.renderInterval);
    //     this.createRender();
    //   } else {
    //     this.createLabelRender();
    //     this.renderCycleTime = 25;
    //     clearInterval(this.renderInterval);
    //     this.createRender();
    //   }
    //   console.log(this.renderCycleTime);
    // },
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeEvent);
    // });
    this.clearScene(this.scene);
    this.postprocess = null;
    this.ModelName = null;
    this.pointGroup = null;
    this.circleSize = null;
    this.chooseMesh = null;
    this.renderCycleTime = null;
    this.renderInterval = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.labelRenderer = null;
    this.geos_line = null;
    this.geos_circle = null;
    this.controls = null;
    this.meshGroup = null;
    this.spritGroup = null;
  },
  methods: {
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
      document.body.removeChild(this.labelRenderer.domElement);
      this.labelRenderer = null;
      clearInterval(this.renderInterval);
      // window.removeEventListener("resize", this.resizeEvent);

      this.renderer.forceContextLoss();
      this.renderer.dispose();
      // this.controls.dispose();
      // this.postprocess = null;
      // this.scene.clear();
      // this.scene = null;
      // this.camera = null;
      // this.renderer.domElement = null;
      // this.renderer = null;
      // this.renderer.forceContextLoss();
      // this.removeChild(this.scene);
      console.log("clearScene");
    },

    resizeEvent() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);
      this.labelRenderer.setSize(
        window.innerWidth / 1.2,
        window.innerHeight / 1.2
      );
    },

    async createScene() {
      this.scene = new THREE.Scene();
      const mapGroup = new THREE.Group();
      mapGroup.rotateX(-Math.PI / 2);
      mapGroup.position.z = -0.6;
      this.scene.add(mapGroup);
      const borderGroup = new THREE.Group();
      borderGroup.position.z = 0.15;
      mapGroup.add(borderGroup);
      const lineGroup = new THREE.Group();
      lineGroup.position.z = 0.2;
      mapGroup.add(lineGroup);
      this.meshGroup = new THREE.Group();
      mapGroup.add(this.meshGroup);
      this.pointGroup = new THREE.Group();
      this.pointGroup.position.z = 0.16;
      mapGroup.add(this.pointGroup);
      /**
       * 光源设置
       */
      // 平行光1
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
      directionalLight.position.set(400, 200, 300);
      this.scene.add(directionalLight);
      // 平行光2
      var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
      directionalLight2.position.set(-400, -200, -300);
      this.scene.add(directionalLight2);
      //环境光
      var ambient = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambient);
      //点光源
      var Pointl = new THREE.PointLight(0xffffff, 10, 50, 8);
      Pointl.position.set(110.26, 0.8, -40);
      this.scene.add(Pointl);
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      // this.camera.position.set(115.71, 4.35, -25.45);
      this.camera.lookAt(117.6, -0.3, -32);
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      this.renderer.setClearAlpha(0.0);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);

      this.config = {
        scene: this.scene,
        renderer: this.renderer,
        camera: this.camera,
      };
      // this.postprocess = addColor("#B1E3FE", this.config);

      //合并材质
      //标签线材质
      const textureLoader1 = new THREE.TextureLoader();
      const img = require("../../assets/line.png");
      const lineTexture = textureLoader1.load(img);
      lineTexture.wrapS = lineTexture.wrapT = THREE.RepeatWrapping;
      const lineMaterial = new THREE.MeshLambertMaterial({
        map: lineTexture,
        transparent: true,
        opacity: 0.2,
        color: 0x5aa0ff,
      });
      //扩散环材质
      const textureLoader2 = new THREE.TextureLoader();
      const img2 = require("../../assets/circle.png");
      const circleTexture = textureLoader2.load(img2);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: 0x29b7ff,
        map: circleTexture,
        transparent: true,
        opacity: 0.8,
      });

      this.data.features.forEach((item) => {
        const border = this.createBorder(
          item.geometry.coordinates,
          0.008,
          0.015
        );
        border.position.z = 0.01;
        borderGroup.add(border);

        //加载标签线
        this.geos_line.push(
          this.createLine(0.7, 0.005, item.properties.centroid)
        );

        const arrow = this.createArrow(0.04, item.properties.centroid);

        lineGroup.add(arrow);
        //加载扩散环

        this.geos_circle.push(this.createPoint(item.properties.centroid));

        const label = this.createLabel(
          item.properties.name,
          item.properties.centroid
        );

        mapGroup.add(label);
        this.mesh = this.createMesh(
          item.geometry.coordinates,
          item.properties.name
        );

        this.meshGroup.add(this.mesh);
        // this.postprocess.outlinePass.selectedObjects.push(this.mesh);
      });
      const mergeGeometry = BufferGeometryUtils.mergeBufferGeometries(
        this.geos_line
      );
      const linemesh = new THREE.Mesh(mergeGeometry, lineMaterial);

      linemesh.updateMatrix();
      lineGroup.add(linemesh);
      const mergeGeometry1 = BufferGeometryUtils.mergeBufferGeometries(
        this.geos_circle
      );
      const circlemesh = new THREE.Mesh(mergeGeometry1, circleMaterial);

      circlemesh.updateMatrix();
      this.pointGroup.add(circlemesh);
      document.getElementById("map").appendChild(this.renderer.domElement);
    },

    createBorder(data) {
      const group = new THREE.Group();
      var material = new THREE.LineBasicMaterial({
        color: 0xffffff, //线条颜色
        // transparent: true,
        // opacity: 0.8,
        // dashSize: size1, //短划线的大小
        // gapSize: size2, //短划线之间的距离
        // side: THREE.DoubleSide,
      }); //材质对象
      data.forEach((item) => {
        const list = [];
        item[0].forEach((item) => {
          list.push(item[0], item[1], 0);
        });
        var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
        //类型数组创建顶点数据
        var vertices = new Float32Array(list);
        // 创建属性缓冲区对象
        var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
        // 设置几何体attributes属性的位置属性
        geometry.attributes.position = attribue;
        // 线条渲染几何体顶点数据
        // var line = new THREE.Line(geometry, material);//线条模型对象
        var line = new THREE.LineLoop(geometry, material); //首尾顶点连线，轮廓闭合
        // line.computeLineDistances(); //不可或缺的，若无，则线段不能显示为虚线
        group.add(line);
      });

      return group;
    },

    createLine(height, radius, data) {
      const geometry = new THREE.CylinderBufferGeometry(
        radius,
        radius,
        height,
        30
      );
      geometry.rotateX(Math.PI / 2);
      geometry.translate(data[0], data[1], height / 2 - 0.3);
      return geometry;
    },
    createPoint(data) {
      const geometry = new THREE.PlaneBufferGeometry(0.25, 0.25);
      // geometry.rotateX(Math.PI / 2);
      geometry.translate(data[0], data[1], 0.1);
      return geometry;
    },

    createArrow(size, data) {
      const textureLoader = new THREE.TextureLoader();
      let img = require("../../assets/arrow.png");
      const texture = textureLoader.load(img);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        // transparent: true,
        // opacity: 0.1,
        // color: 0x1861D5,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.x = size;
      sprite.scale.y = size;
      sprite.position.set(data[0], data[1], 0.45);
      return sprite;
    },

    createLabel(name, data) {
      const div = document.createElement("div");
      div.innerHTML = name;
      div.style.padding = "5px 10px";
      div.style.color = "#7D93AB";
      div.style.fontSize = "18px";
      div.style.position = "absolute";
      div.style.backgroundColor = "rgba(25,25,25,0)";
      div.style.borderRadius = "5px";
      div.style.pointerEvents = "none";
      div.style.fontFamily = "PangMenZhengDao";
      div.style.pointerEvents = "none"; //避免HTML标签遮挡三维场景的鼠标事件
      // div.style.fontWeight = "bold";
      const label = new CSS2DObject(div);
      label.position.set(data[0], data[1], 0.75);
      return label;
    },

    createLabelRender() {
      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(
        window.innerWidth / 1.2,
        window.innerHeight / 1.2
      );
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.top = "50%";
      this.labelRenderer.domElement.style.left = "65%";
      this.labelRenderer.domElement.style.transform =
        " translateX(-45%) translateY(-50%)";
      this.labelRenderer.domElement.style.pointerEvents = "none";
      document.body.appendChild(this.labelRenderer.domElement);
    },

    createMesh(data, name) {
      const shapeList = [];
      data.forEach((item) => {
        const vectorList = [];
        item[0].forEach((item) => {
          vectorList.push(new THREE.Vector2(item[0], item[1]));
        });
        const shape = new THREE.Shape(vectorList);
        shapeList.push(shape);
      });

      let meshPhongMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xbee1fe,
        transparent: true,
        opacity: 0.75,
        transmission: 0.1,
        refractionRatio: 0,
        reflectivity: 0,
      });
      // let meshPhongMaterial2 = new THREE.MeshPhongMaterial({
      //   color: 0xfdc401,
      //   transparent: true,
      //   opacity: 0.9,
      // });
      // meshPhongMaterial.shininess = 6;
      let meshLambertMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xbee1fe,
        transparent: true,
        opacity: 0.5,
        transmission: 0.05,
        refractionRatio: 0,
        reflectivity: 0,
      });
      // let meshLambertMaterial2 = new THREE.MeshLambertMaterial({
      //   color: 0xf99616,
      //   transparent: true,
      //   opacity: 0.9,
      // });

      const extrudeBufferGeometry = new THREE.ExtrudeBufferGeometry(shapeList, {
        depth: 0.15,
        bevelEnabled: false,
      });
      // const extrudeBufferGeometry2 = new THREE.ExtrudeBufferGeometry(
      //   shapeList[0],
      //   {
      //     depth: 0.25,
      //     bevelEnabled: false,
      //   }
      // );
      // let mesh1 = new THREE.Mesh();
      let mesh2 = new THREE.Mesh();
      // if (name == "合肥市") {
      //   mesh1 = new THREE.Mesh(extrudeBufferGeometry2, [
      //     this.meshPhongMaterial2,
      //     this.meshLambertMaterial2,
      //   ]);
      // } else {
      mesh2 = new THREE.Mesh(extrudeBufferGeometry, [
        meshPhongMaterial,
        meshLambertMaterial,
      ]);
      mesh2.name = name;
      // }
      return mesh2;
    },

    createTween() {
      const obj = {
        x: 114.25227032472561,
        y: 6.252324590289729,
        z: -22.75359596320231,
      };
      const tween = new TWEEN.Tween(obj);
      tween.to(
        {
          x: 115.24471665516646,
          y: 4.613546418038603,
          z: -28.671043528620494,
        },
        1000
      );
      tween
        .onUpdate(() => {
          this.camera.position.set(obj.x, obj.y, obj.z);
          this.camera.lookAt(117.6, -0.3, -32);
        })
        .easing(TWEEN.Easing.Sinusoidal.InOut);
      tween.start();
    },

    createRender() {
      this.renderInterval = setInterval(() => {
        // const self = this;
        TWEEN.update();
        // if (this.pointGroup.children.length) {
        //   this.circleSize += 0.02;
        //   this.pointGroup.children.forEach((item) => {
        //     item.scale.set(self.circleSize, self.circleSize, self.circleSize);
        //     if (self.circleSize <= 2.6) {
        //       item.material.opacity = (self.circleSize - 2.0) * 1.67;
        //     } else if (self.circleSize > 2.6 && self.circleSize <= 5) {
        //       item.material.opacity = 1 - (self.circleSize - 2) / 3;
        //     } else {
        //       self.circleSize = 2.0;
        //     }
        //   });
        // }
        this.labelRenderer.render(this.scene, this.camera);
        // this.postprocess.composer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera); //执行渲染操作

        // this.stats.update();
      }, this.renderCycleTime);
    },

    createControl() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(117.6, -0.3, -32);
      this.controls.maxPolarAngle = Math.PI / 2.8;
      this.controls.minPolarAngle = Math.PI / 6;
      this.controls.maxDistance = 9;
      this.controls.minDistance = 6;
      this.controls.update();
      this.controls.maxAzimuthAngle = Math.PI / 4;
      this.controls.minAzimuthAngle = -Math.PI / 2;
      this.controls.screenSpacePanning = false;
      // this.controls.addEventListener("change", () => {
      //   console.log(this.camera.position);
      // });
    },
    choose(event) {
      event.preventDefault();
      // console.log(event);
      // if (this.dragState == false) {
      //   this.dragState = true;
      //   return;
      // }
      this.camera.updateProjectionMatrix();
      if (this.chooseMesh) {
        this.chooseMesh.material[0].color.set(0xbee1fe); //恢复原来颜色
        this.chooseMesh.material[1].color.set(0xbee1fe); //恢复原来颜色
      }
      // this.postprocess.outlinePass.selectedObjects = [this.mesh];

      // if (this.chooseMesh && this.chooseMesh.scale.x !== 4) {
      //   this.chooseMesh.scale.x = 4;
      //   const extrudeBufferGeometry4 = new THREE.ExtrudeBufferGeometry(
      //     this.chooseMesh.geometry.parameters.shapes,
      //     {
      //       depth: 0.15,
      //       bevelEnabled: false,
      //     }
      //   );
      //   var mesh4 = new THREE.Mesh(extrudeBufferGeometry4, [
      //     this.meshPhongMaterial,
      //     this.meshLambertMaterial,
      //   ]);
      //   mesh4.name = this.ModelName;
      //   this.meshGroup.add(mesh4);
      // }
      let getBoundingClientRect =
        this.renderer.domElement.getBoundingClientRect();
      // 屏幕坐标转标准设备坐标
      let x =
        ((event.clientX - getBoundingClientRect.left) /
          this.renderer.domElement.offsetWidth) *
          2 -
        1; // 标准设备横坐标
      let y =
        -(
          (event.clientY - getBoundingClientRect.top) /
          this.renderer.domElement.offsetHeight
        ) *
          2 +
        1; // 标准设备纵坐标
      //创建一个射线投射器`Raycaster`
      var raycaster = new THREE.Raycaster();
      raycaster.params.Line.threshold = 0.3;
      //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
      raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
      //返回.intersectObjects()参数中射线选中的网格模型对象
      // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
      var intersects = raycaster.intersectObjects(this.meshGroup.children);
      if (intersects.length > 0) {
        // let msg = [];
        // console.log(intersects[0].object);
        this.chooseMesh = intersects[0].object;
        console.log(this.chooseMesh);
        // this.postprocess.outlinePass.selectedObjects.push(this.chooseMesh);
        this.chooseMesh.material[0].color.set(0x1bd0ff);
        this.chooseMesh.material[1].color.set(0x1bd0ff);
        this.chooseMesh.layer = 100;
        this.ModelName.name = this.chooseMesh.name;
        if (this.chooseMesh.name == "合肥市") {
          this.ModelName.code = "340100";
          this.ModelName.area = "11445.1 km²";
          this.ModelName.people = "818.9万人";
          this.ModelName.station = "合肥市蜀山区东流路100号";
          this.$router.push({
            name: "City",
            // params: { p: "/route/communitys1", p1: "communitys1" },
            // name: this.$route.params.p1,
          });
          // window.location.reload();
        } else if (this.chooseMesh.name == "芜湖市") {
          this.ModelName.code = "340200";
          this.ModelName.area = "6026 km²";
          this.ModelName.people = "377.8 万人";
          this.ModelName.station = "芜湖市鸠江区政通路66号";
        } else if (this.chooseMesh.name == "蚌埠市") {
          this.ModelName.code = "340300";
          this.ModelName.area = "5952 km²";
          this.ModelName.people = "341.2 万人";
          this.ModelName.station = "蚌埠市蚌山区东海大道3115号";
        } else if (this.chooseMesh.name == "淮南市") {
          this.ModelName.code = "340400";
          this.ModelName.area = "5533 km²";
          this.ModelName.people = "349 万人";
          this.ModelName.station = "田家庵区和风街88号";
        } else if (this.chooseMesh.name == "马鞍山市") {
          this.ModelName.code = "340500";
          this.ModelName.area = "4049 km²";
          this.ModelName.people = "236.1 万人";
          this.ModelName.station = "马鞍山市雨山区太白大道2008号";
        } else if (this.chooseMesh.name == "淮北市") {
          this.ModelName.code = "340600";
          this.ModelName.area = "2741 km²";
          this.ModelName.people = "225.4 万人";
          this.ModelName.station = "相山区人民路208号";
        } else if (this.chooseMesh.name == "铜陵市") {
          this.ModelName.code = "340700";
          this.ModelName.area = "3008 km²";
          this.ModelName.people = "164.1 万人";
          this.ModelName.station = "铜官区湖东路666号";
        } else if (this.chooseMesh.name == "安庆市") {
          this.ModelName.code = "340800";
          this.ModelName.area = "13589.99 km²";
          this.ModelName.people = "472.3 万人";
          this.ModelName.station = "安庆市迎江区东部新城";
        } else if (this.chooseMesh.name == "黄山市") {
          this.ModelName.code = "341000";
          this.ModelName.area = "9807 km²";
          this.ModelName.people = "142.1 万人";
          this.ModelName.station = "屯溪区天都大道1号";
        } else if (this.chooseMesh.name == "滁州市") {
          this.ModelName.code = "341100";
          this.ModelName.area = "13398 km²";
          this.ModelName.people = "414.7 万人";
          this.ModelName.station = "滁州市南谯区龙蟠大道99号";
        } else if (this.chooseMesh.name == "阜阳市") {
          this.ModelName.code = "341200";
          this.ModelName.area = "10118.17 km²";
          this.ModelName.people = "825.9 万人";
          this.ModelName.station = "颍州区清河东路539号";
        } else if (this.chooseMesh.name == "宿州市") {
          this.ModelName.code = "341300";
          this.ModelName.area = "9787 km²";
          this.ModelName.people = "568.14 万人";
          this.ModelName.station = "埇桥区银河一路506号";
        } else if (this.chooseMesh.name == "六安市") {
          this.ModelName.code = "341500";
          this.ModelName.area = "15451 km²";
          this.ModelName.people = "487.3 万人";
          this.ModelName.station = "金安区佛子岭中路行政中心8号";
        } else if (this.chooseMesh.name == "亳州市") {
          this.ModelName.code = "341600";
          this.ModelName.area = "8374 km²";
          this.ModelName.people = "663.0 万人";
          this.ModelName.station = "谯城区希夷大道588号";
        } else if (this.chooseMesh.name == "池州市") {
          this.ModelName.code = "341700";
          this.ModelName.area = "8271.7 km²";
          this.ModelName.people = "148.5 万人";
          this.ModelName.station = "贵池区百牙中路1号";
        } else if (this.chooseMesh.name == "宣城市") {
          this.ModelName.code = "341800";
          this.ModelName.area = "12340 km²";
          this.ModelName.people = "266.1 万人";
          this.ModelName.station = "宣州区鳌峰东路31号";
        }

        this.$emit("listenToChildEvent", ["block", this.ModelName]);
        // this.chooseMesh.scale.x = 2;
        // const extrudeBufferGeometry3 = new THREE.ExtrudeBufferGeometry(
        //   this.chooseMesh.geometry.parameters.shapes,
        //   {
        //     depth: 0.25,
        //     bevelEnabled: false,
        //   }
        // );
        // var mesh3 = new THREE.Mesh(extrudeBufferGeometry3, [
        //   this.meshPhongMaterial2,
        //   this.meshLambertMaterial2,
        // ]);
        // this.chooseMesh = mesh3;
        // // console.log(this.chooseMesh);
        // this.meshGroup.add(this.chooseMesh);
      } else {
        this.$emit("listenToChildEvent", ["none", this.ModelName]);
      }
    },
  },
};
</script>
<style scoped>
#map {
  position: absolute;
  left: 65%;
  top: 50%;
  transform: translateX(-45%) translateY(-50%);
}
</style>
