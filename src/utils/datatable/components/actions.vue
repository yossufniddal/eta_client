<template>
<td class="pa-4">
  <v-btn
          v-for="(action, i) in $attrs.actions"
          :key="i"
          @click.prevent="action.method($attrs.item)" 
          class="circle-btn"
          dark
         
        >
        <v-icon  class="mr-3 ml-3">mdi-dots-horizontal-circle-outline</v-icon>
        click
        </v-btn>
    
</td>
</template>

<script>
  export default {
    name :  'actions-td',
  }
</script>