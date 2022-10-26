import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const { getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    if (token.value) {
      return token.value;
    } else {
      token.value = await getAccessTokenSilently();
      return token.value;
    }
  };

  return { getToken };
});
