
export const doesUserExist = async (username) => {
    console.log(process.env)
    if (!username) return (null);
    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/user/exists/${username}`, { method: "GET" });
    console.log(response.status)
    return response.status
}
export const authenticate = async (inputs, action) => {
    try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/user${action === "authenticate" ? "/authenticate" : ""}`, {
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
        return ({success: false});
    } catch (e) {
        return ({ success: false })
    }
}

export const getShortened = async (username, token) => {
    const response = await fetch(`http://${process.env.VUE_APP_API_ENDPOINT}/user/${username}`, { method: "GET", headers: { 'authorization': `Bearer ${token}` } });
    if (response.status === 200) return (response.data);
    return (null);
}

export const deleteAccount = async (username, token) => {
    const response = await fetch(`http://${process.env.VUE_APP_API_ENDPOINT}/user/${username}`, { method: "DELETE", headers: { 'authorization': `Bearer ${token}` } })
    if (response.status === 200) return (true);
    return (false);
}

export const updatePassword = async (username, newPassword, token) => {
    const response = await fetch(`http://${process.env.VUE_APP_API_ENDPOINT}/user`, {
        method: "PUT", headers: { 'authorization': `Bearer ${token}` }, body: {
            password: newPassword
        }
    })
    return (response.status);
}