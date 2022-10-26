<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import {
  PlusCircleIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <header class="mb-8 flex h-16 items-center justify-center">
    <div
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold text-transparent"
    >
      Admin panel
    </div>
  </header>
  <div class="flex">
    <div class="relative w-1/5 px-4">
      <nav
        class="sticky top-4 h-64 rounded-xl bg-indigo-500 p-4 text-xl font-bold text-gray-200 shadow-xl"
      >
        <ul class="flex flex-col space-y-2">
          <li>
            <RouterLink
              to="/admin/rankings/"
              class="transition duration-200 ease-in hover:text-white"
              ><div class="flex items-center space-x-2">
                <ListBulletIcon class="h-6 w-6" />
                <div>See rankings</div>
              </div></RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/admin/add"
              class="transition duration-200 ease-in hover:text-white"
              ><div class="flex items-center space-x-2">
                <PlusCircleIcon class="h-6 w-6" />
                <div>Add a new ranking</div>
              </div></RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/admin/search"
              class="transition duration-200 ease-in hover:text-white"
              ><div class="flex items-center space-x-2">
                <MagnifyingGlassIcon class="h-6 w-6" />
                <div>Search for rankings</div>
              </div></RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="w-4/5">
      <RouterView></RouterView>
    </div>
  </div>
</template>
