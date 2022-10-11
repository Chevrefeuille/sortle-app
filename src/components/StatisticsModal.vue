<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";
import { useModalsStore } from "@/stores/modals";
import { useStatisticsStore } from "@/stores/statistics";

const modalStore = useModalsStore();
const statisticsStore = useStatisticsStore();
</script>
<template>
  <ModalDialog
    :open="modalStore.statisticsOpened"
    @toggleModal="modalStore.toggleStatistics()"
  >
    <template v-slot:title>Statistics</template>
    <template v-slot:content
      ><p>
        Number of games played:
        <span class="font-bold">{{
          statisticsStore.statistics.numberPlayed
        }}</span>
      </p>
      <p>
        Current streak:
        <span class="font-bold">{{
          statisticsStore.statistics.currentStreak
        }}</span>
      </p>
      <p>
        Max streak:
        <span class="font-bold">{{
          statisticsStore.statistics.maxStreak
        }}</span>
      </p></template
    >
  </ModalDialog>
</template>
