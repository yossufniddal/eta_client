import Pie  from '@/utils/chart/Pie';
import { ChartImlementation , ChartType } from './../../utils/chart/interface';
import {generateColors} from '@/utils/helpers'

const chartData:ChartImlementation = {
    xKey:'ItemName',
    yKey:'TotalAmount',
    type:ChartType.Line,
    label: "top_sales_item",
    url:"top?date=2021-02",
    backgroundColor: generateColors(10),
    borderColor: "#1e90ff",
    height:300
} 
const chart = new Pie(chartData)
export default chart