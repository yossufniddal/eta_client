import  { ChartImlementation}from './interface';
import { ChartItem, Chart } from 'chart.js'
import ChartUtil from './Chart'
export default class MiiniBar extends ChartUtil {
    subtotal:string = "12 avg"
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
                maintainAspectRatio: false,  
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,
                        
                    },
                    x: {
                        beginAtZero: true,
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
    }

}