<script lang="ts" setup>
import logo from "@/assets/images/logo.svg";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-slate-50 min-h-screen"
  >
    <div class="flex">
      <img :src="logo" alt="logo site" class="mb-6" />
      <span class="ml-2 font-bold text-xl">SiteName</span>
    </div>
    <slot />
  </div>
</template>
