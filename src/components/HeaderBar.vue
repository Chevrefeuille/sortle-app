<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
  Cog8ToothIcon,
  BackwardIcon,
} from "@heroicons/vue/24/outline";
import StatisticsModal from "@/components/StatisticsModal.vue";
import HowToPlayModal from "@/components/HowToPlayModal.vue";

const modalStore = useModalsStore();
</script>

<template>
  <header class="mb-8 flex h-16 items-center justify-center px-8">
    <div class="flex w-full max-w-xl justify-between">
      <div class="flex space-x-2">
        <div class="cursor-pointer" @click="modalStore.toggleStatistics()">
          <ChartBarIcon class="h-6 w-6 text-indigo-500" />
        </div>
      </div>
      <div
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold text-transparent"
      >
        SORTLE
      </div>
      <div class="flex space-x-2">
        <div class="cursor-pointer" @click="modalStore.toggleHowToPlay()">
          <QuestionMarkCircleIcon class="h-6 w-6 text-pink-500" />
        </div>
      </div>
    </div>
  </header>
  <StatisticsModal />
  <HowToPlayModal />
</template>
