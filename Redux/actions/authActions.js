const loginUser = (user) =>{
    return { 
        type : "LOGIN_USER",
        user
    }
} 

const logoutUser = () =>{
    return {
        type : 'LOGOUT_USER'
    }
} 

export {
    loginUser,
    logoutUser
}