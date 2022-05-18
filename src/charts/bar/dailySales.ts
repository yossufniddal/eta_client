import Bar from "@/utils/chart/Bar"
import  { ChartImlementation , ChartType } from './../../utils/chart/interface';


const chartData:ChartImlementation = {
    label: "daily_sales",
    borderColor:"#f00",
    url:"daily-sales?Year=2021&Month=6",
    xKey:'DocDay',
    yKey:'Totalamount',
    type:ChartType.Bar,
    height:200,
    backgroundColor:["rgba(54, 162, 235,1)" , "rgba(54, 162, 235,1)"]
} 
const chart = new Bar(chartData)
export default chart