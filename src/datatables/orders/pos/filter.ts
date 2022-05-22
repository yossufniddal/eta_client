import { convertToRequred } from '@/utils/form/inputs/InputStore';
import Form from '@/utils/form/Form';
import {transSerialInput,  statusInput , storeInput , fromDate , toDate} from '@/utils/form/inputs/InputStore'
import Input from '@/utils/form/inputs/Input';


const inputs: Input[] = [
//   new  Input(convertToRequred(transSerialInput)),
  new Input(storeInput),
  new Input(statusInput),
  new Input(fromDate),
  new Input(toDate),
]


const invoiceFilter = new Form(inputs, ()=>{})
export default invoiceFilter