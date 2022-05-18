import Bar from "@/utils/chart/Bar"
import  { ChartImlementation , ChartType } from './../../utils/chart/interface';


const chartData:ChartImlementation = {
    label: "daily_profit",
    borderColor:"#f00",
    xKey:'DocMonth',
    yKey:'Totalamount',
    url:"branches-profit?Year=2021&Month=06",
    type:ChartType.Bar,
    height:200,
    backgroundColor:["rgba(54, 162, 235,1)" , "rgba(54, 162, 235,1)"]
} 
const chart = new Bar(chartData)
export default chart