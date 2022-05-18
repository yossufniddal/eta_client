import { ChartImlementation } from './interface';
import { ChartItem, Chart } from 'chart.js'
import ChartUtil from './Chart'
import i18n from "../../i18n";
export default class Line extends ChartUtil {
    constructor(chart: ChartImlementation) {
        super(chart)
    }

    
    public createChart(ctx: ChartItem) {
        const gredient = this.generateGradient(ctx as  CanvasRenderingContext2D)
        const labels = this.labels;
        const data = {
            labels: labels,
            datasets: [{
                label: this.label,
                data: this.data,
                fill: true,
                borderColor: this.borderColor,
                backgroundColor: gredient,
                tension: 0.4
            }]
        };
        new Chart(ctx, {
            type: "line",
            data,
            options: {
                maintainAspectRatio: false,
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
        // this.createChart(ctx)



    }

}