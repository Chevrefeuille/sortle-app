<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDailyRanking, sendAnswer } from "@/services/api";
import draggable from "vuedraggable";
import { shuffle } from "lodash";
import { useStorage } from "@vueuse/core";

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

interface State {
  submitted: boolean;
  score: number | null;
  ranking: Choice[];
  rankingData: RankingData | null;
  correctPositions: number[];
}

interface Statistics {
  lastDayPlayed: Date | null;
  numberPlayed: number;
  currentStreak: number;
  maxStreak: number;
  scores: { [key: number]: number };
}

const drag = ref(false);
const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "bg-slate-500",
};

const statistics = useStorage("sortle-statistics", {
  lastDayPlayed: null,
  numberPlayed: 0,
  currentStreak: 0,
  maxStreak: 0,
  scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
} as Statistics);

const isYesterday = (date: Date | null) => {
  if (date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === date.toDateString()) {
      return true;
    }
  }
  return false;
};

if (isYesterday(statistics.value.lastDayPlayed)) {
  statistics.value.currentStreak = 0;
}

const state = useStorage("sortle-state", {
  submitted: false,
  score: null,
  ranking: [],
  rankingData: null,
  correctPositions: [],
} as State);

// const choices: Ref<Choice[]> = ref([]);
const rankingId = ref("");

onMounted(async () => {
  // fetch daily challenge
  if (!state.value.submitted) {
    const dailyRanking = await getDailyRanking();
    state.value.ranking = shuffle(
      dailyRanking["choices"].map((name: string, index: number) => {
        return { name: name, index: index };
      })
    );
    state.value.rankingData = {
      type: dailyRanking["type"],
      criterion: dailyRanking["criterion"],
      left: dailyRanking["left"],
      right: dailyRanking["right"],
    };
    rankingId.value = dailyRanking["id"];
  }
});

const submit = async () => {
  const check = await sendAnswer({
    ranking: state.value.ranking,
    id: rankingId.value,
  });
  state.value.correctPositions = check["correction"];
  state.value.score = check["score"];
  state.value.ranking = state.value.ranking.map((choice: any) => {
    const choiceData = check["ranking"].find((r: any) => r.name == choice.name);
    choice.value = choiceData.value;
    choice.rank = choiceData.rank;
    return choice;
  });
  state.value.submitted = true;

  // update statistics in localStorage
  statistics.value.numberPlayed += 1;
  statistics.value.currentStreak += 1;
  if (statistics.value.currentStreak > statistics.value.maxStreak) {
    statistics.value.maxStreak += 1;
  }
  if (state.value.score) {
    statistics.value.scores[state.value.score] += 1;
  }
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
      v-if="state.rankingData"
      class="container mx-auto max-w-5xl rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl md:bg-gradient-to-r"
    >
      <div class="mb-8">
        <p class="text-xl text-gray-200">
          Sort the following 5 {{ state.rankingData.type }} by
          <span class="font-bold">{{ state.rankingData.criterion }}</span
          >:
        </p>
      </div>
      <div
        class="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="md:w-1/12">
          <p class="text-right text-gray-200">
            <span class="font-bold">{{ state.rankingData.left }}</span>
          </p>
        </div>
        <draggable
          v-model="state.ranking"
          item-key="id"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          :disabled="state.submitted"
          class="flex max-w-full flex-col justify-center space-y-4 md:w-10/12 md:flex-row md:space-y-0 md:space-x-4"
        >
          <template #item="{ element, index }">
            <div
              class="relative flex items-center justify-center rounded-xl bg-white p-2 opacity-75 shadow-xl md:aspect-square md:w-1/5"
              :class="{
                'cursor-move': !state.submitted,
                'cursor-auto': state.submitted,
              }"
            >
              <div
                v-if="state.submitted"
                class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white p-1 shadow-md"
                :class="{
                  'bg-red-500': !state.correctPositions[index],
                  'bg-green-500': state.correctPositions[index],
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
                        'text-red-500':
                          state.submitted && !state.correctPositions[index],
                        'text-green-500 ':
                          state.submitted && state.correctPositions[index],
                        'text-gray-800': !state.submitted,
                      }"
                      >{{ element.name }}</span
                    >
                  </p>
                </div>
                <div>
                  <p
                    v-if="state.submitted"
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
            <span class="font-bold">{{ state.rankingData.right }}</span>
          </p>
        </div>
      </div>
      <div v-if="!state.submitted" class="mb-8 flex justify-center">
        <button
          @click="submit"
          class="rounded-md border border-gray-200 px-6 py-3 font-bold text-gray-200 shadow-md transition duration-500 ease-out hover:bg-gray-200 hover:text-gray-800 hover:shadow-xl"
        >
          Submit
        </button>
      </div>
      <div v-else class="flex justify-center text-xl text-gray-200">
        <div>
          <p class="mb-4 text-2xl">
            Your score: <span class="font-bold">{{ state.score }} / 5</span>
          </p>
          <p>
            Number of games played:
            <span class="font-bold">{{ statistics.numberPlayed }}</span>
          </p>
          <p>
            Current streak:
            <span class="font-bold">{{ statistics.currentStreak }}</span>
          </p>
          <p>
            Max streak:
            <span class="font-bold">{{ statistics.maxStreak }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
