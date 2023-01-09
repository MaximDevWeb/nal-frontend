import { defineStore } from "pinia";
import { Toast, ToastType } from "~/types/toasts";

export const useToastsStore = defineStore("toasts", {
  /**
   * State for Toasts Store
   *
   * @state toasts - array toast elements
   */
  state: () => ({
    toasts: [] as Array<Toast>,
  }),

  actions: {
    /**
     * The function add toast
     *
     * @param message - toast message
     * @param type - toast type
     */
    add(message: string, type: ToastType = ToastType.default): void {
      const toast = {
        id: randString(),
        type: type,
        message: message,
      };

      this.toasts.unshift(toast);
    },
    /**
     * The function remove toast by id
     *
     * @param id - toast id
     */
    remove(id: string): void {
      this.toasts = this.toasts.filter((toast: Toast) => toast.id !== id);
    },
  },
});
