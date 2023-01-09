<script setup lang="ts">
import { definePageMeta, reactive, useRouter } from "#imports";
import ButtonBtn from "~/components/ButtonBtn.vue";
import http from "~/utils/http";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
  auth: false,
});

const authStore = useAuthStore();
const router = useRouter();

const data = reactive({
  email: "",
  password: "",
  remember: true,
});

const errors = ref({});
const load = ref(false);

const sendData = async () => {
  try {
    load.value = true;

    const response: any = await http.post("/auth/login", data);

    authStore.setToken(response.token);
    await router.push(authStore.url);
  } catch (e: any) {
    if (e.data) errors.value = e.data.errors;
  } finally {
    load.value = false;
  }
};
</script>

<template>
  <panel class="w-96">
    <h2 class="text-xl text-center">Вход на сайт</h2>
    <p class="text-slate-500 text-center mt-2 mb-4">
      Пожалуйста войдите на сайт чтобы продолжить
    </p>

    <div>
      <form>
        <input-text
          label="E-mail"
          placeholder="ivan@yandex.ru"
          :errors="errors.email || []"
          v-model="data.email"
        />

        <input-password
          label="Пароль"
          placeholder="GE45esd234fdd"
          class="mt-2"
          :errors="errors.password || []"
          v-model="data.password"
        />

        <div class="flex justify-between my-4">
          <input-chechbox v-model="data.remember"
            >Запомнить меня</input-chechbox
          >

          <NuxtLink to="/auth/forgot">Забыли пароль?</NuxtLink>
        </div>

        <button-btn :load="load" @click="sendData">Войти</button-btn>
      </form>

      <div class="flex justify-between my-4">
        <span>Впервые на сайте?</span>
        <NuxtLink to="/auth/registration">Создать аккаунт</NuxtLink>
      </div>
    </div>
  </panel>
</template>
