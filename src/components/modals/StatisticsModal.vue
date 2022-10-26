<script setup lang="ts">
import ModalDialog from "@/components/modals/ModalDialog.vue";
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  backgroundColor: (ctx: any) => {
    const w = ctx.chart.width;
    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(100, 0, w, 0);
    gradient.addColorStop(0, "#6366f1");
    gradient.addColorStop(0.5, "#a855f7");
    gradient.addColorStop(1, "#ec4899");

    return gradient;
  },
  indexAxis: "y",
  borderRadius: 5,
  borderSkipped: false,
  scales: {
    y: {
      grid: { display: false, drawBorder: false },
      ticks: { font: { size: 14, weight: "500" } },
    },
    x: {
      display: false,
    },
  },
  plugins: {
    legend: false,
    tooltip: {
      callbacks: {
        title: () => "",
      },
    },
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
        :chart-data="statisticsStore.getBarValues"
        :chart-id="'start-chart'"
        :css-classes="'h-64'"
      />
    </template>
  </ModalDialog>
</template>
