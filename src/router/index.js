import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../components/SearchResults.vue";
import SearchNotFound from "../components/SearchNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/found/:repo",
        component: SearchResults
      },
      {
        path: "/unknown",
        component: SearchNotFound
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
