import Form from '@/utils/form/Form';
import {  postedInput } from '@/utils/form/inputs/InputStore'
import Input from '@/utils/form/inputs/Input';


const inputs: Input[] = [
  new Input(postedInput)
]


const invoiceFilter = new Form(inputs, ()=>{})
export default invoiceFilter