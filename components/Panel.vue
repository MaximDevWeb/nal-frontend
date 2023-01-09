<script setup lang="ts">
import { computed } from "#imports";

const props = defineProps({
  padding: {
    type: String,
    default: "",
  },
});

const padding = computed(() => {
  return props.padding === "small" ? "p-4" : "p-6";
});
</script>

<template>
  <div class="drop-shadow-lg rounded-lg bg-white" :class="padding">
    <slot />
  </div>
</template>
