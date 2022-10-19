<script setup lang="ts">
import { onMounted } from "vue";

import HeaderBar from "@/components/HeaderBar.vue";
import RankingCard from "@/components/RankingCard.vue";

import { sendAnswer } from "@/services/api";

import { useStateStore } from "@/stores/state";
import { useStatisticsStore } from "@/stores/statistics";

const statisticsStore = useStatisticsStore();
const stateStore = useStateStore();

onMounted(() => {
  stateStore.fetchDaily();
});

const submit = async () => {
  if (!stateStore.state.ranking) return;
  const rightAnswer = await sendAnswer({
    ranking: stateStore.state.ranking.choices,
    id: stateStore.state.ranking._id,
  });

  stateStore.updateState(rightAnswer);
  statisticsStore.updateStatistics(rightAnswer["score"]);
};
</script>

<template>
  <HeaderBar />
  <div class="px-4">
    <div v-if="stateStore.error" class="text-center text-2xl">
      Sorry, something went wrong...
    </div>
    <div v-else>
      <RankingCard
        v-if="stateStore.state.ranking"
        :ranking="stateStore.state.ranking"
        :has-hidden-values="!stateStore.state.submitted"
        :is-draggable="!stateStore.state.submitted"
        :correction="stateStore.state.correctPositions"
        @reorder="stateStore.reorder"
      ></RankingCard>
      <div v-if="!stateStore.state.submitted" class="my-8 flex justify-center">
        <button
          @click="submit"
          class="borde rounded-md bg-indigo-500 px-6 py-3 font-bold text-gray-200 shadow-md transition duration-500 ease-out hover:bg-pink-500 hover:text-white hover:shadow-xl"
        >
          Submit
        </button>
      </div>
      <div v-else class="my-8 flex justify-center text-xl text-gray-800">
        <div>
          <p class="text-xl">
            Correctly positioned:
            <span class="font-bold">{{ stateStore.state.score }} / 5</span>
          </p>
          <p class="mb-4 text-xl">
            Kendall-tau score:
            <span class="font-bold">{{ stateStore.state.kendallScore }}%</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
