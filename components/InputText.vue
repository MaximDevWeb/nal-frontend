<script setup lang="ts">
import { computed, onMounted, randString, ref, watchEffect } from "#imports";
import _ from "lodash";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    validator: (value: string) =>
      ["text", "email", "number", "tel", "url"].includes(value),
    default: "text",
  },
  errors: {
    type: Array,
    default: [],
  },
  modelValue: {
    type: String,
  },
});

const id = ref("");
const error = ref("");
const emit = defineEmits(["update:modelValue"]);

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

const inputHandler = (event: InputEvent) => {
  error.value = "";
  emit("update:modelValue", (event.target as HTMLInputElement)?.value);
};

onMounted(() => {
  id.value = randString();
});
</script>

<template>
  <div class="relative">
    <label :for="id" v-if="label" class="block text-sm pl-2">
      {{ label }}
    </label>

    <span v-if="error" class="text-xs text-red-500 absolute top-0 right-0">
      {{ error }}
    </span>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="border rounded py-2 px-3 w-full"
      :class="currentClass"
      :value="modelValue"
      @input="inputHandler"
    />
  </div>
</template>
