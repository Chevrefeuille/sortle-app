<script setup lang="ts">
import { fetchRankings } from "@/services/api";
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted, ref } from "vue";
import type { IRanking } from "@/types";
import RankingCard from "@/components/RankingCard.vue";
import { UseOffsetPagination } from "@vueuse/components";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/vue/24/outline";

const { getAccessTokenSilently } = useAuth0();

const rankings = ref<IRanking[]>([]);
const token = ref("");

const total = ref(0);
const pageSize = ref(4);

onMounted(async () => {
  token.value = await getAccessTokenSilently();
  fetchPageRankings({
    currentPage: 1,
    currentPageSize: pageSize.value,
  });
});

const fetchPageRankings = ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number;
  currentPageSize: number;
}) => {
  fetchRankings(currentPage, currentPageSize, token.value).then(
    (responseData) => {
      rankings.value = responseData.rankings;
      total.value = responseData.total;
    }
  );
};
</script>

<template>
  <main class="px-8">
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
        <RankingCard
          v-for="(ranking, i) in rankings"
          :key="i"
          :ranking="ranking"
          :has-hidden-values="false"
          :is-draggable="true"
          :correction="null"
        ></RankingCard>
      </div>
      <div class="my-8 flex justify-center space-x-12">
        <button :disabled="isFirstPage" @click="prev">
          <ArrowLeftCircleIcon class="h-12 w-12 text-indigo-500" />
        </button>
        <button :disabled="isLastPage" @click="next">
          <ArrowRightCircleIcon class="h-12 w-12 text-pink-500" />
        </button></div
    ></UseOffsetPagination>
  </main>
</template>
