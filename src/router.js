import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/movies",
    name: "movies",
    component: () => import("./components/List")
  },
  {
    path: "/movies/:id",
    name: "movies-details",
    component: () => import("./components/Edit")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/Add")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;