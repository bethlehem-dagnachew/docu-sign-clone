import "./assets/main.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";

import Vue3DraggableResizable from "vue3-draggable-resizable";
//default styles
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
const app = createApp(App);

app.use(router);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(Vue3DraggableResizable);

app.mount("#app");
