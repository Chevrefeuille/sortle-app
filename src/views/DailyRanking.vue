<script setup lang="ts">
import HeaderBar from "@/components/HeaderBar.vue";
import RankingCard from "@/components/RankingCard.vue";

import { sendAnswer } from "@/services/api";

import { useState } from "@/composables/state";
import { useStatistics } from "@/composables/statistics";
import type { IChoice } from "@/types";

const { state, updateState } = useState();
const { updateStatistics } = useStatistics();

const submit = async () => {
  if (!state.value.ranking) return;
  const rightAnswer = await sendAnswer({
    ranking: state.value.ranking.choices,
    id: state.value.ranking._id,
  });

  updateState(rightAnswer);
  updateStatistics(rightAnswer["score"]);
};

const reorder = (choices: IChoice[]) => {
  if (state.value.ranking) {
    state.value.ranking.choices = choices;
  }
};
</script>

<template>
  <HeaderBar />
  <div class="px-4">
    <RankingCard
      v-if="state.ranking"
      :ranking="state.ranking"
      :has-hidden-values="!state.submitted"
      :is-draggable="!state.submitted"
      :correction="state.correctPositions"
      @reorder="reorder"
    ></RankingCard>
    <div v-if="!state.submitted" class="my-8 flex justify-center">
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
          <span class="font-bold">{{ state.score }} / 5</span>
        </p>
        <p class="mb-4 text-xl">
          Kendall-tau score:
          <span class="font-bold">{{ state.kendallScore }}%</span>
        </p>
      </div>
    </div>
  </div>
</template>
