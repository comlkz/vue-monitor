import * as Url from './Url.js'
import qwest from 'qwest'
export function getLogData(params){
	return qwest.get(Url.LOG_DATA,params,{ cache: true });
	
}
export function getSysProject(params){
	     return qwest.get(Url.SYS_DATA,params,{ cache: true });
}
