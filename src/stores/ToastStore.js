import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useToastStore = defineStore('toast', () => {

    const error = ref(false);
    const msg = ref("");
    const visible = ref(false);

    const displayToast = () => {
        visible.value = !visible.value;
    }

    const setError = (errorMsg) => {
        error.value = true;
        msg.value = errorMsg;
        displayToast();
        setTimeout(() => displayToast(), 3000);
    }

    const setSuccess = (successMsg) => {
        error.value = false;
        msg.value = successMsg;
        displayToast();
        setTimeout(() => displayToast(), 3000);
    }
    const getMsg = () => {
        return (msg.value)
    }
    return ({
        setError,
        setSuccess,
        getMsg,
        visible,
        error
    })
});