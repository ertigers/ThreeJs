<template>
  <div id="scene-container">
  </div>
</template>

<script>
import { World } from './World.js';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    this.worldInit()
  },
  methods: {
    async worldInit() {
        // Get a reference to the container element
        const container = document.querySelector('#scene-container');

        // create a new world
        const world = new World(container);

        // complete async tasks
        await world.init();

        // start the animation loop
        world.start();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
