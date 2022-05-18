
export enum ChartType {
    Line,
    Bar,
    Pie,
  }
export type ChartImlementation = {
  url : string
  xKey: string
  yKey:string
  label : string
  type : ChartType
  height : number
  borderColor : string
  backgroundColor : string[]
}

export default interface ChartInterface {
    labels: string[]
    url:string,
    data: number[]
    label:string
    type:ChartType
    height?:number
    borderColor:string
    backgroundColor:string[]
    createChart?:Function
}


