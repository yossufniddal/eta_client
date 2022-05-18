import Line from "@/utils/chart/Line"

import {ChartImlementation, ChartType } from './../../utils/chart/interface';



const chartData:ChartImlementation = {
    xKey:'DocMonth',
    yKey:'Totalamount',
    type:ChartType.Line,
    label: "monthly_sales",
    height:400,
    url:"monthly-sales?Year=2021",
    borderColor:"#3699ff",
    backgroundColor:["rgba(0, 61, 96, .5)" , "rgba(0, 110, 158 , .5)"]
} 
const chart = new Line(chartData)
export default chart