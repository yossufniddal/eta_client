import { convertToRequred } from './../../utils/form/inputs/InputStore';
import Form from '@/utils/form/Form';
import {transSerialInput,  statusInput , storeInput } from '@/utils/form/inputs/InputStore'
import Input from '@/utils/form/inputs/Input';


const inputs: Input[] = [
  new  Input(convertToRequred(transSerialInput)),
  new Input(storeInput),
  new Input(statusInput),
]


const invoiceFilter = new Form(inputs, ()=>{})
export default invoiceFilter