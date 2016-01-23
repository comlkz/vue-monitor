<template>
    {{params|json}}
	<div class="row section">
	    <div class="row">
			<a v-link="{name:'log'}">返回</a>
		</div>
		
		<div class="row">
			<div class="col  offset-s4 s8 "><h4 class="header">记录日志详情</h4></div>
		</div>
		<div class="row">
		    
	    <table class="table bordered striped responsive-table centered">
	       <tr>
		            <td width="150px">请求地址</td>
		            <td width="200px"><p style=" max-width: 100%;word-break: keep-all;">{{data.url}}</p></td>
	            </tr>
	            <tr>
		            <td width="150px">系统名称</td>
		            <td width="200px">{{data.systemName}}</td>
	            </tr>
	            <tr>
		            <td width="150px">客户端IP</td>
		            <td width="200px">{{data.clientIp}}</td>
	            </tr>
	            <tr>
		            <td width="150px">操作人</td>
		            <td width="200px">{{data.createUser}}({{data.userName}})</td>
	            </tr>
	             <tr>
		            <td width="150px">操作类型</td>
		            <td width="200px">{{data.operateType}}</td>
	            </tr>
	            <tr>
		            <td width="150px">操作时间</td>
		            <td width="200px">{{data.operateTime | date : 'yyyy-MM-dd HH:mm:ss'}}</td>
	            </tr>
	            <tr>
		            <td width="150px">执行时间</td>
		            <td width="200px">{{data.executeTime}}</td>
	            </tr>
	            <tr>
		            <td width="150px">操作类</td>
		            <td width="200px">{{data.operateClass}}</td>
	            </tr>
	            <tr>
		            <td width="150px">关键字</td>
		            <td width="200px">{{data.keyWord}}</td>
	            </tr>
	            <tr>
		            <td width="150px">附加属性</td>
		            <td width="200px"><pre style="width:1200px">{{data.attr}}</pre></td>
	            </tr>
            	     
	    </table>
	     

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