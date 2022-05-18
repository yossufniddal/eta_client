<template>
<v-card class="h-full">
  <v-card-title>
    {{$t(chart.label)}}
  </v-card-title>
  <v-card-text>
  <canvas ref="chart"/>
  </v-card-text>
</v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { ChartItem } from "chart.js";

export default Vue.extend({
  props: ['chart'],
  methods: {
    createChart() {
      const canvas =this.$refs.chart as HTMLCanvasElement;
      canvas.height = this.chart.height
      const ctx = canvas.getContext("2d") as ChartItem;
      this.chart.createChart(ctx);
    },
  },
  mounted() {
    this.chart.reset()
    this.chart.getData().then(() => {
      setTimeout(this.createChart, 300)
      
    })
  },
});
</script>