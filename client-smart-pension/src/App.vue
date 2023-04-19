<template>
  <div id="app">
    <div id="background">
      <p>安徽智慧养老数据服务平台</p>
      <nav class="midong">
        <a
          href="https://dr.huami.com/"
          target="_blank"
          data-hover="米动健康管理平台"
          >米动健康管理平台</a
        >
        <img src="../public/icon/midong.png" alt="" />
      </nav>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  #background {
    position: absolute;
    z-index: 999;
    width: 8.6rem;
    height: 1.3rem;
    background-image: url(../public/icon/BG_TITLE-NAME.png);
    background-size: 100% 100%;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    p {
      font-size: 0.6rem;
      font-family: PangMenZhengDao;
      color: #5779a5;
      line-height: 0.85rem;
      text-shadow: 0px 0px 0.1rem rgba(0, 0, 0, 0.2);
      padding-left: 0.3rem;
    }
    .midong {
      position: absolute;
      top: 0rem;
      right: -55vw;
      font-size: 0.3rem;
      // font-family: PangMenZhengDao;
      color: #a7d2ff;
      line-height: 0.85rem;
      text-shadow: 0px 0.016rem 0.01rem rgba(0, 0, 0, 0.2);
      img {
        position: absolute;
        height: 0.5rem;
        top: 0.16rem;
        left: -0.6rem;
      }

    }

    /* Effect 15: scale down, reveal */
    .midong a {
      color: #5f6368;
      font-weight: 700;
      text-shadow: none;
    }

    .midong a::before {
      color: #fff;
      content: attr(data-hover);
      position: absolute;
      -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
      -moz-transition: -moz-transform 0.3s, opacity 0.3s;
      transition: transform 0.3s, opacity 0.3s;
    }

    .midong a:hover::before,
    .midong a:focus::before {
      -webkit-transform: scale(0.9);
      -moz-transform: scale(0.9);
      transform: scale(0.9);
      opacity: 0;
    }
  }
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 88%,
    #aedcffd0 100%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

//样式
#nprogress .bar {
  width: 100vw !important;
  height: 100rem !important;
  background: #cfeaff !important; //自定义颜色
  box-shadow: transparent !important ;
}
#nprogress .bar::before {
  width: 100vw !important;
  background: transparent !important;
}
#nprogress .bar::after {
  height: 100rem !important;
  // background: transparent;
}
#nprogress .spinner {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  // width: 10rem !important;
  // height: 10rem !important;
}
</style>
