<script setup lang="ts">
import { computed, Ref } from "vue";
import sprite from "@/components/icon/sprite.svg";

/**
 * This is the icon output component.
 */

const props = defineProps({
  /**
   * The type for the icon.
   */
  type: {
    type: String,
    required: true,
  },
});

/**
 * Computed link address
 */
const link: Ref<string> = computed(() => sprite + "#" + props.type);
</script>

<template>
  <svg class="w-5 h-5 cursor-pointer">
    <use :xlink:href="link"></use>
  </svg>
</template>
