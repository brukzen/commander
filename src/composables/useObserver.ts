import {ref} from "vue";

export function useObserver() {
    const subscribers = ref<Array<Function>>([]);

    function subscribe(subscriber: Function) {
        subscribers.value.push(subscriber);
    }

    function unsubscribe(subscriber: Function) {
        if (subscribers.value.includes(subscriber)) {
            subscribers.value.splice(subscribers.value.indexOf(subscriber), 1);
        }
    }

    function notify() {
        subscribers.value.forEach((cb) => cb());
    }

    return {
        subscribe,
        unsubscribe,
        notify,
    }
}