<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";
import { useModalsStore } from "@/stores/modals";
import { useStatisticsStore } from "@/stores/statistics";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const modalStore = useModalsStore();
const statisticsStore = useStatisticsStore();

const scores = [0, 1, 2, 3, 4, 5];
const chartData = {
  labels: scores,
  datasets: [{ data: scores.map((s) => statisticsStore.statistics.scores[s]) }],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  scales: {
    y: { grid: { display: false } },
    x: {
      display: false,
    },
  },
  plugins: {
    legend: false,
  },
} as any;
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
      </p>
      <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="'start-chart'"
        :css-classes="'h-64'"
      />
    </template>
  </ModalDialog>
</template>
