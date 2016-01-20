import * as Url from './Url.js'
import qwest from 'qwest'
export function getDeadMsg(params){
	 return qwest.get(Url.DEAD_MQ,params,{ cache: true });
	 
}