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
  errors: {
    type: Array,
    default: [],
  },
  modelValue: {
    type: String,
  },
});

const id = ref("");
const type = ref("password");
const error = ref("");
const emit = defineEmits(["update:modelValue"]);

watchEffect(() => {
  error.value = _.head(props.errors) as string;
});

const inputHandler = (event: InputEvent) => {
  error.value = "";
  emit("update:modelValue", (event.target as HTMLInputElement)?.value);
};

const changeHandler = () => {
  type.value = type.value === "password" ? "text" : "password";
};

const currentClass = computed(() => {
  if (error.value) {
    return "border-red-400 hover:border-red-400 focus:border-red-400";
  } else {
    return "border-slate-300 hover:border-slate-400 focus:border-indigo-600";
  }
});

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

    <div
      class="text-slate-500 absolute right-2 bottom-3"
      @click="changeHandler"
    >
      <icon type="lock" v-if="type === 'password'"></icon>
      <icon type="unlock" v-else></icon>
    </div>

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
