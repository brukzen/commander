import {createApp} from "vue";
import "./styles.css";
import App from "./App.vue";
import {connect} from "@vue/devtools";

if (process.env.NODE_ENV === 'development') {
    connect('http://localhost', 8098)
}

createApp(App).mount("#app");
