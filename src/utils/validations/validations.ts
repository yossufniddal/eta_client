
export const required = (val:string , msg:string = 'هذا الحقل مطلوب') => !!val || msg
export const name = (val:string , msg:string = 'لا بد من ان يكون الاسم ثلاثي') => (val && val.split(" ").length == 3 &&  val.split(" ")[2] != '') || msg
export const num = (val:string , msg:string = 'لابد ان يكون هذا الحقل رقم') => {
    if (!val){
        return true
    }
  
    if(isNaN(parseFloat(val))) return msg


    return true
}
export const email = (val:string , msg:string = 'تحقق من البريد الالكتروني') => {
    if (!val){
        return true
    }
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val))) return msg


    return true
}

export const updateUserValidation = {
    Name_ar :[
      (value:string) => required(value) ,
      (value:string) => name(value) ,
    ],
    Name :[
        (value:string) => required(value) ,
        (value:string) => name(value) ,
    ],
        Email :[
        (value:string) => email(value , "تحقق من البريد اللاكتروني")
    ],
    
    Phone :[
        (value:string) => required(value) ,
    ],

}

export const loginValidation = {
    Username :[
        (value:string) => required(value )
    ],
    
    Password :[
        (value:string) => required(value) ,
    ],

}
export const CreateUpdateConsultuntsValidation = {
    Name :[
        (value:string) => required(value)
    ],
    Title :[
        (value:string) => required(value)
    ],
    
    Skills :[
        (value:string) => required(value) ,
    ],
    
    
    Breif :[
        (value:string) => required(value) ,
    ],

}


export const CreateUpdateServiceValidation = {
    Name :[
        (value:string) => required(value)
    ],
    Icon :[
        (value:string) => required(value)
    ],
}


