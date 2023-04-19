import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import City from "../views/City.vue";
import Community from "../views/Community.vue";
import Ceshi from "../views/Ceshi.vue";
import AccessAuth from "../views/AccessAuth.vue";
import Test from "../views/Test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/City",
    name: "City",
    component: City,
  },
  {
    path: "/Community",
    name: "Community",
    component: Community,
  },
  {
    path: "/Ceshi",
    name: "Ceshi",
    component: Ceshi,
  },
  {
    path: "/AccessAuth",
    name: "AccessAuth",
    component: AccessAuth,
  },
  {
    path: "/test",
    component: Test,
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
