<script setup lang="ts">
import { onMounted, randString } from "#imports";

defineProps({
  modelValue: {
    type: Boolean,
  },
});

const id = ref("");
defineEmits(["update:modelValue"]);

onMounted(() => {
  id.value = randString();
});
</script>

<template>
  <div class="checkbox flex">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <label :for="id">
      <icon type="check" class="checkbox__check" />
      <slot />
    </label>
  </div>
</template>
