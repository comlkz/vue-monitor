import * as Url from './Url.js'
import qwest from 'qwest'
export function getDeadMsg(params){
	 return qwest.get(Url.DEAD_MQ,params,{ cache: true });
	 
}

export function resetDeadMsg(params){
	return qwest.post(Url.RESET_DEAD_MQ,params,{cache: true})
}