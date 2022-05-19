import Form from '@/utils/form/Form';
import {  statusInput } from '@/utils/form/inputs/InputStore'
import Input from '@/utils/form/inputs/Input';


const inputs: Input[] = [
  new Input(statusInput)
]


const invoiceFilter = new Form(inputs, ()=>{})
export default invoiceFilter