const loginUser = (user) =>{
    console.log('ACtion' , user);
    
    return { 
        type : "LOGIN_USER",
        user
    }
} 

export {
    loginUser
}