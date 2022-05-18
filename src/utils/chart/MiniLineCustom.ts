import { ChartImlementation } from './interface';
import { ChartItem, Chart } from 'chart.js'
import ChartUtil from './Chart'
export default class MiniLine extends ChartUtil {
    total: number = 180.256
    subtotal: string = "12 avg"
    constructor(chart: ChartImlementation) {
        super(chart)
    }


    public createChart(ctx: ChartItem) {
        const gredient = this.generateGradient(ctx as CanvasRenderingContext2D)
        const labels = this.labels;
        const data = {
            labels: labels,
            borderWidth: .1,
            datasets: [{
                borderWidth: 0,
                label: "",
                data: this.data,
                fill: true,
                pointBackgroundColor: '#fff',
                borderColor: this.borderColor,
                backgroundColor: gredient,
                tension: 2
            }]
        };
        new Chart(ctx, {
            type: "line",
            data,
            options: {
                spanGaps: true,
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        display: false,
                    },
                    x: {
                        beginAtZero: false,
                        display: false,
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    },


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