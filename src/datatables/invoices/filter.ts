import { FormInterface } from './../../utils/form/interface';
import Form from '@/utils/form/Form';
import {  convertToRequred , storeInput , activeFilterInput , fromDateInput , toDateInput } from '@/utils/form/inputs/InputStore'
import Input from '@/utils/form/inputs/Input';


const inputs: Input[] = [
  new Input(convertToRequred(storeInput)),
  new Input(activeFilterInput),
  new Input(fromDateInput),
  new Input(toDateInput)
]

const params :FormInterface = {
  inputs
}
const invoiceFilter = new Form(params)
export default invoiceFilter