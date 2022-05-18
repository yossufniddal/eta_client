import MiniLineCustom from "@/utils/chart/MiniLineCustom"
import {ChartImlementation, ChartType } from '@/utils/chart/interface';



const chartData:ChartImlementation = {
    type:ChartType.Line,
    label: "gross_profit",
    xKey:'DocMonth',
    yKey:'Totalamount',
    height:75,
    url:"monthly-sales?Year=2021",
    borderColor:"#fff",
    backgroundColor:["#e9a5b8" , "#e9a5b8"]
} 
const chart = new MiniLineCustom(chartData)
export default chart