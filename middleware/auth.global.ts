import { useAuthStore } from "~/stores/auth";
import { navigateTo } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (to.meta.auth !== false && !authStore.token) {
    authStore.url = to.fullPath;

    return navigateTo(authStore.authUrl);
  }

  if (authStore.token && authStore.authUrl === to.fullPath) {
    return navigateTo(authStore.url);
  }
});
