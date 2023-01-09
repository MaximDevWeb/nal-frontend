<script lang="ts" setup>
import { onMounted, useHead, useRoute, watch, watchEffect } from "#imports";
import { useAuthStore } from "~/stores/auth";
import http from "~/utils/http";

const authStore = useAuthStore();
const route = useRoute();

watchEffect(() => {
  useHead({
    title: `${route.meta.title} | Панель управления`,
  });
});

onMounted(async () => {
  const response: any = await http.get("/auth/user");
  authStore.setUser(response.user);
});
</script>

<template>
  <div class="bg-slate-50 py-4 min-h-screen">
    <div v-if="authStore.user">
      <div class="container mx-auto">
        <top-menu />

        <slot />
      </div>
    </div>
  </div>
</template>
