<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";
import { useModalsStore } from "@/stores/modals";

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
      <p>
        The displayed score corresponds to the number of cards in the correct
        position. However, this score does not always reflect how good the
        proposed ranking is. Consider these two rankings:
      </p>
      <div
        item-key="id"
        class="my-4 flex max-w-full flex-row items-center justify-center space-x-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4"
      >
        <div class="text-right text-gray-200">Low</div>
        <div v-for="(val, i) in [1, 3, 2, 4, 5]" :key="i">
          <div
            class="relative flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-white p-2 text-center opacity-75 shadow-xl"
          >
            <div
              class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white p-1 text-xs shadow-md"
              :class="{
                'bg-red-500': val != i + 1,
                'bg-green-500': val == i + 1,
              }"
            >
              <div class="font-bold text-gray-100">
                {{ i + 1 }}
              </div>
            </div>
            <div>
              <p>
                <span
                  class="text-xl font-semibold"
                  :class="{
                    'text-red-500': val != i + 1,
                    'text-green-500 ': val == i + 1,
                  }"
                  >{{ val }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <div class="text-right text-gray-200">High</div>
      </div>
      <div class="text-center">and</div>
      <div
        item-key="id"
        class="my-4 flex max-w-full flex-row items-center justify-center space-x-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4"
      >
        <div class="text-right text-gray-200">Low</div>
        <div v-for="(val, i) in [5, 2, 3, 4, 1]" :key="i">
          <div
            class="relative flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-white p-2 text-center opacity-75 shadow-xl"
          >
            <div
              class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white p-1 text-xs shadow-md"
              :class="{
                'bg-red-500': val != i + 1,
                'bg-green-500': val == i + 1,
              }"
            >
              <div class="font-bold text-gray-100">
                {{ i + 1 }}
              </div>
            </div>
            <div>
              <p>
                <span
                  class="text-xl font-semibold"
                  :class="{
                    'text-red-500': val != i + 1,
                    'text-green-500 ': val == i + 1,
                  }"
                  >{{ val }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <div class="text-right text-gray-200">High</div>
      </div>
      <p>
        Both rankings have two badly positioned cards, meaning a score of
        <span class="font-bold">2/5</span>. But, inverting the first and last
        card feels worse than inverting two cards in the middle, no?
      </p>
      <p>
        The
        <a
          class="font-bold outline-none hover:text-gray-500"
          href="https://en.wikipedia.org/wiki/Kendall_tau_distance"
          >Kendall tau distance</a
        >
        is a measure of the accordance between two rankings that works by
        computing the number of incorrect pair rankings. In the first ranking,
        there is only one inconsistent pair order (<span class="text-red-400"
          >3 &lt; 2</span
        >), leading to a <span class="font-bold">90%</span> score but in the
        second ranking, there are 7 (<span class="text-red-400">5 &lt; 2</span>,
        <span class="text-red-400">5 &lt; 3</span>,
        <span class="text-red-400">5 &lt; 4</span>,
        <span class="text-red-400">5 &lt; 1</span>,
        <span class="text-red-400">2 &lt; 1</span>,
        <span class="text-red-400">3 &lt; 1</span> and
        <span class="text-red-400">4 &lt; 1</span>), corresponding to a
        <span class="font-bold">30%</span> score.
      </p>
    </template>
  </ModalDialog>
</template>
