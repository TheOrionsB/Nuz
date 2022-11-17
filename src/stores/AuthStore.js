import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthenticationStore = defineStore('authentication', () => {
    const username = ref("");
    const token = ref("");
    const router = useRouter()

    /**
     * @private
     * Setters
     */
    const setUsername = (newUsername) => { username.value = newUsername }
    const setToken = (newToken) => { token.value = newToken; }

    /**
     * @private
     * Getter
     */
    const getToken = () => { return token.value; }

    /** @public
     * Getters
     */
    const getUsername = () => { return username.value }

    /**
     * @public
     * Methods
     */
    const retrieve = () => {
        console.log("retrieve the previous session")
    }

    const authenticateUser = (username, token) => {
        setUsername(username);
        setToken(token);
        return (true);
    }

    const genAuthenticationHeader = () => {
        return (`Bearer ${getToken()}`)
    }

    const logout = () => {
        setUsername("");
        setToken("");
        router.push({path: '/'});
    }

    return {
        authenticateUser,
        genAuthenticationHeader,
        logout,
        retrieve,
        getUsername,
        username
    }
})