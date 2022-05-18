<template>
<div class="py-12">
  <v-container>
    <v-card>
      <EditAddComponent :d="d"/>
    </v-card>
  </v-container>
</div>
</template>
<script >
import EditAdd from '@/utils/crud/editAdd'
import details from '@/cruds/projects'
import EditAddComponent from '@/utils/crud/editAdd.vue'
export default {
  components:{
    EditAddComponent
  },
  computed:{
   d(){
     const d = new EditAdd(details)
     return d
   }
  },
}
</script>