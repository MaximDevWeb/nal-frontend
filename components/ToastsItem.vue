<script setup lang="ts">
import { Toast, ToastType } from "@/types/toasts";
import { onMounted, Ref } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { useToastsStore } from "@/stores/toasts";

/**
 * This is the Toast item component.
 */

const toastStore = useToastsStore();
let timeoutId: number = 0;

const props = defineProps<{
  /**
   * The item value for the toast.
   */
  item: Toast;
}>();

const toastClass: Ref<string> = computed(() => {
  switch (props.item.type) {
    case ToastType.success: {
      return "bg-green-500 text-white";
    }
    case ToastType.danger: {
      return "bg-red-400 text-white";
    }
    default: {
      return "bg-indigo-600 text-white";
    }
  }
});

/**
 * Handling the deletion event
 */
const remove = () => {
  clearTimeout(timeoutId);
  toastStore.remove(props.item.id);
};

onMounted(() => {
  /**
   * Automatic deletion of toast
   */
  timeoutId = window.setTimeout(() => {
    toastStore.remove(props.item.id);
  }, 10000);
});
</script>

<template>
  <div
    class="toast rounded-lg drop-shadow mb-2 py-2 pl-4 pr-8 w-80"
    :class="toastClass"
  >
    <div class="text-sm">{{ item.message }}</div>

    <icon
      type="close"
      @click="remove"
      class="absolute top-2.5 right-2 w-4 h-4"
    />
  </div>
</template>
