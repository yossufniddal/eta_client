import { loginRequest , loginResponse} from './../models/user';
import Api from '@/utils/axios/Api';
const Http = Api.getInstance();

export const Login = (payload:loginRequest) :Promise<loginResponse> => {
    return new Promise((resolve, reject) => {
        Http.post('login' , payload)
        .then((d:any) => {
            resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const Validate = () => {
    return new Promise((resolve, reject) => {
        Http.get('validate')
        .then((d:any) => {
            resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

