import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import less from "less";
import "@/assets/js/rem.js";
import "@/assets/css/common.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import "jquery";
import "jquery.nicescroll";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";


Vue.use(less);
Vue.use(ElementUI);

Vue.prototype.$echarts = window.echarts;
Vue.config.productionTip = false;
NProgress.inc(0.2);
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  // console.log(to);

  NProgress.start();
  // if (!sessionStorage.getItem("username")) {
  //   if (to.path !== "/login") {
  //     next("/login");
  //     NProgress.done();
  //   }
  // }

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了

  next();
});
router.afterEach((to) => {
  console.log(to);
  // 在即将进入新的页面组件前，关闭掉进度条
  if (to.name == "building") {
    setTimeout(NProgress.done, 500);
  } else if (to.name == "Community") {
    setTimeout(NProgress.done, 500);
  } else {
    NProgress.done();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
