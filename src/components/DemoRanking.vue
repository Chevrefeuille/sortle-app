<script setup lang="ts">
const props = defineProps<{ values: number[] }>();
</script>

<template>
  <div
    class="my-4 flex max-w-full flex-row items-center justify-center space-x-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4"
  >
    <div class="hidden text-right text-gray-200 md:block">Low</div>
    <div v-for="(val, i) in props.values" :key="i">
      <div
        class="relative flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-white p-2 text-center opacity-75 shadow-xl"
      >
        <div
          class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white p-1 text-xs shadow-md"
          :class="{
            'bg-red-500': val != 5 - i,
            'bg-green-500': val == 5 - i,
          }"
        >
          <div class="font-bold text-gray-100">
            {{ 5 - i }}
          </div>
        </div>
        <div>
          <p>
            <span
              class="text-xl font-semibold"
              :class="{
                'text-red-500': val != 5 - i,
                'text-green-500 ': val == 5 - i,
              }"
              >{{ val }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="hidden text-right text-gray-200 md:block">High</div>
  </div>
</template>
