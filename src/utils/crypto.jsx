export const crypto = (string) => {
    const tostring = JSON.stringify(string)
    const tob64 = btoa(tostring)
    return tob64
}

export const incrypto = (string) =>{
    const tostring = atob(string)    
    const toobject = JSON.parse(tostring)
    return toobject
}