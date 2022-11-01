<template>
    <div class="count" >
      <v-icon>{{icon}}</v-icon>
      <div class="count-wrapper">
          <h4>{{title}}</h4>
          <h5>{{currency(count)}}</h5>
      </div>
    </div>
</template>

<script >
import {
  currency,
} from "@/utils/helpers";
import Vue from 'vue'
export default Vue.extend({
    props:['count' , 'title' , 'icon' , 'color'],
    methods:{
      currency
    }
})
</script>

<style>
.count{
  position: relative;
  display: flex;
  margin-bottom: 50px;
  background: var(--gradient);
  justify-content: flex-end;
  align-items: center;
  box-shadow:  0 20px 27px 0 rgba(0,0,0,.05);
  border-radius: 15px;
  padding: 20px;
}
.v-application--is-ltr .count{
  justify-content: flex-start;

}

.count i{
  position: absolute !important;
  top: 0;
  right: 20px;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.14),0 7px 10px -5px rgba(64,64,64,.4) !important;
  width: 64px;
  height: 64px;
  border-radius: 15px;
  color : #fff !important;
  transform: translate(0%,-25%);
  
}
.scale-hover:nth-child(1) .count i , .scale-hover:nth-child(5) .count i{
  background:linear-gradient(195deg,#42424a,#191919) ;
}
.scale-hover:nth-child(2) .count i , .scale-hover:nth-child(6) .count i{
  background:linear-gradient(195deg,#ec407a,#d81b60);
}
.scale-hover:nth-child(3) .count i , .scale-hover:nth-child(7) .count i{
  background:linear-gradient(195deg,#66bb6a,#43a047);
}
.scale-hover:nth-child(4) .count i , .scale-hover:nth-child(8) .count i{
  background:linear-gradient(195deg,#49a3f1,#1a73e8);
}
.count-wrapper h2{
  font-size: 24px;
  font-weight: 800;
  color: var(--text-color);
  margin-top: 10px;
  
  text-align: left;
}
</style>