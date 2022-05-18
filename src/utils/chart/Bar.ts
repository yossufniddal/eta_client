import  { ChartImlementation}from './interface';
import { ChartItem, Chart } from 'chart.js'
import ChartUtil from './Chart'
import i18n from '@/i18n';
export default class Bar extends ChartUtil {
    constructor(chart: ChartImlementation) {
       super(chart)
    }
    public createChart(ctx: ChartItem) {
        const labels = this.labels;
        const data = {
            labels: labels,
            borderWidth: 1,
            datasets: [{
                label: this.label,
                data:this.data,
                fill: true,
                borderColor: this.borderColor,
                backgroundColor: this.backgroundColor,
                tension: 0.1
            }]
        };
        new Chart(ctx, {
            type: "bar",
            data,
            options: {
                locale: i18n.locale,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    datalabels: {
                       // hide datalabels for all datasets
                       display: false
                    }
                  }
            },
        });
    }

}