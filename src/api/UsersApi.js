import { useAuthenticationStore } from "../stores/AuthStore";

export const doesUserExist = async (username) => {
    if (!username) return (null);
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/exists/${username}`, { method: "GET" });
    return response.status
}
export const authenticate = async (inputs, action) => {
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user${action === "authenticate" ? "/authenticate" : ""}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": inputs.username,
                "password": inputs.password
            }),
        })
        let jsonResponse = {};
        if (response.status === 200) {
            jsonResponse = await response.json();
            return ({ success: true, token: jsonResponse.token });
        }
        return ({ success: false });
    } catch (e) {
        console.log(e);
        return ({ success: false })
    }
}

export const deleteAccount = async () => {
    const authStore = useAuthenticationStore();
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/${authStore.getUsername()}?username=${authStore.getUsername()}`, {
        method: "DELETE",
        headers: { 'authorization': authStore.genAuthenticationHeader() }
    })
    if (response.status === 200) return (true);
    return (false);
}

export const getBasicInfo = async () => {
    const authStore = useAuthenticationStore();
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/${authStore.getUsername()}/basic?username=${authStore.getUsername()}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': authStore.genAuthenticationHeader()
        }
    })
    const jsonResponse = await response.json();
    if (response.status !== 200) return ({ success: false, data: null });
    return ({ success: true, data: jsonResponse.data });
}

export const updatePassword = async (oldPassword, newPassword) => {
    // console.log(oldPassword, newPassword);
    const authStore = useAuthenticationStore();
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/${authStore.getUsername()}`, {
        method: "PUT",
        headers: {
            'authorization': authStore.genAuthenticationHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: authStore.getUsername(),
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    })
    return (response.status);
}

export const getRecoveryKey = async (password) => {
    const authStore = useAuthenticationStore();
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/${authStore.getUsername()}/recoverykey/new?username=${authStore.getUsername()}`, {
            method: 'POST',
            headers: {
                'authorization': authStore.genAuthenticationHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                username: authStore.getUsername()
            })
        })
        const jsonResponse = await response.json();
        return ({ success: true, key: jsonResponse.key });
    } catch (e) {
        console.log(e)
        return ({ success: false })
    }
}