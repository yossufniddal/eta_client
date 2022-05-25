<template>
<v-container>

    <v-card>
        <v-card-title >
            <slot name="title"/>
        </v-card-title>
        <v-card-text>
            <v-form :valid="form.valid" ref="appFrom" enctype='multipart/form-data'>
                <v-row>
                    <v-col cols="12">
                        <v-alert  border="bottom" color="pink darken-1" dark v-if="form.error"> {{form.error}}</v-alert>
                    </v-col>
                    <v-col :cols="input.field.cols" v-for="(input , index) in form.inputs" :key="index">
                        <text-input @input="change(input.field)" v-if="input.field.type=='password' || input.field.type=='text'" :input="input.field" :type="input.field.type"/>
                        <select-input  @change="change(input.field)" v-if="input.field.type=='select'" :input="input.field"/>
                        <combo-input  @change="change(input.field)" v-if="input.field.type=='combo'" :input="input.field"/>
                        <file-input  @change="fileChange(input.field)" v-if="input.field.type=='file'" :input="input.field"/>
                        <date-input  @change="change(input.field)" v-if="input.field.type=='date'" :input="input.field"/>
                        <switch-input  @change="change(input.field)" v-if="input.field.type=='switch'" :input="input.field"/>
                    </v-col>
                    <v-col cols="12" v-if="form.submit">
                        <v-btn  color="primary" class="app-btn" :loading="form.loading" @click.prevent="form.submitAction()">{{$t('submit')}}</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</v-container>

</template>

<script lang="ts">
import Form from '../Form'
import SelectInput from './Select.vue'
import TextInput from './Text.vue'
import ComboInput from './Combo.vue'
import SwitchInput from './Switch.vue'
import DateInput from './Date.vue'
import FileInput from './File.vue'
import Vue from 'vue'
import { InputInterface } from '../interface'
export default Vue.extend({
    components:{
        SelectInput ,
        FileInput,
        ComboInput,
        SwitchInput,
        DateInput,
        TextInput
    },
    props:{
        form:Form
    },
    methods:{
        // this method will be code when any input in the form changed
        change(input:InputInterface) {
            console.log(this.form.valid)
            this.form.valid = false
            let form =  this.form.state
            form[input.name as keyof typeof form] = input.val
            if(this.form.validate()){
                this.form.valid = true
                console.log(this.form.valid)
                this.$emit('change' , input.val)
            }
        },
        fileChange(val:any) {
            let form =  this.form.state
            form[val.key as keyof typeof form] = val.value
        }
    }
})
</script>