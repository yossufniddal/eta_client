import Api from '@/utils/axios/Api';
import post from "@/models/order"

const Http = Api.getInstance();

export const ConvertToEInvoice = (id:number) :Promise<post> => {
    return new Promise((resolve, reject) => {
        Http.post(`orders/convert/${id}`)
        .then((d:any) => {
             resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}
