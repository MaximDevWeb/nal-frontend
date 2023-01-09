import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") ?? "",
    user: null,

    url: "/dashboard",
    authUrl: "/auth",
  }),

  actions: {
    setToken(token: string): void {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearToken() {
      this.token = "";
      localStorage.removeItem("token");
    },
    setUser(user: any) {
      this.user = user;
    },
  },
});
