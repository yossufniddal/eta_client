
import Api from '@/utils/axios/Api';
const Http = Api.getInstance();
export const Upload = (payload:Object) => {
    return new Promise((resolve, reject) => {
        Http.post('upload' , payload , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
        .then((d) => {
            resolve(d)
        }).catch(e => {
            reject(e)
        })
    })
}




export const Delete = (payload:Object) => {
    return new Promise((resolve, reject) => {
        Http.post('upload' , payload , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
        .then((d) => {
            resolve(d)
        }).catch(e => {
            reject(e)
        })
    })
}

