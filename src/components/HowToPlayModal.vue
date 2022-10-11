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
    <template v-slot:title>Statistics</template>
    <template v-slot:content>Simple! </template>
  </ModalDialog>
</template>
