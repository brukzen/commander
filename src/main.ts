import {createApp} from "vue";
import {connect} from "@vue/devtools";
import "./styles.css";
import App from "./App.vue";

if (process.env.NODE_ENV === 'development') {
    connect('http://localhost', 8098)
}

createApp(App).mount("#app");
