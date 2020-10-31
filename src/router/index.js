import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import StoreDefault from "@/views/StoreDefault.vue";
import StoreOneDBOneTable from "@/views/StoreOneDBOneTable.vue";
import StoreOneDBTwoTables from "@/views/StoreOneDBTwoTables.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/storedefault",
    name: "StoreDefault",
    component: StoreDefault,
  },
  {
    path: "/storeonedbonetable",
    name: "StoreOneDBOneTable",
    component: StoreOneDBOneTable,
  },
  {
    path: "/storeonedbtwotables",
    name: "StoreOneDBTwoTables",
    component: StoreOneDBTwoTables,
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