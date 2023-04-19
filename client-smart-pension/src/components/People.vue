<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  components: {},
  data() {
    return {};
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeEvent);
    this.clearScene(this.scene);
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.stats = null;
    this.model = null;
    this.skeleton = null;
    this.mixer = null;
    this.clock = null;
    this.renderInterval = null;

    this.crossFadeControls = null;

    this.currentBaseAction = null;
    this.allActions = null;
    this.baseActions = null;
    this.additiveActions = null;
    this.panelSettings = null;
    this.numAnimations = null;
  },
  mounted() {
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.stats = null;
    this.model = null;
    this.skeleton = null;
    this.mixer = null;
    this.clock = null;
    this.renderInterval = null;

    this.crossFadeControls = [];

    this.currentBaseAction = "walk";
    this.allActions = [];
    this.baseActions = {
      idle: { weight: 0 },
      walk: { weight: 1 },
      run: { weight: 0 },
    };
    this.additiveActions = {
      sneak_pose: { weight: 0 },
      sad_pose: { weight: 0 },
      agree: { weight: 0 },
      headShake: { weight: 0 },
    };
    this.panelSettings = null;
    this.numAnimations = null;

    this.init();
    setTimeout(() => {
      this.resizeEvent();
    }, 100);
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
      clearInterval(this.renderInterval);
      console.log("clearScene");
    },
    init() {
      const container = document.getElementById("container");
      this.clock = new THREE.Clock();

      this.scene = new THREE.Scene();
      // this.scene.background = new THREE.Color(0xa0a0a0, 0.5);
      // this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 20, 0);
      this.scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(3, 10, 10);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 2;
      dirLight.shadow.camera.bottom = -2;
      dirLight.shadow.camera.left = -2;
      dirLight.shadow.camera.right = 2;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 40;
      this.scene.add(dirLight);

      // ground

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshPhongMaterial({
          color: 0x999999,
          depthWrite: false,
          transparent: true,
          opacity: 0.2,
        })
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.receiveShadow = true;
      this.scene.add(mesh);

      const loader = new GLTFLoader();
      let that = this;
      loader.load("3D/Xbot.glb", function (gltf) {
        that.model = gltf.scene;
        that.scene.add(that.model);

        that.model.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.material.wireframe = true;
            object.material.transparent = true;
            object.material.opacity = 0.3;
            object.material.color.set(0xbae0f6);

            // console.log(object);
          }
        });

        that.skeleton = new THREE.SkeletonHelper(that.model);
        // skeleton.visible = false;
        that.scene.add(that.skeleton);

        const animations = gltf.animations;
        that.mixer = new THREE.AnimationMixer(that.model);

        that.numAnimations = animations.length;

        for (let i = 0; i !== that.numAnimations; ++i) {
          let clip = animations[i];

          const name = clip.name;
          if (that.baseActions[name]) {
            const action = that.mixer.clipAction(clip);
            that.activateAction(action);
            that.baseActions[name].action = action;

            that.allActions.push(action);
          } else if (that.additiveActions[name]) {
            // Make the clip additive and remove the reference frame

            THREE.AnimationUtils.makeClipAdditive(clip);

            if (clip.name.endsWith("_pose")) {
              clip = THREE.AnimationUtils.subclip(clip, clip.name, 2, 3, 30);
            }

            const action = that.mixer.clipAction(clip);
            that.activateAction(action);
            that.additiveActions[name].action = action;
            that.allActions.push(action);
          }
        }
        that.createPanel();

        that.animate();
      });

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;
      this.renderer.setClearAlpha(0.0);
      container.appendChild(this.renderer.domElement);

      // camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      this.camera.position.set(-0.4, 1.2, 2.5);

      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      // controls.enablePan = false;
      // controls.enableZoom = false;
      controls.target.set(0, 1, 0);
      controls.update();

      this.stats = new Stats();

      // container.appendChild(this.stats.dom);
      setTimeout(() => {
        window.addEventListener("resize", this.resizeEvent);
      }, 500);
    },
    createPanel() {
      // const container = document.getElementById("popDetails");
      let that = this;
      const panel = new GUI({ width: 310, color: "#A0A0A0" });
      // container.appendChild(document.getElementsByClassName("main")[0]);
      const folder1 = panel.addFolder("Base Actions");
      const folder2 = panel.addFolder("Additive Action Weights");
      const folder3 = panel.addFolder("General Speed");

      that.panelSettings = {
        "modify time scale": 1.0,
      };

      const baseNames = ["None", ...Object.keys(that.baseActions)];
      for (let i = 0, l = baseNames.length; i !== l; ++i) {
        const name = baseNames[i];
        const settings = that.baseActions[name];
        that.panelSettings[name] = function () {
          // console.log(that.currentBaseAction);
          const currentSettings = that.baseActions[that.currentBaseAction];
          const currentAction = currentSettings ? currentSettings.action : null;
          const action = settings ? settings.action : null;

          that.prepareCrossFade(currentAction, action, 0.35);
        };

        that.crossFadeControls.push(folder1.add(that.panelSettings, name));
      }

      for (const name of Object.keys(that.additiveActions)) {
        const settings = that.additiveActions[name];

        that.panelSettings[name] = settings.weight;
        folder2
          .add(that.panelSettings, name, 0.0, 1.0, 0.01)
          .listen()
          .onChange(function (weight) {
            that.setWeight(settings.action, weight);
            settings.weight = weight;
          });
      }

      folder3
        .add(that.panelSettings, "modify time scale", 0.0, 1.5, 0.01)
        .onChange(that.modifyTimeScale);

      folder1.open();
      folder2.open();
      folder3.open();
      panel.close();

      that.crossFadeControls.forEach(function (control) {
        control.classList1 =
          control.domElement.parentElement.parentElement.classList;
        control.classList2 =
          control.domElement.previousElementSibling.classList;

        control.setInactive = function () {
          control.classList2.add("control-inactive");
        };

        control.setActive = function () {
          control.classList2.remove("control-inactive");
        };

        const settings = that.baseActions[control.property];

        if (!settings || !settings.weight) {
          control.setInactive();
        }
      });
    },
    activateAction(action) {
      const clip = action.getClip();
      const settings =
        this.baseActions[clip.name] || this.additiveActions[clip.name];
      this.setWeight(action, settings.weight);
      action.play();
    },
    modifyTimeScale(speed) {
      this.mixer.timeScale = speed;
    },
    prepareCrossFade(startAction, endAction, duration) {
      let that = this;
      // If the current action is 'idle', execute the crossfade immediately;
      // else wait until the current action has finished its current loop

      if (that.currentBaseAction === "walk" || !startAction || !endAction) {
        that.executeCrossFade(startAction, endAction, duration);
      } else {
        that.synchronizeCrossFade(startAction, endAction, duration);
      }

      // Update control colors

      if (endAction) {
        const clip = endAction.getClip();
        that.currentBaseAction = clip.name;
      } else {
        that.currentBaseAction = "None";
      }

      that.crossFadeControls.forEach(function (control) {
        const name = control.property;

        if (name === that.currentBaseAction) {
          control.setActive();
        } else {
          control.setInactive();
        }
      });
    },
    synchronizeCrossFade(startAction, endAction, duration) {
      let that = this;
      that.mixer.addEventListener("loop", onLoopFinished);

      function onLoopFinished(event) {
        if (event.action === startAction) {
          that.mixer.removeEventListener("loop", onLoopFinished);

          that.executeCrossFade(startAction, endAction, duration);
        }
      }
    },
    executeCrossFade(startAction, endAction, duration) {
      // Not only the start action, but also the end action must get a weight of 1 before fading
      // (concerning the start action this is already guaranteed in this place)

      if (endAction) {
        this.setWeight(endAction, 1);
        endAction.time = 0;

        if (startAction) {
          // Crossfade with warping

          startAction.crossFadeTo(endAction, duration, true);
        } else {
          // Fade in

          endAction.fadeIn(duration);
        }
      } else {
        // Fade out

        startAction.fadeOut(duration);
      }
    },
    setWeight(action, weight) {
      action.enabled = true;
      action.setEffectiveTimeScale(1);
      action.setEffectiveWeight(weight);
    },
    setRem() {
      var windowHeight = window.screen.height;
      // console.log(windowHeight);
      //1、获得设计稿尺寸
      let ulSize = windowHeight;
      //2、获得当前视口的宽度
      let winSize = document.documentElement.clientHeight;
      let rate = winSize / ulSize;
      return rate;
    },
    resizeEvent() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth / 2.5, window.innerHeight / 2.3);
      if (document.getElementsByClassName("main")[0]) {
        document.getElementsByClassName("main")[0].style.transform =
          "scaleX(" + this.setRem() + ") scaleY(" + this.setRem() * 1.2 + ") ";
      }
    },
    animate() {
      this.renderInterval = setInterval(() => {
        for (let i = 0; i !== this.numAnimations; ++i) {
          const action = this.allActions[i];
          const clip = action.getClip();
          const settings =
            this.baseActions[clip.name] || this.additiveActions[clip.name];
          settings.weight = action.getEffectiveWeight();
        }

        // Get the time elapsed since the last frame, used for mixer update

        const mixerUpdateDelta = this.clock.getDelta();

        // Update the animation mixer, the stats panel, and render this frame

        this.mixer.update(mixerUpdateDelta);

        this.stats.update();

        this.renderer.render(this.scene, this.camera);
        // this.renderer.setPixelRatio(window.devicePixelRatio);
      }, 20);
    },
  },
};
</script>

<style scope lang="less">
/* a {
  color: blue;
} */
.control-inactive {
  color: #888;
}
.dg.ac {
  position: absolute !important;
  z-index: 999 !important;
}
.main {
  position: absolute;
  top: 0.2rem;
  right: 8rem;
  padding: 0.05rem;
  z-index: 9;
  opacity: 0;
  // background: linear-gradient(180deg, #ffffff 0%, #f0faff 100%);
  // box-shadow: 0px 6px 16px 0px rgba(233, 233, 233, 0.5);
  // border-radius: 11px;
  // opacity: 0.8;
}
.close-button {
  background-color: #5e92d8 !important;
}
.dg li:not(.folder) {
  background: #f2fafe !important;
  border-bottom: 1px solid #2c2c2c;
  color: #a2d4fe !important;
}
.dg .slider {
  background-color: #d8efff !important;
}
input {
  background-color: #d8efff !important;
}
</style>
