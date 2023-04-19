<template>
  <div id="message">
    <!-- 我是子组件（可加插槽） -->
    <img src="/icon/Frm_Title.svg" alt="" class="imgs" />
    <p class="text">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="less">
#message {
  position: relative;
  // background-color: #050e1d9c;
  padding-left: 0.35rem;
  padding-right: 0.35rem;
  padding-top: 0.1rem;
  // transform: scale(0.95);
  // border-radius: 0.15rem;
  .imgs {
    position: absolute;
    width: 5rem;
    height: 0.32rem;
    top: 0.06rem;
    left: -0.4rem;
  }
  .text {
    position: relative;
    left: 0.35rem;
    font-size: 0.24rem;
    font-family: "PangMenZhengDao";
  }
}
</style>
