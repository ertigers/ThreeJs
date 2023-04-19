<template>
  <div class="container" :id="id"><slot></slot></div>
</template>

<script>
import * as THREE from "three"; //加载three核心依赖
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; //加载three控制器
export default {
  data() {
    return {};
  },
  props: ["id", "val"],
  mounted() {
    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.scene = null;
    this.renderInterval = 0;
    this.init();
    this.createRender();

    window.addEventListener("resize", this.resizeEvent);

    this.setData(this.val);
    this.resizeEvent();
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
    },
    removeChild(object) {
      while (object.children.length > 0) {
        let child = object.children[0];
        this.removeChild(child);
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
        if (child.texture) child.texture.dispose();
        if (child.dispose) child.dispose();
        object.remove(child);
      }
    },
    init() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      this.renderer.setClearAlpha(0.0);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.scene = new THREE.Scene();
      this.vW = 0;
      this.vH = 0;
      this.camera = new THREE.PerspectiveCamera(
        50,
        this.vW / this.vH,
        0.1,
        1000
      );
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 5.5;
      this.controls.enableZoom = false;
      // this.controls.enableRotate = false;
      this.controls.minPolarAngle = Math.PI / 2.8; // radians
      this.controls.maxPolarAngle = Math.PI / 2.8; // radians
      this.controls.enablePan = false;
      // this.scene.add(new THREE.AxesHelper(1000));
      this.camera.position.set(0, 90, 180);
      this.camera.lookAt(this.scene.position);
      this.renderer.setSize(this.vW, this.vH);
      // this.dom.appendChild(this.renderer.domElement);
      document.getElementById(this.id).appendChild(this.renderer.domElement);
      let ambientLight = new THREE.AmbientLight(0xffffff, 1);
      let directLight = new THREE.DirectionalLight(0xffffff, 1);
      directLight.position.set(-100, 100, -10);
      this.scene.add(ambientLight);
      this.scene.add(directLight);
    },
    setData(values) {
      let total = 0;
      // 求总和
      values.map((item) => {
        total += item;
      });
      // 创建模型
      let trans = 0;
      let l = values.length;
      // l = 1;
      for (let i = 0; i < l; i++) {
        const value = values[i];
        let result = this.createGeo(value, total, trans);
        let geo = result.geo;
        let valueColor = result.valueColor;
        trans = result.trans;
        // if(i==1) {
        this.addMesh(geo, valueColor);
        // }
      }
    },
    createGeo(value, total, transAngle) {
      // 全局参数
      let thetaSeg = 120; // 圆的细分面
      let c = new THREE.Vector2(0, 0); // 中心点
      let er = 100; // 外半径
      let ir = 70; // 内半径

      // step1 计算当前块的占比弧度
      let pieLength = (value / total) * (Math.PI * 2);
      // step2 创建外圈曲线
      let curveExternal = new THREE.EllipseCurve(
        c.x,
        c.y,
        er,
        er,
        0,
        pieLength
      );
      // step3 创建外圈曲线
      let curveInner = new THREE.EllipseCurve(c.x, c.y, ir, ir, 0, pieLength);
      // step4 计算该块占分割面多少
      let pointsLength = Math.round(thetaSeg * (value / total));
      // step5 获取外圈二维坐标标点
      let ePoints = curveExternal.getPoints(pointsLength);
      // step5 获取内圈二维做标点
      let iPoints = curveInner.getPoints(pointsLength);
      // step6 全部坐标点
      let points = ePoints.concat(iPoints.reverse());
      // step7 创建二维平面
      let shape = new THREE.Shape(points);
      // step8 配置挤出网格参数
      let options = {
        steps: 2,
        depth: value,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
      };
      // step9 挤出网格
      let geo = new THREE.ExtrudeBufferGeometry(shape, options);
      geo.rotateX(Math.PI / 2);
      geo.rotateY(-transAngle);

      // 创建完成后添加偏移值
      transAngle += pieLength;
      // 返回网格
      return { geo: geo, trans: transAngle, valueColor: value };
    },
    async addMesh(geo, value) {
      // console.log(value);
      // let mtl = new THREE.MeshLambertMaterial({
      //   color: Math.random() * 0xffffff,
      //   transparent: true,
      //   opacity: 0.8,
      // });
      if (value == 20) {
        var mtl = new THREE.MeshPhongMaterial({
          color: 0x0089df,
          transparent: true,
          opacity: 0.8,
        });
      } else if (value == 15) {
        mtl = new THREE.MeshPhongMaterial({
          color: 0xd9a705,
          transparent: true,
          opacity: 0.8,
        });
      } else if (value == 5) {
        mtl = new THREE.MeshPhongMaterial({
          color: 0xdae4e6,
          transparent: true,
          opacity: 0.8,
        });
      } else {
        mtl = new THREE.MeshPhongMaterial({
          color: Math.random() * 0xffffff,
          transparent: true,
          opacity: 0.8,
        });
      }
      let mesh = new THREE.Mesh(geo, mtl);

      mesh.rotateX(Math.PI);
      this.scene.add(mesh);
      await this.waitSeconds(2);
    },
    createRender() {
      this.renderInterval = setInterval(() => {
        this.renderer.render(this.scene, this.camera); //执行渲染操作
        this.controls.update();
      }, 20);
    },
    waitSeconds(seconds = 0) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    },
    resizeEvent() {
      setTimeout(() => {
        this.camera.aspect =
          document.getElementsByClassName("container")[0].offsetWidth /
          document.getElementsByClassName("container")[0].offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          document.getElementsByClassName("container")[0].offsetWidth,
          document.getElementsByClassName("container")[0].offsetHeight
        );
      }, 1000);

      // console.log(document.getElementsByClassName("container")[0].offsetWidth);
    },
  },
  destroyed() {
    clearInterval(this.renderInterval);
    window.removeEventListener("resize", this.resizeEvent);
    this.clearScene(this.scene);
    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.scene = null;
    this.renderInterval = null;
    // this.resMgr.dispose();
    // console.log(this.scene);
    // this.removeChild(this.scene);
    // this.renderer.forceContextLoss();
    // this.renderer.dispose();
    // this.scene.clear();
    // this.scene = null;
    // this.camera = null;
    // this.controls = null;
    // this.renderer.domElement = null;
    // this.renderer = null;
    // this.scene.dispose;
    // console.log(this.scene);
    // this.renderer.forceContextLoss();
    // this.renderer = null;
  },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 1.5rem;
  /deep/canvas {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
