<script setup lang="ts">
import type { IRanking } from "@/types";
import { toRef } from "vue";
import { useDraggable } from "@/composables/draggables";
import draggable from "vuedraggable";

const props = defineProps<{
  ranking: IRanking;
  hasHiddenValues: boolean;
  isDraggable: boolean;
  correction: number[] | null;
}>();

const ranking = toRef(props, "ranking");

const { drag, dragOptions } = useDraggable();
</script>

<template>
  <div
    v-if="ranking"
    class="container mx-auto max-w-5xl rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl md:bg-gradient-to-r"
  >
    <div class="mb-8">
      <p class="text-xl text-gray-200">
        Sort the following
        <span class="font-extrabold text-gray-100">{{ ranking.type }}</span>
        by <span>{{ ranking.criterion }}</span
        >:
      </p>
    </div>
    <div
      class="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
    >
      <div class="md:w-1/12">
        <p class="text-right text-gray-200">
          <span class="font-bold">{{ ranking.left }}</span>
        </p>
      </div>
      <draggable
        v-model="ranking.choices"
        item-key="id"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        @change="$emit('reorder', ranking.choices)"
        :disabled="!isDraggable"
        class="flex max-w-full flex-col justify-center space-y-4 md:w-10/12 md:flex-row md:space-y-0 md:space-x-4"
      >
        <template #item="{ element, index }">
          <div
            class="relative flex flex-col items-center justify-center rounded-xl bg-white p-2 text-center opacity-75 shadow-xl md:w-1/5"
            :class="{
              'cursor-move': isDraggable,
              'cursor-auto': !isDraggable,
            }"
          >
            <div
              v-if="correction"
              class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white p-1 shadow-md"
              :class="{
                'bg-red-500': !correction[index],
                'bg-green-500': correction[index],
              }"
            >
              <div class="font-bold text-gray-100">
                {{ correction[index] + 1 }}
              </div>
            </div>
            <div>
              <p>
                <span
                  class="text-xl font-semibold"
                  :class="{
                    'text-red-500': correction && !correction[index],
                    'text-green-500 ': correction && correction[index],
                    'text-gray-800': !correction,
                  }"
                  >{{ element.name }}</span
                >
              </p>
            </div>
            <div>
              <p
                v-if="!hasHiddenValues"
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
          <span class="font-bold">{{ ranking.right }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
