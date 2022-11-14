import { useAuthenticationStore } from "@/stores/AuthStore";

export const newSignedInShortened = async (username, toShorten) => {
    const authStore = useAuthenticationStore()
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/shorten`, {
        method: 'POST',
        headers: {
            'authorization': authStore.genAuthenticationHeader(),
        },
        body: {
            username: username,
            toshorten: toShorten
        }
    });
    const jsonResponse = await response.json()
    if (response.status(400 || 404 || 500)) return ({ success: false });
    return ({ success: true, shortened: jsonResponse.shortened });
}

export const getShortened = async () => {
    const authStore = useAuthenticationStore()
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/shorten/${authStore.getUsername()}`, {
            method: 'GET',
            headers: {
                'authorization': authStore.genAuthenticationHeader()
            }
        })
        const jsonResponse = await response.json()
        if (response.status === 200) return ({success: true, shortened: jsonResponse.shortened});
    } catch (e) {
        return ({success: false})
    }
}