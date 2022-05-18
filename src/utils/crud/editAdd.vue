<template>
<div class="py-12">
  <v-container>
    <Form :form="d.form"/>
     <v-btn color="primary" class="submit-btn" @click.prevent="d.submit()">{{$t('submit')}}</v-btn>
            
  </v-container>
</div>
</template>
<script lang="ts">
import Form from '../form/components/Form.vue'
import EditAdd from './editAdd'
// import {snackBar} from '@/utils/Helpers'
export default {
 props:{
     d:{
         required: true,
         type:EditAdd
     }
 },
 components:{
     Form
 }
}
</script>
