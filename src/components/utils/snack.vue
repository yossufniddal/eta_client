<template>
    <div class="snackbar " :class="snack.Active ? `active ${snack.ClassName}` : `${snack.ClassName}`">
        <h2>{{$t(snack.Title)}}</h2>
        <p>{{$t(snack.Msg)}}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
export default Vue.extend({
    computed:{
        ...mapGetters({
            snack :'ui/snackBar',
        })
    },
    watch:{
        snack :{
            handler : function (val) {
                if(val.Active == true) {
                    setTimeout(() => this.$store.commit('ui/stopSnack'), 5000)
                }
            },
            deep:true
        }
    }
})
</script>
<style src="@/assets/scss/components/snack.css"></style>