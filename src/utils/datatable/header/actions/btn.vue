

<script>
export default {
  name: "Button",
  props: ["type"],
  render(h) {
    h("div");
  },
};
</script>
<style scoped>
button.primary {
  background: blue;
  color: white;
}
</style>