import EditAddInterface  from './editAddInterface'
import Form from '../form/Form'
import Api from '../axios/Api';
const Http = Api.getInstance();
export default class EditAdd{ 
    title: string
    table: string
    form: Form
    id?: number
    loading: boolean = false
    error: boolean = false
    isEdit:boolean = false
    public constructor(details:EditAddInterface){
        details.form.submit = this.submit
        this.title = details.title
        this.table = details.table
        this.form = details.form
        this.id = details.id
        this.isEdit = this.id != null
        if(this.isEdit) this.find()
    }
    // find the record from the api
    public find() {
        return new Promise((resolve , reject) => {
            this.loading = true
            let url = `${this.table}/${this.id}`
            // use the axios base class to send the request to the server with generated url
            Http.get<any>(url)
            .then((res) =>  {
               // set the form state with the response to fillthe inputs
                this.form.state  = res
                this._reset()
                resolve(res)        
            }).catch(e => {
                this.loading = false
                this.error = true
                reject(e)
            })
          })
    }

    public submit() {
        const form = {...this.form.state}
        let formData = new FormData();
        for(let key in Object.keys(this.form.state)){
            formData.append(key,' form[key]');

        }

        if(this.isEdit) {
            Http.put(`${this.table}/editadd/${this.id}` , this.form.state).then(res => {
                console.log(res)
            })
        } else {
            Http.post(`${this.table}/editadd` , this.form.state).then(res => {
                console.log(res)
            })
        }
    }





    private _reset(){
        this.loading = false
        this.error = false
    }
}