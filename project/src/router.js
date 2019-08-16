import Vue from "vue";
import Router from "vue-router";
import Posts from "./views/Posts.vue";
import Create from "./views/Create.vue";
import Edit from "./views/Edit.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/posts",
      name: "posts",
      component: Posts
    },
    {
      path: "/posts/create",
      name: "create",
      component: Create
    },
    {
      path: "/posts/edit",
      name: "edit",
      component: Edit
    },
    {
      path: "*",
      redirect: "/posts"
    }
  ]
});
