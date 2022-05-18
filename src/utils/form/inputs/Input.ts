import { serializeQuery } from '@/utils/helpers';
import { FormInterface, InputInterface, SelectInputInterface } from '../interface';
import Api from '@/utils/axios/Api';

const Http = Api.getInstance();
export default class Input {
    field: InputInterface
    loading: boolean = false
    constructor(field: InputInterface) {
        this.field = field
        this._init()
    }

    // this function responsible for creating object of all inputs with key value to use it in submit or whatever
    // and if the input is select or combobox and needs to get the items from the server we get this from here too
    private _init() {
        if (this.field.type == 'select' || this.field.type == 'combo') {
            const select = this.field as SelectInputInterface
            // check if the items is not initialized to set it to an empty array to avoid errors
            if (typeof select.items == 'undefined') {
                select.items = []
            }
            // initialFetch is simple flag to indicate that this input needs to load its data from the server
            if (select.initialFetch) this.getInputItems()
        }
    }


    // this function loads the data from the server to set select or combo items
    public getInputItems() {
        const field = this.field as  SelectInputInterface
        let url = `${field.url}`
        if (typeof field.payload != 'undefined') url += `?${serializeQuery(field.payload)}`
        return new Promise(() => {
            this.loading = true
            Http.get<any[]>(url)
                .then(res => {
                    field.items = res as unknown as any[]
                })
        })
    }
}