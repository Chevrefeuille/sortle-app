<template>
  <main class="px-4">
    <div
      class="container mx-auto max-w-5xl rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl md:bg-gradient-to-r"
    >
      <div class="mb-8">
        <p class="text-xl text-gray-200">
          Sort the following
          <span class="font-extrabold text-gray-100"> XXXXXX </span>
          by <span> XXXXXX </span>:
        </p>
      </div>
      <div
        class="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="md:w-1/12">
          <p class="text-right text-gray-200">
            <span class="font-bold">XXXXXX</span>
          </p>
        </div>
        <div
          class="flex max-w-full flex-col justify-center space-y-4 md:w-10/12 md:flex-row md:space-y-0 md:space-x-4"
        >
          <div
            v-for="(item, i) in [1, 2, 3, 4, 5]"
            :key="i"
            class="relative flex flex-col items-center justify-center rounded-xl bg-white p-2 text-center opacity-75 shadow-xl md:w-1/5"
          >
            <div>
              <p>
                <span class="text-xl font-semibold">XXXXX</span>
              </p>
            </div>
            <div>
              <p class="align-bottom font-light text-gray-600">XXXXX</p>
            </div>
          </div>
        </div>
        <div class="md:w-1/12">
          <p class="text-gray-200">
            <span class="font-bold">XXXX</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
