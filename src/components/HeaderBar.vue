<script setup lang="ts">
import { ref, computed } from "vue";
import { useModalsStore } from "@/stores/modals";
import { useHistoryStore } from "@/stores/history";
import "@vuepic/vue-datepicker/dist/main.css";

import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
  CalendarDaysIcon,
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

const minDate = computed(() => new Date(2022, 9, 20));
const maxDate = computed(() => {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
});
</script>

<template>
  <header class="mb-8 flex w-full items-center justify-center py-2 px-4">
    <div class="flex w-full max-w-md items-center justify-between">
      <div class="flex space-x-2">
        <div class="cursor-pointer" @click="modalStore.toggleStatistics()">
          <ChartBarIcon
            class="h-6 w-8 text-indigo-500 transition duration-100 ease-in-out hover:text-indigo-300"
          />
        </div>
        <div class="cursor-pointer">
          <Datepicker
            v-model="historyStore.date"
            :minDate="minDate"
            :maxDate="maxDate"
            :enableTimePicker="false"
            :clearable="false"
            :auto-apply="true"
            :highlight="historyStore.getDatesPlayed"
            preventMinMaxNavigation
            ><template #trigger
              ><CalendarDaysIcon
                class="h-6 w-8 text-indigo-500 transition duration-100 ease-in-out hover:text-indigo-300" /></template
          ></Datepicker>
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

<style>
.dp__theme_light {
  --dp-primary-color: #a855f7;
  --dp-highlight-color: #d8b4fe;
}
@media only screen and (max-width: 600px) {
  .dp__arrow_top {
    display: none;
  }
}
</style>
