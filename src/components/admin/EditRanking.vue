<script setup lang="ts">
import { fetchRankingById, updateRanking } from "@/services/api";
import { onMounted, ref, watch } from "vue";
import type { IRanking } from "@/types";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const ranking = ref<IRanking | null>(null);

const token = ref("");

onMounted(async () => {
  token.value = await authStore.getToken();
  ranking.value = await fetchRankingById(
    route.params.id as string,
    token.value
  );
});

watch(
  () => route.params.id,
  async (rankingID: any) => {
    if (rankingID)
      ranking.value = await fetchRankingById(rankingID, token.value);
  }
);

const update = async () => {
  if (ranking.value && ranking.value._id)
    updateRanking(ranking.value._id, ranking.value, token.value).then(() =>
      router.push("/admin/rankings")
    );
};
</script>

<template>
  <main class="px-8">
    <div
      v-if="ranking"
      class="container mx-auto max-w-5xl rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl md:bg-gradient-to-r"
    >
      <div class="mb-8">
        <p class="text-xl text-gray-200">
          Sort the following
          <input
            v-model="ranking.type"
            placeholder="peppers"
            class="w-32 rounded-sm text-gray-800"
          />
          by
          <input
            v-model="ranking.criterion"
            placeholder="spiciness"
            class="w-32 rounded-sm text-gray-800"
          />:
        </p>
      </div>
      <div
        class="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0"
      >
        <div class="md:w-1/12">
          <p class="text-right text-gray-200">
            <input
              v-model="ranking.left"
              placeholder="Mild"
              class="max-w-full rounded-sm text-center text-gray-800"
            />
          </p>
        </div>
        <div
          class="flex max-w-full flex-col justify-center space-y-4 md:w-10/12 md:flex-row md:space-y-0 md:space-x-4"
        >
          <div
            v-for="(item, i) in ranking.choices"
            :key="i"
            class="relative flex h-32 flex-col items-center justify-between rounded-xl bg-gray-200 p-2 text-center shadow-xl md:w-1/6"
          >
            <div class="w-full">
              <p>
                <textarea
                  v-model="item.name"
                  placeholder="Bell pepper"
                  class="h-12 max-h-20 max-w-full rounded-md bg-white text-gray-800"
                />
              </p>
            </div>
            <div class="w-full">
              <input
                v-model="item.value"
                placeholder="~1000 SHU"
                class="max-w-full rounded-sm text-gray-800"
              />
            </div>
          </div>
        </div>
        <div class="md:w-1/12">
          <p class="text-gray-200">
            <input
              v-model="ranking.right"
              placeholder="Hot"
              class="max-w-full rounded-sm text-center text-gray-800"
            />
          </p>
        </div>
      </div>
      <div class="mb-8 flex justify-center">
        <button
          @click="update"
          class="rounded-md border border-gray-200 px-6 py-3 font-bold text-gray-200 shadow-md transition duration-500 ease-out hover:bg-gray-200 hover:text-gray-800 hover:shadow-xl"
        >
          Update
        </button>
      </div>
    </div>
  </main>
</template>
