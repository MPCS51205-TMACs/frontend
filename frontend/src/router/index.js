import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
