<script setup lang="ts">
import InputSelect from "~/components/InputSelect.vue";

const count = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
];

const data = {
  search: "",
  count: 10,
};
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      Показать по:
      <input-select :options="count" class="ml-2" />

      <button-link
        href="/dashboard/articles/categories/editor"
        contain
        class="ml-4"
      >
        Создать категорию
      </button-link>
    </div>

    <div>
      <input-text v-model="data.search" placeholder="Найти..." />
    </div>
  </div>
</template>
