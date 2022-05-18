import Api from '@/utils/axios/Api';
import post from "@/models/order"

const Http = Api.getInstance();

export const PostEtaInvoice = (id:number) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.post(`invoices/post/${id}`)
        .then((d:any) => {
             resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}
