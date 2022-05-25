type user  = {
    emp_name : string
    emp_password : string
    emp_code : number
    sec_level : number
    store_code : number
}


export type loginResponse  = {
    user : user,
    token : string
}


export type loginRequest  = {
    username:number,
    password:string
}


export default user 
