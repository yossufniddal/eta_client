<template>
<v-container>

    <v-card elevation="0">
        <v-card-title >
            <slot />
        </v-card-title>
        <v-card-text>
            <v-form :valid="form.valid" ref="appFrom" enctype='multipart/form-data'>
                <v-row>
                    <v-col cols="12">
                        <v-alert  border="bottom" color="pink darken-1" dark v-if="form.error"> {{form.error}}</v-alert>
                    </v-col>
                    <v-col :cols="input.field.cols" v-for="(input , index) in form.inputs" :key="index">
                        <component :is="input.field.generateInputHtml()" :initial="form.state[input.field.name]" v-model="form.state[input.field.name]" :input="input.field"></component>
                        <!-- <text-input v-model="form.state[input.field.name]" v-if="input.field.type=='number' || input.field.type=='password' || input.field.type=='text'" :input="input.field" :type="input.field.type"/>
                        <select-input  v-model="form.state[input.field.name]" v-if="input.field.type=='select'" :input="input.field"/>
                        <combo-input  v-model="form.state[input.field.name]" v-if="input.field.type=='combo'" :input="input.field"/>
                        <file-input  @change="fileChange(input.field)" :initial="form.state[input.field.name]" v-if="input.field.type=='file'" :input="input.field"/>
                        <date-input  v-model="form.state[input.field.name]" v-if="input.field.type=='date'" :input="input.field"/>
                        <switch-input @change="change(input.field)" :initial="form.state[input.field.name]" v-if="input.field.type=='switch'" :input="input.field"/> -->
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
import Vue from 'vue'
export default Vue.extend({
    props:{
        form:Form
    },
    watch:{
        "form.state": {
            handler() {
                // this.form.valid = false
                // let form =  this.form.state
                // form[input.name as keyof typeof form] = input.value
                    this.form.valid = this.form.validate()
                // if(this.form.validate()){
                //     // this.$emit('change' , input.value)
                // }
            },
            deep: true,
        },
    }
})
</script>