import * as Url from './Url.js'
import qwest from 'qwest'
export function getErrorMsg(params){
	return qwest.get(Url.ERROR_MQ,params,{ cache: true });
}