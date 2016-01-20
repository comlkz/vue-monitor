import * as url from './Url.js'
import qwest from 'qwest'
export function getMenu(){    
    return qwest.get(url.MENU,{user_id:'admin'},{cache: true })
	
}