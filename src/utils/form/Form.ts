import i18n from '@/i18n';
import { FormInterface, InputInterface } from './interface';
import Input from './inputs/Input';


export default class Form implements FormInterface {
    inputs: Input[]
    loading: boolean = false
    error: string = ""
    public state: Object = {} as any
    valid: boolean = true
    hasSubmit: boolean = true
    hasValidation: boolean = false
    submit?: (form: any) => Promise<any>
    callBack?: (form: any) => any

    constructor(fromData: FormInterface) {
        this.inputs = fromData.inputs
        if (fromData.submit) this.submit = fromData.submit
        if (fromData.loading) this.loading = fromData.loading
        if (fromData.valid) this.valid = fromData.valid
        if (fromData.callBack) this.callBack = fromData.callBack
        this._initInputs()
    }

    public validate(): boolean {
        if (this.hasValidation == false) {
            return true
        }
        console.log(this.inputs.length)
        for (let index = 0; index < this.inputs.length; index++) {
            console.log(`this.hasValidation${index}`)
            const input = this.inputs[index];
            const state = this.state;
            const value =  state[input.field.name as keyof typeof state]
            const isInputEmpty = value == null || typeof value == 'undefined'
            console.log(state[input.field.name as keyof typeof state] == null)
            console.log("valid")
            console.log(isInputEmpty)
            console.log(value)
            
            console.log("valid")
            if (input.field.required == true && isInputEmpty) {
                return false
            }

        }
        return true
    }

    public submitAction() {
        this.loading = true
        if (!this.validate()) {
            this.error = i18n.t('required_validation_error').toString()
            this.loading = false
            return
        }
        this.submit!(this.state).then(res => {
            this._reset()
            this.valid = true
            if (this.callBack) {
                this.callBack(res)
            }
        }).catch((e => {
            this._reset()
            this.error = e
            this.error = i18n.t((e.response.data)).toString()
            if( typeof e.response !== 'undefined' || e.response.status === 400){
                this.valid = false
            }
    
        }))
    }

    // this function responsible for creating object of all inputs with key value to use it in submit or whatever
    // and if the input is select or combobox and needs to get the items from the server we get this from here too
    private _initInputs() {
        let state = {} as any
        this.inputs.forEach((input: Input) => {
            if (input.field.required) {
                this.valid = false
                this.hasValidation = true
            }
            state[input.field.name] = input.field.initial || ''
        })
        this.state = state
    }


    private _reset() {
        // this._initInputs()
        this.loading = false
    }
}