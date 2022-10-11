<script setup lang="ts">
import { drag, dragOptions } from "@/composables/draggables";
import { sendAnswer } from "@/services/api";

import draggable from "vuedraggable";

import { useState } from "@/composables/state";
import { useStatistics } from "@/composables/statistics";

import HeaderBar from "@/components/HeaderBar.vue";
import StatisticsModal from "@/components/StatisticsModal.vue";
import HowToPlayModal from "@/components/HowToPlayModal.vue";

const state = useState();
const statistics = useStatistics();

const submit = async () => {
  const check = await sendAnswer({
    ranking: state.value.ranking,
    id: state.value.rankingId,
  });
  state.value.correctPositions = check["correction"];
  state.value.score = check["score"];
  state.value.ranking = state.value.ranking.map((choice: any) => {
    const choiceData = check["ranking"].find((r: any) => r.name == choice.name);
    choice.value = choiceData.value;
    choice.rank = choiceData.rank;
    return choice;
  });
  state.value.submitted = true;

  // update statistics in localStorage
  const now = new Date();
  statistics.lastDayPlayed = now.toDateString();
  statistics.numberPlayed += 1;
  statistics.currentStreak += 1;
  if (statistics.currentStreak > statistics.maxStreak) {
    statistics.maxStreak += 1;
  }
  if (state.value.score) {
    statistics.scores[state.value.score] += 1;
  }
};
</script>

<template>
  <HeaderBar />
  <main class="px-4">
    <div
      v-if="state.rankingData"
      class="container mx-auto max-w-5xl rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl md:bg-gradient-to-r"
    >
      <div class="mb-8">
        <p class="text-xl text-gray-200">
          Sort the following
          <span class="font-extrabold text-gray-100">{{
            state.rankingData.type
          }}</span>
          by <span>{{ state.rankingData.criterion }}</span
          >:
        </p>
      </div>
      <div
        class="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="md:w-1/12">
          <p class="text-right text-gray-200">
            <span class="font-bold">{{ state.rankingData.left }}</span>
          </p>
        </div>
        <draggable
          v-model="state.ranking"
          item-key="id"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          :disabled="state.submitted"
          class="flex max-w-full flex-col justify-center space-y-4 md:w-10/12 md:flex-row md:space-y-0 md:space-x-4"
        >
          <template #item="{ element, index }">
            <div
              class="relative flex flex-col items-center justify-center rounded-xl bg-white p-2 text-center opacity-75 shadow-xl md:w-1/5"
              :class="{
                'cursor-move': !state.submitted,
                'cursor-auto': state.submitted,
              }"
            >
              <div
                v-if="state.submitted"
                class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white p-1 shadow-md"
                :class="{
                  'bg-red-500': !state.correctPositions[index],
                  'bg-green-500': state.correctPositions[index],
                }"
              >
                <div class="font-bold text-gray-100">
                  {{ element.rank + 1 }}
                </div>
              </div>
              <div>
                <p>
                  <span
                    class="text-xl font-semibold"
                    :class="{
                      'text-red-500':
                        state.submitted && !state.correctPositions[index],
                      'text-green-500 ':
                        state.submitted && state.correctPositions[index],
                      'text-gray-800': !state.submitted,
                    }"
                    >{{ element.name }}</span
                  >
                </p>
              </div>
              <div>
                <p
                  v-if="state.submitted"
                  class="align-bottom font-light text-gray-600"
                >
                  {{ element.value }}
                </p>
              </div>
            </div>
          </template>
        </draggable>
        <div class="md:w-1/12">
          <p class="text-gray-200">
            <span class="font-bold">{{ state.rankingData.right }}</span>
          </p>
        </div>
      </div>
      <div v-if="!state.submitted" class="mb-8 flex justify-center">
        <button
          @click="submit"
          class="rounded-md border border-gray-200 px-6 py-3 font-bold text-gray-200 shadow-md transition duration-500 ease-out hover:bg-gray-200 hover:text-gray-800 hover:shadow-xl"
        >
          Submit
        </button>
      </div>
      <div v-else class="flex justify-center text-xl text-gray-200">
        <div>
          <p class="mb-4 text-2xl">
            Your score: <span class="font-bold">{{ state.score }} / 5</span>
          </p>
        </div>
      </div>
    </div>
    <StatisticsModal />
    <HowToPlayModal />
  </main>
</template>
