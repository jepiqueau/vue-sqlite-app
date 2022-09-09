import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import DatabaseNoEncryption from "@/views/DatabaseNoEncryption.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/databasenoencryption",
    name: "DatabaseNoEncryption",
    component: DatabaseNoEncryption,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
