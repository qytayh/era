import {Temporal} from '@js-temporal/polyfill';
import {isUndefined} from "./shared/untils";
import Constant from "./shared/constant";

interface EraConfig {
  date?:any
}


let L = 'en' // global locale

const isEra = (d:any):boolean => d instanceof Era

const era = function (date:any,c:object|undefined):Era{
  if(isEra(date)){
    return date.clone()
  }

  const cfg:EraConfig = typeof c === 'object' ? c : {}
  cfg.date = date

  return new Era(cfg)
}


const parseDate = (cfg:any):any =>{
  const {date} = cfg

  if(isUndefined(date)) {
    return Temporal.Now.zonedDateTimeISO()
  }
}

class Era {
  $d:any
  $y:number|undefined
  $M:number|undefined
  $D:number|undefined
  $W:number|undefined
  $H:number|undefined
  $m:number|undefined
  $s:number|undefined
  $ms:number|undefined

  constructor(cfg:any) {
    this.parse(cfg)
  }

  parse(cfg:any){
    this.$d = parseDate(cfg)
    this.init()
  }

  init(){
    const {$d} = this
    this.$y = $d.year
    this.$M = $d.month
    this.$D = $d.day
    this.$W = $d.dayOfWeek
    this.$H = $d.hour
    this.$m = $d.minute
    this.$s = $d.second
    this.$ms = $d.millisecond
  }

  unix() {
    return this.$d.epochSeconds
  }

  valueOf() {
    return this.$d.epochMilliseconds
  }

  isValid() {
    return !(this.$d.toString() === Constant.INVALID_DATE_STRING)
  }


  toDate(){
    return new Date(this.valueOf())
  }
}


const proto = Era.prototype

era.prototype = proto

era.isEra = isEra

export default era
