import { serializeQuery } from './../utils/helpers';
import Api from '@/utils/axios/Api';
import post from "@/models/order"

const Http = Api.getInstance();

export const PostEtaInvoice = (id:number , store:number) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.post(`invoices/post/${id}/${store}`)
        .then((d:any) => {
             resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}




export const EtaInvoicesList = (query:object) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`invoices?${serializeQuery(query)}`)
        .then((d:any) => {
             resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}
