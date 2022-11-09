<script setup lang="ts">
import ModalDialog from "@/components/modals/ModalDialog.vue";
import { useModalsStore } from "@/stores/modals";
import DemoRanking from "@/components/DemoRanking.vue";

const modalStore = useModalsStore();
</script>
<template>
  <ModalDialog
    :open="modalStore.howToPlayOpened"
    @toggleModal="modalStore.toggleHowToPlay()"
  >
    <template v-slot:title>How to play</template>
    <template v-slot:content
      ><p>
        Drag and drop the cards to order them according to the given criterion.
      </p>
      <p>A new ranking is available every day!</p>
      <br />
      <p>
        The displayed score corresponds to the number of cards in the correct
        position. However, this score does not always reflect how good the
        proposed ranking is. Consider these two rankings:
      </p>
      <DemoRanking :values="[5, 4, 2, 3, 1]" />
      <div class="text-center">and</div>
      <DemoRanking :values="[1, 4, 3, 2, 5]" />
      <p>
        Both rankings have two badly positioned cards, meaning a score of
        <span class="font-bold">2/5</span>. But, inverting the first and last
        card feels worse than inverting two cards in the middle, no?
      </p>
      <p>
        The
        <a
          class="font-bold text-purple-500 outline-none hover:text-purple-400"
          href="https://en.wikipedia.org/wiki/Kendall_tau_distance"
          >Kendall tau distance</a
        >
        is a measure of the accordance between two rankings that works by
        computing the number of incorrect pair rankings. In the first ranking,
        there is only one inconsistent pair order (<span class="text-pink-500"
          >3 &lt; 2</span
        >), leading to a <span class="font-bold">90%</span> score but in the
        second ranking, there are 7 (<span class="text-pink-500">5 &lt; 2</span
        >, <span class="text-pink-500">5 &lt; 3</span>,
        <span class="text-pink-500">5 &lt; 4</span>,
        <span class="text-pink-500">5 &lt; 1</span>,
        <span class="text-pink-500">2 &lt; 1</span>,
        <span class="text-pink-500">3 &lt; 1</span> and
        <span class="text-pink-500">4 &lt; 1</span>), corresponding to a
        <span class="font-bold">30%</span> score. You can think of it as the
        number of swaps of two elements required to order the list correctly
        (this is actually an existing sorting algorithm, the
        <a
          class="font-bold text-purple-500 outline-none hover:text-purple-400"
          href="https://en.wikipedia.org/wiki/Bubble_sort"
          >bubble sort</a
        >).
      </p>
    </template>
  </ModalDialog>
</template>
