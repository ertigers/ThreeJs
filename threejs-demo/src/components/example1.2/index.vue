<template>
  <div id="scene-container">
  </div>
</template>

<script>
import { World } from './index.js';

export default {
  props: {
    msg: String
  },
  mounted() {
    this.threeInit()
  },
  methods: {
    threeInit() {
      const container = document.querySelector('#scene-container');
      const model = new World(container);
      model.start();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scene-container {
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
