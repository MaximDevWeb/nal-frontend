import { useAuthStore } from "~/stores/auth";
import { useRouter } from "#app";

const runtimeConfig = useRuntimeConfig();

export default class http {
  private baseUrl = runtimeConfig.public.apiBase;
  private instance;

  constructor() {
    const { token } = useAuthStore();

    this.instance = $fetch.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: token ? "Bearer " + token : "",
        Accept: "application/json",
      },
    });
  }

  public get() {
    return this.instance;
  }

  public static get(url: string) {
    const inst = new http().get();

    return inst(url, {
      method: "GET",
      onResponseError: ({ response }) => {
        http.apiError(response);
      },
    });
  }

  public static post(url: string, data: any) {
    const inst = new http().get();

    return inst(url, {
      method: "POST",
      body: data,
      onResponseError: ({ response }) => {
        http.apiError(response);
      },
    });
  }

  public static put(url: string, data: any) {
    const inst = new http().get();

    return inst(url, {
      method: "PUT",
      body: data,
      onResponseError: ({ response }) => {
        http.apiError(response);
      },
    });
  }

  private static async apiError(response: Response) {
    const authStore = useAuthStore();
    const router = useRouter();

    if (response.status === 401) {
      authStore.clearToken();
      await router.push(authStore.authUrl);
    }
  }
}
