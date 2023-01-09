<script setup lang="ts">
import { computed, ref, watchEffect } from "#imports";
import _ from "lodash";

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "",
  },
  def: {
    type: String,
    default: "Выберите",
  },
  errors: {
    type: Array,
    default: [],
  },
  modelValue: {
    default: "",
  },
});

const error = ref("");
defineEmits(["update:modelValue"]);

const currentClass = computed(() => {
  if (error.value) {
    return "border-red-400 hover:border-red-400 focus:border-red-400";
  } else {
    return "border-slate-300 hover:border-slate-400 focus:border-indigo-600";
  }
});

watchEffect(() => {
  error.value = _.head(props.errors) as string;
});
</script>

<template>
  <div class="relative">
    <label v-if="label" class="block text-sm pl-2">
      {{ label }}
    </label>

    <span v-if="error" class="text-xs text-red-500 absolute top-0 right-0">
      {{ error }}
    </span>

    <select
      class="border rounded w-full py-2.5 px-3"
      :class="currentClass"
      @change="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    >
      <option value="">{{ def }}</option>
      <option :value="option.value" v-for="option in options">
        {{ option.label ?? option.value }}
      </option>
    </select>
  </div>
</template>
