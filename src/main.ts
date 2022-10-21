import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";

import "./assets/base.css";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
    audience: "https://sortle/api",
  })
);

app.mount("#app");
