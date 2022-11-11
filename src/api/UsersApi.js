const authenticate = async (inputs, action) => {
    const response = await fetch(`${process.env.API_ENDPOINT}/user/${action === "register" ? action : null}`, { method: "POST",
    body: {
        username: inputs.username,
            password: inputs.password
        }
    })
    if (response.status === 200) return (response.body.token);
    return (response.status)
}

const getShortened = async (username, token) => {
    const response = await fetch(`${process.env.API_ENDPOINT}/user/${username}`, {method: "GET", headers: {'authorization': `Bearer ${token}`}});
    if (response.status === 200) return (response.data);
    return (null);
}

const deleteAccount = async (username, token) => {
    const response = await fetch(`${process.env.API_ENDPOINT}/user/${username}`, {method: "DELETE", headers: {'authorization': `Bearer ${token}`}})
    if (response.status === 200) return (true);
    return (false);
}

const updatePassword = async (username, newPassword, token) => {
    const response = await fetch(`${process.env.API_ENDPOINT}/user`, {method: "PUT", headers: {'authorization': `Bearer ${token}`}, body: {
        password: newPassword
    }})
    return (response.status);
}

exports = {
    authenticate,
    getShortened,
    deleteAccount,
    updatePassword
}