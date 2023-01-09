<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  title: "Категории",
});
</script>

<template>
  <div class="mt-6">
    <panel padding="small">
      <categories-nav />

      <table class="w-full mt-6">
        <thead class="border-y text-xs uppercase">
          <th class="py-2 font-semibold">#id</th>
          <th class="py-2 font-semibold">Название</th>
          <th class="py-2 font-semibold">Алиас</th>
          <th class="py-2 font-semibold">Родительская категория</th>
          <th class="py-2 font-semibold">Дата</th>
          <th class="py-2 font-semibold">Действия</th>
        </thead>
      </table>
    </panel>
  </div>
</template>
