<script setup lang="ts">
import { definePageMeta, reactive, useRouter } from "#imports";
import ButtonBtn from "~/components/ButtonBtn.vue";
import { useToastsStore } from "~/stores/toasts";
import http from "~/utils/http";

definePageMeta({
  layout: "auth",
  auth: false,
});

const toastStore = useToastsStore();
const router = useRouter();

const data = reactive({
  email: "",
  password: "",
  password_repeat: "",
  accept: true,
});

const errors = ref({});
const load = ref(false);

const sendData = async () => {
  try {
    load.value = true;

    await http.post("/auth/create", data);

    toastStore.add("Регистрация завершена. Авторизуйтесь для продолжения!");
    await router.push("/auth");
  } catch (e: any) {
    if (e.data.errors) errors.value = e.data.errors;
  } finally {
    load.value = false;
  }
};
</script>

<template>
  <panel class="w-96">
    <h2 class="text-xl text-center">Регистрация на сайте</h2>
    <p class="text-slate-500 text-center mt-2 mb-4">
      Зарегистрируйтесь на сайте, чтобы получить доступ ко всем функциям
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

        <input-password
          label="Повторите пароль"
          placeholder="GE45esd234fdd"
          class="mt-2"
          :errors="errors.password_repeat || []"
          v-model="data.password_repeat"
        />

        <div class="flex justify-between my-4">
          <input-chechbox v-model="data.accept">
            Согласен с
            <NuxtLink to="#">правилами сайта</NuxtLink>
          </input-chechbox>
        </div>

        <button-btn :inactive="!data.accept" :load="load" @click="sendData">
          Зарегистрироваться
        </button-btn>
      </form>

      <div class="flex justify-between my-4">
        <span>Есть аккаунт?</span>
        <NuxtLink to="/auth">Авторизоваться</NuxtLink>
      </div>
    </div>
  </panel>
</template>
