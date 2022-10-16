import { createRouter, createWebHistory } from "vue-router";
import DailyRanking from "@/views/DailyRanking.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import AddRanking from "@/components/admin/AddRanking.vue";
import EditRanking from "@/components/admin/EditRanking.vue";
import RankingsList from "@/components/admin/RankingsList.vue";
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
      children: [
        {
          path: "rankings",
          component: RankingsList,
        },
        {
          path: "add",
          component: AddRanking,
        },
        {
          path: "rankings/:id",
          component: EditRanking,
        },
      ],
    },
  ],
});

export default router;
