<script setup lang="ts">
import { ref } from "vue";
import { useModalsStore } from "@/stores/modals";
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline";
import StatisticsModal from "@/components/StatisticsModal.vue";
import HowToPlayModal from "@/components/HowToPlayModal.vue";
import { shuffle } from "lodash";

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
</script>

<template>
  <header class="mb-8 flex h-16 items-center justify-center px-8">
    <div class="flex w-full max-w-xl items-center justify-between">
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
  </header>
  <StatisticsModal />
  <HowToPlayModal />
</template>
