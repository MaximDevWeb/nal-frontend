<script setup lang="ts">
import { useRoute, useRouter, watch } from "#imports";
import { useAuthStore } from "~/stores/auth";
import http from "~/utils/http";
import { useToastsStore } from "~/stores/toasts";
import { ToastType } from "~/types/toasts";

const route = useRoute();
const authStore = useAuthStore();
const toastsStore = useToastsStore();
const { push } = useRouter();

const title = ref("");

watchEffect(() => {
  title.value = route.meta.title as string;
});

const logOut = async () => {
  try {
    await http.get("/auth/logout");

    authStore.clearToken();
    await push(authStore.authUrl);
  } catch (e: any) {
    toastsStore.add("Что-то пошло не так", ToastType.danger);
  }
};
</script>

<template>
  <panel class="w-full flex justify-between" padding="small">
    {{ title }}

    <div>
      {{ authStore.user.email }}

      <a href="#" class="ml-2" @click.prevent="logOut">Выйти</a>
    </div>
  </panel>
</template>
