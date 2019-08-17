import Vue from "vue";
import Router from "vue-router";
import Posts from "./views/Posts.vue";
import Main from "./views/Main.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Create from "./views/Create.vue";
import Edit from "./views/Edit.vue";
import Page from "./views/Page.vue";
import Edp from "./views/Edp.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "main",
      redirect: "/posts",
      component: Main,
      children: [{
          path: "posts",
          name: "posts",
          component: Posts
        },
        {
          path: "create",
          name: "create",
          component: Create
        },
        {
          path: "editpassword",
          name: "edp",
          component: Edp
        },
        {
          path: "edit",
          name: "edit",
          component: Edit
        },
      ]
    },

    {
      path: '/page',
      name: "page",
      component: Page,
      redirect: "/page/login",
      children: [{
          path: "login",
          name: "login",
          component: Login
        },
        {
          path: "register",
          name: "register",
          component: Register
        },
      ]
    },


  ]
});

router.beforeEach((to, from, next) => {
  let logined = localStorage.getItem("app-logined");
  if (to.path == "/page/login") {
    next();
  } else if (to.path == "/page/register") {
    next();
  } else {
    logined ? next() : next("/page/login")
  }
});


export default router;