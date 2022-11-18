
export const doesUserExist = async (username) => {
    if (!username) return (null);
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/exists/${username}`, { method: "GET" });
    return response.status
}
export const authenticate = async (inputs, action) => {
    try {
         const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user${action === "authenticate" ? "/authenticate" : ""}`, {            method: "POST",
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

export const deleteAccount = async (username, token) => {
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/${username}`, { method: "DELETE", headers: { 'authorization': `Bearer ${token}` } })
    if (response.status === 200) return (true);
    return (false);
}

export const updatePassword = async (username, newPassword, token) => {
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user`, {
        method: "PUT", headers: { 'authorization': `Bearer ${token}` }, body: {
            password: newPassword
        }
    })
    return (response.status);
}