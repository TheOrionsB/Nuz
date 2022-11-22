import { useAuthenticationStore } from "../stores/AuthStore";

const buildNewShortenedData = (formInputs) => {
    const shortenedSuffix = formInputs.src.value.split('/');
    return ({
        name: formInputs.name.value,
        source: shortenedSuffix[shortenedSuffix.length - 1],
        target: formInputs.target.value,
        passwordProtected: formInputs.password.value ? true : false,
        password: formInputs.password.value ? formInputs.password.value : null,
        isExpiringEnabled: formInputs.expirationDate && formInputs.expirationDate.value ? true : false,
        expiresAt: formInputs.expirationDate && formInputs.expirationDate.value ? new Date(formInputs.expirationDate.value) : null
    });
}

export const getNewShortened = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT }/shorten/new`, { method: 'GET'});
        const jsonResponse = await response.json();
        return ({success: true, shortened: `https://nuz.sh/${jsonResponse.shortened}`})
    } catch (e) {
        return ({success: false});
    }
}

export const newSignedInShortened = async (toShorten) => {
    const authStore = useAuthenticationStore();
    const toShortenFormatted = buildNewShortenedData(toShorten);
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT }/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': authStore.genAuthenticationHeader(),
            },
            body: JSON.stringify({
                username: authStore.getUsername(),
                toshorten: toShortenFormatted
            })
        });
        const jsonResponse = await response.json()
        if (response.status !== 200) return ({ success: false });
        return ({ success: true, shortened: jsonResponse.shortened });
    } catch (e) {
        return ({ success: false });
    }
}

export const deleteShortened = async (toDelete) => {
    const authStore = useAuthenticationStore();
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT }/${toDelete}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': authStore.genAuthenticationHeader()
            },
            body: JSON.stringify({
                username: authStore.getUsername()
            })
        });
        const jsonResponse = await response.json();
        if (response.status !== 200 || jsonResponse.success !== true) return ({success: false});
        return ({success: true});
    } catch (e) {
        console.log(e);
        return ({success: false})
    }
}

export const getShortened = async (mode) => {
    const authStore = useAuthenticationStore()
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT }/shorten/${authStore.getUsername()}${mode ? `/${mode}` : ''}?username=${authStore.getUsername()}`, {
            method: 'GET',
            headers: {
                'authorization': authStore.genAuthenticationHeader()
            }
        })
        const jsonResponse = await response.json()
        if (response.status === 200) return ({ success: true, shortened: jsonResponse.shortened });
    } catch (e) {
        return ({ success: false })
    }
}
export const getHitHistory = async () => {
    const authStore = useAuthenticationStore()
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT }/shorten/${authStore.getUsername()}/hithistory?username=${authStore.getUsername()}`, {
            method: 'GET',
            headers: {
                'authorization': authStore.genAuthenticationHeader()
            }
        })
        const jsonResponse = await response.json()
        if (response.status === 200) return ({ success: true, history: jsonResponse.history });
    } catch (e) {
        return ({ success: false })
    }
}