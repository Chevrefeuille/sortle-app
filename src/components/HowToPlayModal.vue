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
    </template>
  </ModalDialog>
</template>
