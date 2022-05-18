

// Userid     uint64
// CategoryId uint64
// CityId     uint64
// Img        string
// Imgs       string
// Logo       string
// Title      string
// Status     string
// Fund       float64
// Breif      string
// Location   string
// Phone      string
// File       string
// Email      string
// Website    string
// Instagram  string
// Twitter    string
import { InputInterface } from '@/utils/form/interface';
import { TextInputInterface , SwitchInputInterface , DateInputInterface , SelectInputInterface } from '../interface';
import {name , required , email, num} from "@/utils/validations/validations" 



// projects
export const breifInput:TextInputInterface =  {
  name:"Breif",
  icon: "",
  rules:[],
  label : "Breif",
  cols : 6,
  type : 'text',
  value:""
}

export const imgInput:TextInputInterface =  {
  name:"Img",
  icon: "",
  rules:[],
  label : "Img",
  cols : 6,
  type : 'file',
  value:""
}

export const fundInput:TextInputInterface =  {
  name:"Fund",
  icon: "",
  rules:[
      (value:string) => num(value),
  ],
  label : "Fund",
  cols : 6,
  type : 'text',
  value:""
}

export const titleInput:TextInputInterface =  {
  name:"Title",
  icon: "",
  rules:[
      (value:string) => required(value),
  ],
  label : "title",
  cols : 6,
  type : 'text',
  value:""
}

export const websiteInput:TextInputInterface =  {
  name:"Website",
  icon: "",
  rules:[
      (value:string) => required(value) ,
  ],
  label : "Website",
  cols : 6,
  type : 'text',
  value:""
}

export const instagramInput:TextInputInterface =  {
  name:"Instagram",
  icon: "",
  rules:[
      (value:string) => required(value) ,
  ],
  label : "Instagram",
  cols : 6,
  type : 'text',
  value:""
}

export const twitterInput:TextInputInterface =  {
  name:"Twitter",
  icon: "",
  rules:[
      (value:string) => required(value) ,
  ],
  label : "Twitter",
  cols : 6,
  type : 'text',
  value:""
}


export const categoryInput:SelectInputInterface =  {
  name:"CategoryId",
  cache : false,
  text : 'Name',
  initialFetch:true,
  clearable:false,
  value : 'Id',
  type : 'combo',
  url:'cats/project',
  icon : 'mdi-store-settings-outline',
  label : 'category'
}

export const searchInput:TextInputInterface =  {
    name : 'search',
    label : 'search',
    type: 'text',
    icon : 'mdi-magnify',
    cols : 6,
    value : '',
}


export const roleInput:SelectInputInterface =  {
    name:"Role_id",
    cache : false,
    text : 'Name',
    initialFetch:true,
    clearable:true,
    value : 'Id',
    type : 'select',
    url:'roles',
    icon : 'mdi-store-settings-outline',
    label : 'role'
}
export const featuredInput:SwitchInputInterface =  {
    name:"Featured",
    label : "featured",
    cols : 6,
    type : 'switch',
    val : false
}


export const postedInput:SwitchInputInterface =  {
  name:"posted",
  label : "posted",
  cols : 6,
  type : 'switch',
  val : false
}

export const nameArInput:TextInputInterface =  {
    name:"Name_ar",
    icon: "",
    rules:[
        (value:string) => required(value) ,
      (value:string) => name(value) ,
    ],
    required:true,
    label : "Name_ar",
    cols : 6,
    type : 'text',
    value:""
}
export const nameInput:TextInputInterface =  {
    name:"Name",
    icon: "",
    rules:[
        (value:string) => required(value) ,
      (value:string) => name(value) ,
    ],
    required:true,
    label : "Name",
    cols : 6,
    type : 'text',
    value:""
}
export const emailInput:TextInputInterface =  {
    name:"Email",
    icon: "",
    rules:[
        (value:string) => required(value) ,
      (value:string) => email(value) ,
    ],
    label : "Email",
    cols : 6,
    type : 'text',
    value:""
}



export const passwordInput:TextInputInterface =  {
    name:"Password",
    icon: "",
    rules:[
        (value:string) => required(value) ,
      (value:string) => name(value) ,
    ],
    label : "Password",
    cols : 6,
    type : 'password',
    value:""
}
export const phoneInput:TextInputInterface =  {
    name:"Phone",
    icon: "",
    rules:[
        (value:string) => required(value) ,
    ],
    label : "Phone",
    cols : 6,
    type : 'text',
    value:""
}







export const convertToRequred = (input:InputInterface) => {
    const req = {...input}
    req.required = true
    return req
}