import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/inbox",
      name: "inbox",
      component: () => import("../views/Inbox.vue"),
    },
    {
      path: "/addDocument",
      name: "AddDocument",
      component: () => import("../views/AddDocument.vue"),
    },
    {
      path: "/view-pdf/:index",
      name: "view-pdf",
      component: () => import("../views/ViewPdf.vue"),
    },
    {
      path: "/draw-signature",
      name: "draw-signature",
      component: () => import("../components/DrawSignature.vue"),
    },
  ],
});

export default router;
