import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/container.css";
import "./styles/pokemonTypes.css";
import "./styles/buttons.css";
import "./styles/pokemonStyles.css";
import "./styles/typography.css";
import "./styles/stats.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
