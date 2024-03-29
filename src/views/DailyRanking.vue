<script setup lang="ts">
import { onMounted } from "vue";

import HeaderBar from "@/components/HeaderBar.vue";
import RankingCard from "@/components/RankingCard.vue";

import { sendProposed } from "@/services/api";

import { useStatisticsStore } from "@/stores/statistics";
import { useHistoryStore } from "@/stores/history";

const statisticsStore = useStatisticsStore();
const historyStore = useHistoryStore();

onMounted(() => {
  var now = new Date();
  var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  historyStore.date = utc;
});

const submit = async () => {
  if (!historyStore.currentState || !historyStore.currentState.ranking) return;
  const correctAnswer = await sendProposed({
    ranking: historyStore.currentState.ranking.choices,
    id: historyStore.currentState.ranking._id,
  });

  historyStore.updateState(correctAnswer);
  statisticsStore.updateStatistics(correctAnswer["score"]);
};
</script>

<template>
  <HeaderBar />
  <div class="px-4">
    <div
      v-if="historyStore.error"
      class="text-center text-2xl dark:text-gray-200"
    >
      Sorry, something went wrong...
    </div>
    <div v-else>
      <RankingCard
        v-if="historyStore.currentState.ranking"
        :ranking="historyStore.currentState.ranking"
        :has-hidden-values="
          !historyStore.currentState.submitted && historyStore.isDaily
        "
        :show-rank="
          !historyStore.isDaily || historyStore.currentState.submitted
        "
        :is-draggable="
          historyStore.isDaily && !historyStore.currentState.submitted
        "
        :correction="historyStore.currentState.correctPositions"
        @reorder="historyStore.reorder"
      ></RankingCard>
      <div
        v-if="historyStore.isDaily && !historyStore.currentState.submitted"
        class="my-8 flex justify-center"
      >
        <button
          @click="submit"
          class="borde rounded-md bg-indigo-500 px-6 py-3 font-bold text-gray-200 shadow-md transition duration-500 ease-out hover:bg-pink-500 hover:text-white hover:shadow-xl"
        >
          Submit
        </button>
      </div>
      <div
        v-if="historyStore.currentState.submitted"
        class="mt-8 mb-8 flex flex-col items-center justify-center space-y-8 text-xl text-gray-800"
      >
        <div class="flex justify-center dark:text-gray-200">
          <div>
            <p class="text-xl">
              Correctly positioned:
              <span class="font-bold"
                >{{ historyStore.currentState.score }} / 5</span
              >
            </p>
            <p class="mb-4 text-xl">
              Kendall-tau score:
              <span class="font-bold"
                >{{ historyStore.currentState.kendallScore }}%</span
              >
            </p>
          </div>
        </div>
        <div
          class="flex max-w-md flex-col items-center justify-center space-y-2 rounded-md bg-slate-200 px-4 py-4 font-light outline-dashed outline-2 outline-offset-2 outline-purple-500 md:flex-row md:space-x-4"
        >
          <div>You enjoyed the game ?</div>
          <div>
            <a href="https://ko-fi.com/R5R4FKZ2C" target="_blank"
              ><img
                height="36"
                style="border: 0px; height: 36px"
                src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
                border="0"
                alt="Buy Me a Coffee at ko-fi.com"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
