import {Temporal} from '@js-temporal/polyfill';
import {isUndefined} from "./untils";

const isEra = (d:any):boolean => d instanceof Era

interface EraConfig {
  date?:any
}

const era = function (date:any,c:object|undefined):Era{
  if(isEra(date)){
    return date.clone()
  }

  const cfg:EraConfig = typeof c === 'object' ? c : {}
  cfg.date = date

  return new Era(cfg)
}


const parseDate = (cfg:any)=>{
  const {date} = cfg

  if(isUndefined(date)) {
    console.log(Temporal.Now.instant())
    return Temporal.Now.instant()

  }
}

class Era {
  constructor(cfg:any) {
    this.parse(cfg)
  }

  parse(cfg:any){
    parseDate(cfg)
    // this.init()
  }

  clone(){

  }
}


const proto = Era.prototype

era.prototype = proto

era.isEra = isEra

export default era
