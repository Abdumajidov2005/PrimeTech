export const setToken = (token)=>{
    window.localStorage.setItem("PrimeTech", token)
}

export const getToken = ()=>{
    return window.localStorage.getItem("PrimeTech")
}