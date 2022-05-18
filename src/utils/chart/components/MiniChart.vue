<template>
    <div class="mini-chart" :class="chart.label">
        <div class="wrapper">
            <div class="data">
                <span class="header">{{currency(chart.total)}}</span>
                <span class="sub-header">{{$t(chart.label)}}</span>
                <span class="small"></span>
            </div>
            <div class="actions">
               <v-icon>mdi-reload</v-icon>
            </div>
        </div>
            <div class="chart">
                <canvas ref="minichart"></canvas>
            </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { currency } from "@/utils/helpers";
import { ChartItem } from "chart.js";
export default Vue.extend({
    props:['chart'],
     methods: {
    createChart() {
      const canvas =this.$refs.minichart as HTMLCanvasElement;
      canvas.height = this.chart.height
      const ctx = canvas.getContext("2d") as ChartItem;
      this.chart.createChart(ctx);
    },
    currency
  },
  mounted() {
    this.chart.getData().then(() => {
      setTimeout(this.createChart, 300)
      
    })
  },
})
</script>
<style src="@/scss/components/partials/mini-chart.css"  rel="stylesheet" type="text/css" />
