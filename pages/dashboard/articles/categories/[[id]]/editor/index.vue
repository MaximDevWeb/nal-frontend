<script setup lang="ts">
import {
  definePageMeta,
  reactive,
  translate,
  useRoute,
  useRouter,
  watchEffect,
} from "#imports";
import http from "~/utils/http";

definePageMeta({
  title: "Редактор категории",
});

const router = useRouter();
const route = useRoute();

const categories = ref([] as Array<{}>);
const errors = ref({});
const load = ref(false);

const data = reactive({
  name: "",
  alias: "",
  category: "",
});

watchEffect(async () => {
  const response: any = await http.get("/auth/article/category");
  response.categories.forEach((category: any) => {
    categories.value.push({
      value: category.id,
      label: category.name,
    });
  });
});

watchEffect(async () => {
  if (!route.params.id) return;

  const response: any = await http.get(
    "/auth/article/category/" + route.params.id
  );

  data.name = response.category.name;
  data.alias = response.category.alias;
  data.category = response.category.category_id;
});

const sendData = async () => {
  try {
    load.value = true;

    let response: any;

    if (route.params.id) {
      response = await http.put(
        "/auth/article/category/" + route.params.id,
        data
      );
    } else {
      response = await http.post("/auth/article/category", data);
    }

    await router.push(
      `/dashboard/articles/categories/${response.category_id}/editor`
    );
  } catch (e: any) {
    if (e.data) errors.value = e.data.errors;
  } finally {
    load.value = false;
  }
};

const nameHandler = () => {
  data.alias = translate(data.name);
};
</script>

<template>
  <div class="mt-6">
    <panel padding="small">
      <form class="grid grid-cols-5 gap-4 items-end">
        <div>
          <input-text
            v-model="data.name"
            placeholder="Название категории"
            label="Название категории"
            :errors="errors.name || []"
            @input="nameHandler"
          />
        </div>
        <div>
          <input-text
            v-model="data.alias"
            placeholder="Алиас категории"
            label="Алиас категории"
            :errors="errors.alias || []"
          />
        </div>
        <div>
          <input-select
            :options="categories"
            class="w-full"
            label="Родительская категория"
            v-model="data.category"
          />
        </div>
        <div>
          <button-btn @click="sendData">
            {{ route.params.id ? "Обновить" : "Создать" }}
          </button-btn>
        </div>
        <div>
          <button-link type="secondary" href="/dashboard/articles/categories">
            Назад
          </button-link>
        </div>
      </form>
    </panel>
  </div>
</template>
