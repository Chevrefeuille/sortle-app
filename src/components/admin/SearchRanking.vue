<script setup lang="ts">
import { ref } from "vue";
import { debounce } from "lodash";
import type { IRanking } from "@/types";
import { searchRanking } from "@/services/api";
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import RankingCard from "@/components/RankingCard.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const inputQuery = ref("");
const loadingSearch = ref(false);
const rankings = ref<IRanking[]>([]);

const search = async () => {
  loadingSearch.value = true;
  const token = await authStore.getToken();
  rankings.value = await searchRanking(inputQuery.value, token);
  loadingSearch.value = false;
};

const debouncedSearch = debounce(search, 1000);
</script>

<template>
  <main class="px-8">
    <div class="mb-4 flex justify-center space-x-4 text-lg">
      <input
        @input="debouncedSearch()"
        placeholder="Search for a ranking"
        class="border border-slate-300 focus-visible:outline focus-visible:outline-slate-400"
        v-model="inputQuery"
      />
      <div>
        Found <span class="font-bold">{{ rankings.length }}</span> rankings.
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="flex items-center" v-for="(ranking, i) in rankings" :key="i">
        <RankingCard
          :ranking="ranking"
          :has-hidden-values="false"
          :is-draggable="false"
          :correction="null"
          :show-rank="true"
        ></RankingCard>
        <RouterLink :to="ranking._id ? `/admin/rankings/${ranking._id}` : '#'"
          ><PencilSquareIcon
            class="h-8 w-8 text-pink-500 transition duration-100 ease-in hover:text-pink-300"
        /></RouterLink>
      </div>
    </div>
  </main>
</template>
