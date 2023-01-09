<script setup lang="ts">
import { computed } from "#imports";
import loadWhite from "@/assets/images/load-white.svg";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validate: () => {
      return ["primary", "secondary", "success", "warning", "error"];
    },
  },
  href: {
    type: String,
    required: true,
  },
  contain: {
    type: Boolean,
    default: false,
  },
  inactive: {
    type: Boolean,
    default: false,
  },
  load: {
    type: Boolean,
    default: false,
  },
});

const btnClass = computed(() => {
  switch (props.type) {
    case "primary":
      return "text-white border-indigo-600 bg-indigo-600 hover:border-indigo-700 hover:bg-indigo-700";
    case "secondary":
      return "text-white border-gray-300 bg-gray-300 hover:border-gray-400 hover:bg-gray-400";
    case "success":
      return "text-white border-green-500 bg-green-500 hover:border-green-600 hover:bg-green-600";
    case "warning":
      return "text-white border-orange-400 bg-orange-400 hover:border-orange-500 hover:bg-orange-500";
    case "error":
      return "text-white border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500";
  }
});

const size = computed(() => (props.contain ? "" : " w-full"));

const inactiveClass = computed(() => {
  return props.inactive || props.load ? " opacity-50 pointer-events-none" : "";
});
</script>

<template>
  <RouterLink
    :to="href"
    class="block text-center hover:text-white border rounded transition select-none py-2 px-3"
    :class="btnClass + inactiveClass + size"
  >
    <span v-if="load" class="flex justify-center items-center">
      <img :src="loadWhite" alt="load" class="w-5 h-5 mr-2" />
      Обработка
    </span>

    <slot v-else />
  </RouterLink>
</template>
