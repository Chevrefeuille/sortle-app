<script setup lang="ts">
import { fetchRankings } from "@/services/api";
import { onMounted, ref } from "vue";
import type { IRanking } from "@/types";
import RankingCard from "@/components/RankingCard.vue";
import { UseOffsetPagination } from "@vueuse/components";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const rankings = ref<IRanking[]>([]);
const token = ref("");

const total = ref(0);
const pageSize = ref(4);

onMounted(async () => {
  fetchPageRankings({
    currentPage: 1,
    currentPageSize: pageSize.value,
  });
});

const fetchPageRankings = async ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number;
  currentPageSize: number;
}) => {
  const token = await authStore.getToken();
  fetchRankings(currentPage, currentPageSize, token).then((responseData) => {
    rankings.value = responseData.rankings;
    total.value = responseData.total;
  });
};
</script>

<template>
  <main class="px-8">
    <div class="mb-4 text-center text-lg">
      Found <span class="font-bold">{{ total }}</span> rankings.
    </div>

    <UseOffsetPagination
      v-if="total"
      v-slot="{ next, prev, isFirstPage, isLastPage }"
      :total="total"
      :page-size="pageSize"
      :page="1"
      @page-change="fetchPageRankings"
      @page-size-change="fetchPageRankings"
    >
      <div class="flex flex-col space-y-4">
        <div
          class="flex items-center"
          v-for="(ranking, i) in rankings"
          :key="i"
        >
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
      <div class="my-8 flex justify-center space-x-12">
        <button :disabled="isFirstPage" @click="prev">
          <ArrowLeftCircleIcon
            class="h-12 w-12 transition duration-100 ease-in"
            :class="{
              'text-indigo-500 hover:text-indigo-300': !isFirstPage,
              'text-gray-300 ': isFirstPage,
            }"
          />
        </button>
        <button :disabled="isLastPage" @click="next">
          <ArrowRightCircleIcon
            class="h-12 w-12 transition duration-100 ease-in"
            :class="{
              'text-pink-500 hover:text-pink-300': !isLastPage,
              'text-gray-300 ': isLastPage,
            }"
          />
        </button></div
    ></UseOffsetPagination>
  </main>
</template>
