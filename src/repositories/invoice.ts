import { serializeQuery } from './../utils/helpers';
import Api from '@/utils/axios/Api';
import post from "@/models/order"
import axios from 'axios'
const Http = Api.getInstance();

export const PostEtaInvoice = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.post('invoices/post' , payload)
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
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}
