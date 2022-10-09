<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { getDailyRanking, sendAnswer } from "@/services/api";
import draggable from "vuedraggable";
import { shuffle } from "lodash";
// import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";

interface Choice {
  name: string;
  index: number;
  value?: string;
  rank?: number;
}

interface RankingData {
  criterion: string;
  type: string;
  left: string;
  right: string;
}

const drag = ref(false);

const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "bg-slate-500",
};

const choices: Ref<Choice[]> = ref([]);
const rankingData: Ref<RankingData | null> = ref(null);
const loaded = ref(false);
const rankingId = ref("");

onMounted(async () => {
  const ranking = await getDailyRanking();
  choices.value = shuffle(
    ranking["choices"].map((name: string, index: number) => {
      return { name: name, index: index };
    })
  );
  rankingData.value = {
    type: ranking["type"],
    criterion: ranking["criterion"],
    left: ranking["left"],
    right: ranking["right"],
  };
  rankingId.value = ranking["id"];
  loaded.value = true;
});

const corrected = ref(false);
const correctness = ref([]);
const score = ref(0);
const submit = async () => {
  const check = await sendAnswer({
    ranking: choices.value,
    id: rankingId.value,
  });
  correctness.value = check["correction"];
  score.value = check["score"];
  choices.value = choices.value.map((choice: any) => {
    const choiceData = check["ranking"].find((r: any) => r.name == choice.name);
    choice.value = choiceData.value;
    choice.rank = choiceData.rank;
    return choice;
  });
  corrected.value = true;
};
</script>

<template>
  <header class="mb-8 flex h-16 items-center justify-center text-center">
    <div
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent"
    >
      SORTLE
    </div>
  </header>
  <main class="px-4">
    <div
      v-if="loaded && rankingData"
      class="container mx-auto max-w-5xl rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl md:bg-gradient-to-r"
    >
      <div class="mb-8">
        <p class="text-xl text-gray-200">
          Sort the following 5 {{ rankingData.type }} by
          <span class="font-bold">{{ rankingData.criterion }}</span
          >:
        </p>
      </div>
      <div
        class="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="md:w-1/12">
          <p class="text-gray-200">
            <span class="font-bold">{{ rankingData.left }}</span>
          </p>
        </div>
        <draggable
          v-model="choices"
          item-key="id"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          :disabled="corrected"
          class="flex max-w-full flex-col justify-center space-y-4 md:w-10/12 md:flex-row md:space-y-0 md:space-x-4"
        >
          <template #item="{ element, index }">
            <div
              class="relative flex cursor-move items-center justify-center rounded-xl bg-white p-2 opacity-75 shadow-xl md:aspect-square md:w-1/5"
            >
              <div
                v-if="corrected"
                class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white p-1 shadow-md"
                :class="{
                  'bg-red-500': !correctness[index],
                  'bg-green-500': correctness[index],
                }"
              >
                <div class="font-bold text-gray-100">
                  {{ element.rank + 1 }}
                </div>
              </div>
              <div class="flex h-full flex-col justify-between">
                <div>
                  <p>
                    <span
                      class="text-xl font-semibold"
                      :class="{
                        'text-red-500': corrected && !correctness[index],
                        'text-green-500 ': corrected && correctness[index],
                        'text-gray-800': !corrected,
                      }"
                      >{{ element.name }}</span
                    >
                  </p>
                </div>
                <div>
                  <p
                    v-if="corrected"
                    class="align-bottom font-light text-gray-600"
                  >
                    {{ element.value }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </draggable>
        <div class="md:w-1/12">
          <p class="text-gray-200">
            <span class="font-bold">{{ rankingData.right }}</span>
          </p>
        </div>
      </div>
      <div v-if="!corrected" class="mb-8 flex justify-center">
        <button
          @click="submit"
          class="rounded-md border border-gray-200 px-6 py-3 font-bold text-gray-200 shadow-md transition duration-500 ease-out hover:bg-gray-200 hover:text-gray-800 hover:shadow-xl"
        >
          Submit
        </button>
      </div>
      <div v-else class="text-center">
        <p class="text-xl text-gray-200">
          Your score: <span class="font-bold">{{ score }} / 5</span>
        </p>
      </div>
    </div>
  </main>
</template>
