import MiniBar from "@/utils/chart/MiniBar"
import  { ChartImlementation , ChartType } from '@/utils/chart/interface';


const chartData:ChartImlementation = {
    label: "open_cashtray",
    borderColor:"#f00",
    url:"cashtray/open",
    xKey:'CompouterName',
    yKey:'TotalOrder',
    type:ChartType.Bar,
    height:75,
    backgroundColor:["#ffb97f" , "#ffb97f"]
} 
const chart = new MiniBar(chartData)
export default chart