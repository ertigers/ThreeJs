<template>
  <div id="scene-container">
  </div>
</template>

<script>
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
export default {
  mounted() {
    this.exampleInit()
  },
  methods: {
    exampleInit() {
      // 创建html容器
      const container = document.querySelector('#scene-container');

      // 创建场景
      const scene = new Scene();

      // 设置背景颜色
      scene.background = new Color('skyblue');

      // 创建相机 
      const fov = 35; // 视野：相机的视野有多宽，以度为单位。
      const aspect = container.clientWidth / container.clientHeight; // 纵横比：场景的宽度与高度的比率。
      const near = 0.1; // 近剪裁平面：任何比这更靠近相机的东西都是不可见的。
      const far = 100; // 远剪裁平面：任何比这更远离相机的东西都是不可见的。

      const camera = new PerspectiveCamera(fov, aspect, near, far);

      // 定位相机场景中心
      camera.position.set(0, 0, 10);

      // 几何体大小,默认是1*1*1的正方体  BoxBufferGeometry => BoxGeometry
      const geometry = new BoxGeometry(2, 2, 2);
      // 材质
      const material = new MeshBasicMaterial();
      // 创建材料
      const cube = new Mesh(geometry, material);

      // 添加到场景中
      scene.add(cube);

      // create the renderer
      const renderer = new WebGLRenderer();

      // next, set the renderer to the same size as our container element
      renderer.setSize(container.clientWidth, container.clientHeight);

      // finally, set the pixel ratio so that our scene will look good on HiDPI displays
      renderer.setPixelRatio(window.devicePixelRatio);

      // add the automatically created <canvas> element to the page
      container.append(renderer.domElement);

      // render, or 'create a still image', of the scene
      renderer.render(scene, camera);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
