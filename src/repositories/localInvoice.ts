import { serializeQuery } from '../utils/helpers';
import Api from '@/utils/axios/Api';
import post from "@/models/order"
const Http = Api.getInstance();

export const LocalInvoicesList = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`/invoices/local?${serializeQuery(payload)}` , )
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const LocalInvoiceItemsList = (serial: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`/invoices/local/items/${serial}` , )
        .then((d:any) => {
             resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const LocalInvoiceItemCreate = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.post(`/invoices/local/item` ,payload )
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const LocalInvoiceCreate = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.post(`/invoices/local` ,payload )
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const LocalInvoiceUpdate = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.put(`/invoices/local/items` ,payload)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const LocalInvoiceDelete = (serial: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.delete(`/invoices/local/items/${serial}`)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const LocalInvoiceDocNo = (payload: any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`/invoices/local/no?${serializeQuery(payload)}` )
        .then((d:any) => {
             resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const ItemsList = (store : any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get(`/items?store=${store}`)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const LocalInvoiceClose = (serial : any) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.put(`invoices/local/close/${serial}`)
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}

export const CustomersList = () :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get('/accounts?Type=1')
        .then((d:any) => {
             resolve(d == null ? [] : d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}


export const StoresList = () :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.get('/stores')
        .then((d:any) => {
             resolve(d == null ? [] : d)
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