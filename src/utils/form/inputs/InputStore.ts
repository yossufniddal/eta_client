import i18n from "@/i18n";
import Vue from "vue";
import DateInputComponent from "../components/Date.vue";
import TextInputComponent from "../components/Text.vue";

import SwitchInputComponent from "../components/Switch.vue";
import SelectInputComponent from "../components/Select.vue";
import ComboInputComponent from "../components/Combo.vue";
import { InputInterface } from "@/utils/form/interface";
import {
  TextInputInterface,
  SwitchInputInterface,
  DateInputInterface,
  SelectInputInterface,
} from "../interface";
import { required } from "@/utils/validations/validations";

export const fromDateInput: DateInputInterface = {
  name: "start_date",
  label: "from_date",
  limit: "date",
  min: "",
  max: "",
  type: "date",
  generateInputHtml: () => Vue.extend(DateInputComponent),
  cols: 6,
  value: "",
};

export const toDateInput: DateInputInterface = {
  name: "end_date",
  label: "to_date",
  limit: "date",
  min: "",
  max: "",
  type: "date",
  generateInputHtml: () => Vue.extend(DateInputComponent),
  cols: 6,
  value: "",
};

export const transSerialInput: SelectInputInterface = {
  name: "transSerial",
  cols: 6,
  text: "key",
  cache: true,
  generateInputHtml: () => Vue.extend(SelectInputComponent),
  initialFetch: false,
  clearable: false,
  valueKey: "value",
  type: "select",
  items: [
    {
      key: i18n.t("pos_order"),
      value: 25,
    },
    {
      key: i18n.t("sales_order"),
      value: 30,
    },
  ],
  icon: "mdi-format-list-numbered",
  label: "order_type",
};

export const storeInput: SelectInputInterface = {
  name: "store",
  cache: false,
  text: "store_name",
  cols: 6,
  initialFetch: true,
  generateInputHtml: () => Vue.extend(ComboInputComponent),
  clearable: true,
  valueKey: "store_code",
  type: "combo",
  url: "stores",
  icon: "mdi-store-settings-outline",
  label: "store",
};

export const featuredInput: SwitchInputInterface = {
  name: "Featured",
  label: "featured",
  generateInputHtml: () => Vue.extend(SwitchInputComponent),
  cols: 6,
  type: "switch",
  value: false,
};

export const finsihedInput: SwitchInputInterface = {
  name: "Finished",
  label: "finsihed",
  generateInputHtml: () => Vue.extend(SwitchInputComponent),
  cols: 6,
  type: "switch",
  initial:false,
  value: false,
};

export const deltedInput: SwitchInputInterface = {
  name: "Deleted",
  label: "delted",
  generateInputHtml: () => Vue.extend(SwitchInputComponent),
  cols: 6,
  type: "switch",
  value: false,
};

export const activeFilterInput: SelectInputInterface = {
  name: "posted",
  text: "key",
  cache: true,
  initialFetch: false,
  cols: 6,
  clearable: true,
  type: "select",
  generateInputHtml: () => Vue.extend(SelectInputComponent),
  items: [
    {
      key: i18n.t("active").toString(),
      value: "1",
    },
    {
      key: i18n.t("not_active"),
      value: "0",
    },
  ],
  icon: "mdi-lock-outline",
  label: "status",
  valueKey: "value",
};

export const usernameInput: TextInputInterface = {
  name: "username",
  icon: "",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [
    (value: string) => required(value),
    // (value:string) => email(value) ,
  ],
  label: "Email",
  cols: 12,
  type: "text",
  value: "",
};

export const rinInput: TextInputInterface = {
  name: "rin",
  icon: "",
  generateInputHtml: () => Vue.extend(TextInputComponent),

  label: "Rin",
  cols: 6,
  type: "text",
  value: "",
};

export const passwordInput: TextInputInterface = {
  name: "password",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  icon: "",
  rules: [(value: string) => required(value)],
  label: "Password",
  cols: 12,
  type: "password",
  value: "",
};

export const convertToRequred = (input: InputInterface) => {
  let req = { ...input };

  if (req.clearable) req.clearable = false;
  req.required = true;
  return req;
};
