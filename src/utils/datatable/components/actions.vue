<script>
import Vue from "vue";

export default Vue.extend({
  
  render(createElement) {
    console.log(this.$props)
    return createElement('h1', `Hello ${this}`);
  }
})
</script>
