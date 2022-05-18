import MiniBar from "@/utils/chart/MiniBar"
import  { ChartImlementation , ChartType } from '@/utils/chart/interface';


const chartData:ChartImlementation = {
    label: "daily_sales",
    borderColor:"#f00",
    url:"monthly-sales?Year=2021",
    xKey:'DocMonth',
    yKey:'Totalamount',
    type:ChartType.Bar,
    height:75,
    backgroundColor:["#94cac5" , "#94cac5"]
} 
const chart = new MiniBar(chartData)
export default chart