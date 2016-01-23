<template>
    {{params|json}}
	<div class="row section">
		<div class="row">
			<div class="col  offset-s4 s8 "><h4 class="header">记录日志信息列表</h4></div>
		</div>
		<div class="row">
		    <div class="input-append">
		        <div class="input-field col s1 ">
					<label>查找：</label>
				</div>
			    <div class="input-field col s3">
			         <input v-model="searchText" type="text" placeholder="查找"/>
			    </div>
			    <div class="input-field col s1 ">
					<label>关键字：</label>
				</div>
			     <div class="input-field col s3">
			         <input v-model="keyWord" type="text" placeholder="关键字"/>
			    </div>
			    <div class="input-field col s1 ">
					<label>项目名称：</label>
				</div>
			     <div class="input-field col s3">
			       <select v-model="sydId" class="browser-default">
						<option v-for="project in projects" v-bind:value="project.id">{{project.label}}</option>
		            </select>
			    </div>
			</div>
			</div>
			<div class="row">
			<div class="input-append">
			     <div class="input-field col s1 ">
					<label>开始时间：</label>
				</div>
			     <div class="input-field col s2">
			         <input v-model="startTime" type="text" placeholder="开始时间" v-date-picker :options="{format:'Y-m-d H:i:s',pickTime:true,language:'zh'}" ></input>
			    </div>
			    <div class="input-field col s1 ">
					<label>结束时间：</label>
				</div>
			     <div class="input-field col s2">
			         <input v-model="endTime" type="text" placeholder="结束时间" v-date-picker :options="{format:'Y-m-d H:i:s',pickTime:true,language:'zh'}"></input>
			    </div>
			     <div class="input-field col s1 ">
					<label>年份：</label>
				</div>
			     <div class="input-field col s2">
			    
			         <select id="years" name="years" v-model="year" class="browser-default">
							<option v-for="year in years" v-bind:value="year">{{year}}</option>
					 </select>

			    </div>
			     <div class="input-field col s1 ">
					<label>月份：</label>
				</div>
			     <div class="input-field col s2">
			         <select id="years" name="years" v-model="month" class="browser-default">
								<option v-for="month in 12" v-bind:value="month">{{month+1 }}</option>
					 </select>
			    </div>
			 </div>
			 </div>
			    <div class="input-field col s3">
					    <button class="btn" @click="search">检索</button>
					</div>
		    </div>
		</div>
	    <table class="table bordered striped responsive-table centered">
	        <thead>
	             <tr>
					<th style="width:5%">序号</th>
					<th style="width:20%">请求地址</th>
					<th style="width:10%">关键字</th>
					<th style="width:10%">操作时间</th>
					
					<th style="width:10%">执行时间</th>
					<th style="width:5%">客户端IP</th>
					<th style="width:10%">系统名称</th>
					<th style="width:5%">操作类型</th>
					<th style="width:20%">附加属性</th>
					<th style="width:5%">详情</th>
	             </tr>
            </thead>
            <tbody>
				<tr v-for="item in items">
					<td >
					    {{$index}}
					</td>
					<td>
					   <p style=" max-width:300px;white-space:nowrap;word-break:keep-all;overflow:hidden;text-overflow:ellipsis;">
						{{item.url}}
					   </p>
					</td>
					<td >
						{{item.keyWord}}
					</td>
					<td >
						{{item.operateTime  | date  'YYYY-MM-DD HH:mm:ss'}}
					</td>
					
						<td> {{item.executeTime}}</td>
						<td> {{item.clientIp}}</td>
						<td>
						{{item.systemName}}
					</td>
					<td>
						 {{item.operateType}}				
                    </td>
						<td>
                           <p style=" max-width:300px;white-space:nowrap;word-break:keep-all;overflow:hidden;text-overflow:ellipsis;">
						{{item.attr}}
						</p>
						</td>
						<td> <a v-link="{name:'logDetail',params:{id:item.id},query:{tableName:tableName}}">详情</td>
				</tr>
	
            </tbody>	
            	     
	    </table>
	     
	    <pagination :page-per-rows="rows" :total-page="totalPage" :cur-page.sync="curPage"></pagination>
    </div>
</template>
<script>
import * as logDataService from '../services/LogDataService.js'
import pagination from './Pagination.vue'
import sysproject from './Sysproject.vue'
import { Promise } from 'es6-promise'

export default {
  
  data () {
    var years =[];
	  for(var i = 2010;i<2020;i++){
	    years.push(i);
	  }
	var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear().toString();
	var tableName = year+( month <9 ?'0'+(month+1):month.toString());
	
    return {
      items: [],
      years:years,
      curPage:1,
      rows:10,
      totalPage:10,
      searchText:null,
      keyWord:null,
      sydId:-1,
      startTime:null,
      endTime:null,
      tableName:tableName,
      year:year,
      month:month,
   
      projects:[]
    }
  }, 
  route: {
    data ({to,next}) {
      
      this.searchText = to.query.searchText;
      this.keyWord = to.query.keyWord;
      if(to.query.sysId != null){
         this.sysId = to.query.sysId;
      }
      if(to.query.tableName != null){ 
         this.tableName = to.query.tableName;
      }
      if(to.query.page !=null){
        this.curPage = to.query.page;
      }
      if(to.query.rows != null){
        this.rows = to.query.rows;
      }
      var maxTime = new Date(this.year,this.month+1,1);
      var minTime = new Date(this.year,this.month,1);
    
      this.updateData();   
    }
  },
  components: {
    pagination,
    sysproject
  },
  methods: {
    
    updateData () {
      var params ={};
      params.searchText = this.searchText;
      params.keyWord = this.keyWord;
      params.sysId = this.sysId;
     
      params.page = this.curPage;
      params.rows = this.rows;
      params.tableName = this.tableName;
      if(this.startTime != null &&this.endTiime != null && new Date(this.startTime) >= minTime && new Date(this.endTime) <= maxTime ){
         params.startTime = this.startTime;
          params.endTime = this.endTime;
      }
      logDataService.getLogData(params).then((xhr,response) =>{
        if(response.code == 200){
	        var page = response.page;
            this.totalPage = (page.totalRows / this.rows).toFixed(0);
	        this.items = response.items;
	          
        }
      });
      
    },
    search () {
	   this.$router.go({name:'log',query:{searchText:this.searchText,startTime:this.startTime,endTime:this.endTime,tableName:this.tableName}})
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
	    

    },
    year () {
        var monthStr = "";
	    if(this.month <9){
            monthStr += '0' +(this.month+1);
	    }else{
            monthStr = (this.month+1).toString();
	    }
	    this.tableName = this.year + monthStr;

    },
    curPage () {
	   this.$router.go({name:'log',query:{page:this.curPage,searchText:this.searchText,rows:this.rows,startTime:this.startTime,endTime:this.endTime,tableName:this.tableName}})
    }
  }
}
</script>