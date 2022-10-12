import { createRouter, createWebHistory } from "vue-router";
import DailyRanking from "@/views/DailyRanking.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: DailyRanking,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPanel,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
