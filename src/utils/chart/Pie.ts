import {ChartImlementation} from './interface';
import { ChartItem, Chart } from 'chart.js'
import ChartUtil from './Chart'
import i18n from '@/i18n';

import ChartDataLabels from 'chartjs-plugin-datalabels';
export default class Pie extends ChartUtil {
    constructor(chart: ChartImlementation) {
       super(chart)
    }
    public createChart(ctx: ChartItem) {
        const labels = this.labels;
        const data = {
            labels: labels,
            datasets: [{
                label: this.label,
                data:this.data,
                fill: true,
                borderColor: this.borderColor,
                backgroundColor: this.backgroundColor,
                hoverOffset: 4
            }]
        };
        Chart.register(ChartDataLabels)
        new Chart(ctx, {
            type: "doughnut",
            data,
            options: {
                maintainAspectRatio: false,
                locale: i18n.locale,
                plugins:{
                    datalabels: {
                        formatter: (value, categories) => {
                            let sum:number = 0;
                            let dataArr = categories.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                let d = data as number
                                sum += d;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        },
                        color: '#fff',
                    }
                }
            },
        });
    }

}