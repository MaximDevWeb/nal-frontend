<script setup lang="ts">
import { useToastsStore } from "@/stores/toasts";
import ToastsItem from "@/components/ToastsItem.vue";

/**
 * This is the Toasts list component.
 */

const toastStore = useToastsStore();
</script>

<template>
  <div class="absolute top-4 right-4">
    <TransitionGroup name="toast-animate">
      <toasts-item
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :item="toast"
      />
    </TransitionGroup>
  </div>
</template>
