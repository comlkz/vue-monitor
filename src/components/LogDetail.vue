<template>
   
	

		<div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">日志详情</strong>/<small><a v-link="{name:'log'}">返回</a> </small></div>
    </div>
    <div class="am-g">
	  <div class="am-u-sm-12">    
	    <table class="am-table am-table-striped am-table-hover table-main">
	       <tr>
		            <td width="10%">请求地址</td>
		            <td width="90%px">{{data.url}}</td>
	            </tr>
	            <tr>
		            <td >系统名称</td>
		            <td>{{data.systemName}}</td>
	            </tr>
	            <tr>
		            <td >客户端IP</td>
		            <td >{{data.clientIp}}</td>
	            </tr>
	            <tr>
		            <td >操作人</td>
		            <td >{{data.createUser}}({{data.userName}})</td>
	            </tr>
	             <tr>
		            <td >操作类型</td>
		            <td>{{data.operateType}}</td>
	            </tr>
	            <tr>
		            <td >操作时间</td>
		            <td >{{data.operateTime | date : 'yyyy-MM-dd HH:mm:ss'}}</td>
	            </tr>
	            <tr>
		            <td >执行时间</td>
		            <td >{{data.executeTime}}</td>
	            </tr>
	            <tr>
		            <td >操作类</td>
		            <td >{{data.operateClass}}</td>
	            </tr>
	            <tr>
		            <td >关键字</td>
		            <td >{{data.keyWord}}</td>
	            </tr>
	            <tr>
		            <td >附加属性</td>
		            <td ><p>{{data.attr}}</p></td>
	            </tr>
            	     
	    </table>
	     
    </div>
    </div>
</template>
<script>
import * as logDataService from '../services/LogDataService.js'
import { Promise } from 'es6-promise'
export default {
  route: {
    data ({to,next}) {
      var id = to.params.id;
      var tableName = to.query.tableName;
      var params={};
      params.tableName = tableName;
      logDataService.getLogDetail(id,params).then((xhr,response)=>{

        this.data = response 
      })
         
    }
  },
  data () {
   
    return {
      data:{}
    }
  }
 
}
</script>