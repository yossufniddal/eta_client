import MiniLine from "@/utils/chart/MiniLine"

import {ChartImlementation, ChartType } from '@/utils/chart/interface';



const chartData:ChartImlementation = {
    type:ChartType.Line,
    label: "todays_revenue",
    height:75,
    xKey:'DocMonth',
    yKey:'Totalamount',
    url:"monthly-sales?Year=2021",
    borderColor:"#fff",
    backgroundColor:["rgba(0, 61, 96, .5)" , "rgba(0, 110, 158 , .5)"]
} 
const chart = new MiniLine(chartData)
export default chart