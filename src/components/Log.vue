<template>
    {{params|json}}
	<div class="row section">
		<div class="row">
			<div class="col  offset-s4 s8 "><h4 class="header">记录日志信息列表</h4></div>
		</div>
		<div class="row">
		     <div class="input-field col s4">
		         <input v-model="searchText" type="text" placeholder="查找"/>
		    </div>
		     <div class="input-field col s4">
		         <input v-model="keyWord" type="text" placeholder="关键字"/>
		    </div>
		     <div class="input-field col s4">
		      <select v-model="sydId" class="browser-default">
					<option v-for="project in projects" v-bind:value="project.id">{{project.label}}</option>
	            </select>
	           <!-- <sysproject :sys-id.sync="params.sysId"></sysproject> -->
		    </div>
		     <div class="input-field col s6">
		         <input v-model="startTime" type="text" placeholder="开始时间" v-date-picker/>
		    </div>
		     <div class="input-field col s6">
		         <input v-model="endTime" type="text" placeholder="结束时间" v-date-picker/>
		    </div>
		     <div class="input-field col s5">
		    
		         <select id="years" name="years" v-model="year" class="browser-default">
						<option v-for="year in years" v-bind:value="year">{{year}}</option>
				 </select>

		    </div>
		     <div class="input-field col s6">
		         <select id="years" name="years" v-model="month" class="browser-default">
							<option v-for="month in 12" v-bind:value="month">{{month+1 }}</option>
				 </select>
		    </div>
		    <div class="input-field col s3">
				    <button class="btn" @click="search">检索</button>
				</div>
		</div>
	    <table class="table bordered striped responsive-table centered">
	        <thead>
	             <tr>
					<th>序号</th>
					<th>请求地址</th>
					<th>关键字</th>
					<th>操作时间</th>
					<th>系统名称</th>
					<th>操作类型</th>
					<th>执行时间</th>
					<th>客户端IP</th>
					<th >附加属性</th>
					<th>详情</th>
	             </tr>
            </thead>
            <tbody>
				<tr v-for="item in items">
					<td >
					    {{$index}}
					</td>
					<td>
						<p style=" max-width:500px;white-space:nowrap;word-break:keep-all;overflow:hidden;text-overflow:ellipsis;">
						{{item.url}}
						</p>
					</td>
					<td >
						{{item.keyWord}}
					</td>
					<td >
						{{item.operateTime  | date  YYYY-MM-DD HH:mm:ss}}
					</td>
					<td>
						{{item.systemName}}
					</td>
					<td>
						 {{item.operateType}}				
                    </td>
						<td> {{item.executeTime}}</td>
						<td> {{item.clientIp}}</td>
						<td> {{item.attr | simpleStr}}</td>
						<td> <a href="#/log/logDetail/{{item.id}}?tableName={{tableName}}">详情</td>
				</tr>
	
            </tbody>	
            	     
	    </table>
	     
	    <pagination :page-per-rows="10" :page="page" :cur-page.sync="curPage"></pagination>
    </div>
</template>
<script>
import * as logDataService from '../services/LogDataService.js'
import pagination from './Pagination.vue'
import sysproject from './Sysproject.vue'

export default {
  
  data () {
    var years =[];
	  for(var i = 2010;i<2020;i++){
	    years.push(i);
	  }
    return {
      items: [],
      years:years,
      curPage:1,
      page:{page:1,rows:5},
      searchText:null,
      keyWord:null,
      sydId:-1,
      startTime:null,
      endTime:null,
      tableName:null,
      year:'2010',
      month:0,
      projects:[]
    }
  },
  components: {
    pagination,
    sysproject
  },
  created () {
    this.updateData();
    logDataService.getSysProject().then((xhr,response) =>{
         this.projects = response;
    })
  },
  methods: {
    
    updateData () {
      var params ={};
      params.searchText = this.searchText;
      params.keyWord = this.keyWord;
      params.sysId = this.sysId;
      params.startTime = this.startTime;
      params.endTime = this.endTime;
      params.page = this.page.page;
      params.rows = this.page.rows;
      params.tableName = this.tableName;
      logDataService.getLogData(params).then((xhr,response) =>{
        if(response.code == 200){
	           this.page = response.page;
	           this.items = response.items;
	          
        }
      });
      
    },
    search () {
      this.updateData();
    }
  },
  watch:{
    month (){
        var monthStr = "";
	    if(this.month <9){
            monthStr += '0' +(this.month+1);
	    }else{
            monthStr = (this.month+1).toString();
	    }
	    this.tableName = this.year + monthStr;
	    console.log(this.tableName)
	    this.updateData();
    },
    year () {
        var monthStr = "";
	    if(this.month <9){
            monthStr += '0' +(this.month+1);
	    }else{
            monthStr = (this.month+1).toString();
	    }
	    this.tableName = this.year + monthStr;
	    
	    this.updateData();
    }
  }
}
</script>