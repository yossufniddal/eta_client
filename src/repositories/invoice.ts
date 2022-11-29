import { serializeQuery } from './../utils/helpers';
import Api from '@/utils/axios/Api';
import post from "@/models/order"
import axios from 'axios'
const Http = Api.getInstance();

export const PostEtaInvoice = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5002/api/invoices/post' , payload)
        .then((d:any) => {
             resolve(d.data)
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

export const EtaInvoicesRecentList = (query:object) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`invoices/recent?${serializeQuery(query)}`)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const DashboardStoreStats = (query:object) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`dashboard/store?${serializeQuery(query)}`)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const DashboardStats = () :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`dashboard`)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const EtaInvoicesRecentReject = (id:string , payload : object) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.put(`invoices/recent/reject/${id}` , payload)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}



export const EtaInvoicesRecentView = (id : string) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`invoices/recent/${id}`)
        .then((d:any) => {
             resolve(d == null ? [] :d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}