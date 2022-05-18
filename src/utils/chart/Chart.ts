import { currency } from './../helpers';
import ChartInterface, { ChartType , ChartImlementation } from './interface';
import { ChartItem } from 'chart.js'
import Api from '../axios/Api';
const Http = Api.getInstance();
export default class ChartUtil implements ChartInterface {
    labels: string[] = []
    data: number[] = []
    label: string
    loading:boolean = true
    type: ChartType
    height: number = 300
    url: string
    total:number =0
    xKey: string
    yKey: string
    borderColor: string
    backgroundColor: string[]
    constructor(chart: ChartImlementation) {
        this.url = chart.url
        this.label = chart.label
        this.xKey = chart.xKey
        this.yKey = chart.yKey
        this.type = chart.type
        this.borderColor = chart.borderColor
        this.backgroundColor = chart.backgroundColor
        if (typeof chart.height != 'undefined') this.height = chart.height
    }
    public getData() {
        this.reset()
        return new Promise((resolve) => {
            Http.get<any[]>(this.url)
                .then((res) => {
                    const data = res as unknown as any[]
                    data.map((rec: any) => {
                        this.labels.push(rec[this.xKey])
                        this.data.push(rec[this.yKey])
                        this.total += rec[this.yKey]
                    })
                    resolve(data)
                }
            )
        })
    }
    protected generateGradient(ctx:CanvasRenderingContext2D) {
        const gradient = ctx.createLinearGradient(0,0, 200,0);
        gradient.addColorStop(0, this.backgroundColor[0]);
        gradient.addColorStop(1, this.backgroundColor[1]);

        return gradient
    }
    public reset() {
        this.data = []
        this.total = 0
        this.labels = []
        this.loading = false
    }
    public createChart(ctx: ChartItem) {
        // const labels = this.labels;
        // const data = {
        //     labels: labels,
        //     datasets: [{
        //         label: this.label,
        //         data:this.data,
        //         fill: true,
        //         borderColor: this.borderColor,
        //         backgroundColor: this.backgroundColor,
        //         tension: 0.1
        //     }]
        // };
        // new Chart(ctx, {
        //     type: "line",
        //     data,
        //     options: {
        //         scales: {
        //             y: {
        //                 beginAtZero: true,
        //             },
        //         },
        //     },
        // });
    }

}