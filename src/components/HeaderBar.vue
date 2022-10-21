<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useModalsStore } from "@/stores/modals";
import { useHistoryStore } from "@/stores/history";

import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline";
import StatisticsModal from "@/components/modals/StatisticsModal.vue";
import HowToPlayModal from "@/components/modals/HowToPlayModal.vue";
import { shuffle } from "lodash";

import Datepicker from "@vuepic/vue-datepicker";

const letters = ["S", "O", "R", "T", "L", "E"];

const translations = ref<number[]>([]);

const randomShuffle = () => {
  const values = letters.map((_, i) => i);
  const randomOrder = shuffle(values);
  translations.value = values.map((v) => {
    const newIndex = randomOrder.indexOf(v);
    return newIndex - v;
  });
};

const reset = () => {
  translations.value = translations.value.map(() => 0);
};

const modalStore = useModalsStore();

const historyStore = useHistoryStore();

const date = ref(new Date());
const minDate = computed(() => new Date(2022, 9, 18));
const maxDate = computed(() => new Date());

watch(date, async () => {
  historyStore.setDate(date.value);
  historyStore.getRankingFromDate(date.value);
});
</script>

<template>
  <header class="mb-8 flex h-32 flex-col items-center space-y-4 py-2 px-4">
    <div class="flex w-full items-center justify-center">
      <div class="flex w-full max-w-md items-center justify-between">
        <div class="flex space-x-2">
          <div class="cursor-pointer" @click="modalStore.toggleStatistics()">
            <ChartBarIcon
              class="h-6 w-8 text-indigo-500 transition duration-100 ease-in-out hover:text-indigo-300"
            />
          </div>
        </div>
        <div
          @mouseenter="randomShuffle"
          @mouseleave="reset"
          class="group flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center font-mono text-5xl font-bold text-transparent"
        >
          <div
            v-for="(letter, i) in letters"
            :key="i"
            class="w-8 transition duration-700 ease-in-out"
            :class="{
              'translate-x-0': translations[i] == 0,
              'translate-x-8': translations[i] == 1,
              'translate-x-16': translations[i] == 2,
              'translate-x-24': translations[i] == 3,
              'translate-x-32': translations[i] == 4,
              'translate-x-40': translations[i] == 5,
              '-translate-x-8': translations[i] == -1,
              '-translate-x-16': translations[i] == -2,
              '-translate-x-24': translations[i] == -3,
              '-translate-x-32': translations[i] == -4,
              '-translate-x-40': translations[i] == -5,
            }"
          >
            {{ letter }}
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="cursor-pointer" @click="modalStore.toggleHowToPlay()">
            <QuestionMarkCircleIcon
              class="h-6 w-8 text-pink-500 transition duration-100 ease-in-out hover:text-pink-300"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <Datepicker
        v-model="date"
        :minDate="minDate"
        :maxDate="maxDate"
        :enableTimePicker="false"
        :clearable="false"
        :auto-apply="true"
        preventMinMaxNavigation
      />
    </div>
  </header>

  <StatisticsModal />
  <HowToPlayModal />
</template>
