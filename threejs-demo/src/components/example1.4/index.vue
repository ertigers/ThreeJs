<template>
  <div class='shadow_page'>
    <IdxRoller v-show="loadding" />
    <div v-show="!loadding" class="content" >
      <nav class="header ended">
        <a class="active" href=""><span>首页</span></a>
        <a href=""><span>作品</span></a>
        <a href=""><span>关于</span></a>
        <a href=""><span>更多</span></a>
        <div class="cursor"></div>
      </nav>
      <section class="section first">
        <div class='info'>
          <div class='name'>DRAGONIR</div>
          <div class='title'>THREE.JS ODESSEY</div>
        </div>
        <canvas id='canvas-container' class='webgl'></canvas>
      </section>
      <section class="section second">
        <div class="second-container">
          <ul>
            <li id="one" :class="activeStep === 'one' ? 'active' : ''" @click="handleChangeStep('one')">入门</li>
            <li id="two" :class="activeStep === 'two' ? 'active' : ''" @click="handleChangeStep('two')">基础</li>
            <li id="three" :class="activeStep === 'three' ? 'active' : ''" @click="handleChangeStep('three')">进阶</li>
          </ul>
          <p v-if="activeStep === 'one'" class="text" id="content">昨夜西风凋碧树。独上高楼，望尽天涯路。</p>
          <p v-if="activeStep === 'two'" class="text" id="content">衣带渐宽终不悔，为伊消得人憔悴。</p>
          <p v-if="activeStep === 'three'" class="text" id="content">众里寻他千百度，蓦然回首，那人却在灯火阑珊处。</p>
        </div>
        <canvas id='canvas-container-details' class='webgl'></canvas>
      </section>
    </div>
  </div>
</template>

<script>
import IdxRoller from './IdxRoller'
import './style.css';
import { Clock, Scene, LoadingManager, WebGLRenderer, sRGBEncoding, Group, PerspectiveCamera, DirectionalLight, PointLight, MeshPhongMaterial } from 'three';
import TWEEN  from 'three/examples/jsm/libs/tween.module.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  components:{
    IdxRoller
  },
  data() {
    return {
      loadding: false,
      activeStep: 'one',

      camera2: null,
    }
  },
  mounted() {
    this.threeInit()
  },
  methods: {

    threeInit() {
      // 定义渲染尺寸
      const section = document.getElementsByClassName('section')[0];
      let oldMaterial;
      let width = section.clientWidth;
      let height = section.clientHeight;


      // 初始化渲染器1
      const renderer = new WebGLRenderer({
        canvas: document.querySelector('#canvas-container'),  // 提供绘制区域,不传则自动创建一个新的canvas
        antialias: true, // 抗锯齿
        alpha: true, //  true: 0 , false : 1 , 默认为false
        powerPreference: 'high-performance'  // 配置适合的WebGL环境 low-power 默认是"default"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.autoClear = true; // 定义渲染器是否在渲染每一帧之前自动清除其输出。
      renderer.outputEncoding = sRGBEncoding;

      // 初始化渲染器2
      const renderer2 = new WebGLRenderer({
        canvas: document.querySelector('#canvas-container-details'),
        antialias: false
      });
      renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer2.setSize(width, height);
      renderer2.outputEncoding = sRGBEncoding;

      // 初始化场景
      const scene = new Scene();

      // 初始化相机1
      const cameraGroup = new Group();
      scene.add(cameraGroup);
      const camera = new PerspectiveCamera(35, width / height, 1, 100)
      camera.position.set(19, 1.54, -.1);
      cameraGroup.add(camera);
      // 相机2
      const camera2 = new PerspectiveCamera(60, section.clientWidth / section.clientHeight, 1, 100);
      camera2.position.set(2.2, 2, 4.2);

      camera2.rotation.set(0, 1, 0);
      this.camera2 = camera2
      scene.add(camera2);

      // 页面缩放事件监听
      window.addEventListener('resize', () => {
        let section = document.getElementsByClassName('section')[0];
        camera.aspect = section.clientWidth / section.clientHeight
        camera.updateProjectionMatrix();
        camera2.aspect = section.clientWidth / section.clientHeight;
        camera2.updateProjectionMatrix();
        renderer.setSize(section.clientWidth, section.clientHeight);
        renderer2.setSize(section.clientWidth, section.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      // 直射光
      const directionLight = new DirectionalLight(0xffffff, .8);
      directionLight.position.set(-100, 0, -100);
      scene.add(directionLight);

      // 点光源
      const fillLight = new PointLight(0x88ffee, 2.7, 4, 3);
      fillLight.position.set(60, 3, 2.8);
      scene.add(fillLight);


      // 加载管理
      const loadingManager = new LoadingManager();
      loadingManager.onLoad = () => {
        this.loadding = false
        const yPosition = { y: 0 };
        // 隐藏加载页面动画
        new TWEEN.Tween(yPosition)
          .to({ y: 100 }, 900)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onComplete(function () {
            TWEEN.remove(this);
          });
        // 使用Tween给相机添加入场动画
        new TWEEN.Tween(
          camera.position.set(0, 4, 2))
          .to({ x: 0, y: 2, z: 8 }, 2500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
          .onComplete(function () {
            TWEEN.remove(this);
          });
        window.scroll(0, 0)
      }


      // 使用 dracoLoader 加载用blender压缩过的模型
      // const dracoLoader = new DRACOLoader();
      // dracoLoader.setDecoderPath('/draco/');
      // dracoLoader.setDecoderConfig({ type: 'js' });
      // const loader = new GLTFLoader(loadingManager);
      // loader.setDRACOLoader(dracoLoader);

      // 模型加载
      const loader = new GLTFLoader(loadingManager);
      loader.load('/models/cute_spider__ccw.glb', function (gltf) {
        gltf.scene.traverse((obj) => {
          if (obj.isMesh) {
            oldMaterial = obj.material;
            obj.material = new MeshPhongMaterial({ shininess: 100 });
          }
        });
        scene.add(gltf.scene);
        oldMaterial.dispose();
        renderer.renderLists.dispose();
      });

      // 鼠标移动时添加虚拟光标
      const cursor = { x: 0, y: 0 };
      document.addEventListener('mousemove', event => {
        event.preventDefault();
        cursor.x = event.clientX / window.innerWidth - .5;
        cursor.y = event.clientY / window.innerHeight - .5;
        document.querySelector('.cursor').style.cssText = `left: ${event.clientX}px; top: ${event.clientY}px;`;
      }, false);

      // 基于容器视图禁用渲染器
      let secondContainer = false;
      const ob = new IntersectionObserver(payload => {
        secondContainer = payload[0].intersectionRatio > 0.05;
      }, { threshold: 0.05 });
      ob.observe(document.querySelector('.second'));

      // 页面重绘动画
      const clock = new Clock()
      let previousTime = 0;
      const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;
        const parallaxY = cursor.y;
        const parallaxX = cursor.x
        fillLight.position.y -= (parallaxY * 9 + fillLight.position.y - 2) * deltaTime;
        fillLight.position.x += (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime;
        cameraGroup.position.z -= (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime;
        cameraGroup.position.x += (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime;
        TWEEN.update();
        secondContainer ? renderer2.render(scene, camera2) : renderer.render(scene, camera);
        requestAnimationFrame(tick);
      }
      tick();


    },
    // 相机动画
    animateCamera(position, rotation) {
      new TWEEN.Tween(this.camera2.position)
        .to(position, 1800)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(function () {
          TWEEN.remove(this)
        })
      new TWEEN.Tween(this.camera2.rotation)
        .to(rotation, 1800)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(function () {
          TWEEN.remove(this);
        });
    },

    handleChangeStep(step) {
      this.activeStep = step
      switch (step) {
        case 'one':
          this.animateCamera({ x: 2.2, y: 2, z: 4.2 }, { y: 1 });
          break;
      
        case 'two':
        this.animateCamera({ x: -1.4, y: 2.2, z: 4.4 }, { y: -0.1 });
        break;

        case 'three':
          this.animateCamera({ x: -3.6, y: 2, z: 3.2 }, { y: -0.75 });
          break;

        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shadow_page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  scroll-behavior: smooth;
  overscroll-behavior: none;
  color: #fff;
  overflow: hidden auto;
  .content {
    nav {
      width: 100%;
      padding: 1rem;
      position: fixed;
      z-index: 2;
      a {
        display: inline-block;
        color: #fff;
        padding: 1rem;
        margin-right: 4rem;
        letter-spacing: 0.4em;
        font-size: 1.2em;
        transition: all 0.3s ease, color 0.3s ease;
        span {
          display: inline-block;
          pointer-events: none;
          transition: transform 0.1s linear;
        }
      }
      a:hover {
        cursor: pointer;
        color: #afafaf;
        transform: scale(1.1);
      }
      a:hover~.cursor {
        transform: translate(-50%, -50%) scale(5);
        opacity: 0.1;
      }


      .cursor {
        pointer-events: none;
        position: fixed;
        top: 10px;
        left: 10px;
        padding: 10px;
        background: rgba(255, 255, 255, .3);
        backdrop-filter: blur(4px);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
        transition: transform 0.8s ease, opacity 0.6s ease;
        z-index: 2;
        border: .5px solid rgba(255, 255, 255, .1);
      }
    }

    .header {
      position: absolute;
      top: -2em;
      left: 0;
      color: #fff;
      font-size: 0.8em;
      width: 100%;
      text-align: center;
      z-index: 2;
      opacity: 0;
      transition: all 1.8s ease-in-out;
      padding: 0;
      margin: 0;
      span {
        padding: 0 3.25em;
        letter-spacing: 0.4em;
        position: relative;
      }
      .active:after {
        content: "";
        bottom: -10px;
        width: 20px;
        height: 2px;
        background: #fff;
      }
    }
    .header.ended {
      top: 3em;
      opacity: 1;
    }


    .section {
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      z-index: 1;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      pointer-events: none;
      box-sizing: border-box;
      .webgl {
        height: 100%;
        width: 100%;
      }
    }
    .section.first {
      pointer-events: none;
      font-size: 2em;
      letter-spacing: 0.5em;
      text-align: center;
      width: 100%;
      display: flex;
      height: 100vh;
      align-content: center;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: relative;
      z-index: 1;
      background: linear-gradient(0deg, #050505 20%, rgba(5,5,5,0) 50%);
      overflow: hidden;
      .info {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        .name {
          font-size: 2em;
          font-weight: 100;
          letter-spacing: 0.25em;
          font-style: italic;
          color: #03c03c;
        }
        .title {
          margin: 10px 0;
          font-weight: 100;
          letter-spacing: 0.4em;
          font-size: 1.8em;
          width: 800px;
        }
        .title::after {
          content: "";
          position: absolute;
          margin-top: 60px;
          left: calc(50% - 25px);
          width: 50px;
          height: 2px;
          background: rgba(255,255,255,0.439);
        }

      }
      .webgl {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        z-index: 0;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        background: #000;
        background: radial-gradient(circle at center center, #171717 0, #050505 58%);
      }
    }
    .section.second {
      pointer-events: all;
      font-size: 2em;
      width: 100%;
      display: flex;
      height: 100vh;
      background: #141414;
      z-index: 1;
      margin: 0;
      padding: 0;
      overflow: hidden;
      .second-container {
        pointer-events: all;
        width: 100%;
        display: flex;
        height: 100vh;
        margin: 0;
        padding: 0 10%;
        flex-direction: column;
        justify-content: center;
        z-index: 2;
        background: radial-gradient(circle at 90% center, rgba(5,5,5,0) 30%, #141414 70%);
      }

      .second-container>ul {
        list-style: none;
        display: inline-flex;
        padding: 0px;
        margin: 0px 0px 64px 64px;
        color: rgba(255,255,255, .11);
        z-index: 2;
      }
      .second-container>ul>li.active:after {
        content: "";
        top: 20px;
        width: 50px;
        height: 2px;
        background: #fff;
        position: relative;
        left: 0px;
        display: block;
      }
      .second-container>ul>li {
        padding-right: 32px;
        transition: all .8s ease-out;
        font-size: 1.2em;
      }
      .second-container>ul>li:hover {
        color: #f5f5f5;
        pointer-events: all;
        cursor: pointer;
      }
      .second-container>ul>li:hover~nav.header.ended.cursor {
        transform: translate(-50%, -50%) scale(5);
        opacity: 1;
      }
      .second-container>ul>li.active {
        color: #f5f5f5;
      }
      .second-container .text {
        font-size: 1.4em;
        width: 30%;
        color: rgba(255, 255, 255, .8);
        margin-left: 60px;
        height: 300px;
        line-height: 2;
        letter-spacing: 8px;
      }
      .webgl {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        z-index: 0;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        pointer-events: all;
        overflow: hidden;
      }
    }
  }
}

</style>
