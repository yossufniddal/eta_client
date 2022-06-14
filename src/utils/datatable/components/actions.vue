<template>
<td class="pa-4">
    <v-menu
      bottom
      
      offset-y
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="circle-btn"
          dark
          v-bind="attrs"
          prepen
          v-on="on"
        >
        <v-icon  class="mr-3 ml-3">mdi-dots-horizontal-circle-outline</v-icon>
          <!-- {{$t('actions')}} -->
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(action, i) in $attrs.actions"
          @click.prevent="action.method($attrs.item)" class="pointer"
          :key="i"
        >
          <v-list-item-title><v-icon class="mr-3 ml-3">{{action.icon}}</v-icon>{{ $t(action.title) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</td>
</template>

<script>
  export default {
    name :  'actions-td',
  }
</script>