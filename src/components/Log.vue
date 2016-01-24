<template>

    <div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">记录日志信息列表</strong> / <small>Table</small></div>
    </div>
    
	<div class="am-g">
		<div class="am-u-sm-12 am-u-md-6">
		   <div class="am-form-group">
					
			        <input v-model="searchText" type="text" placeholder="查找" class="am-form-field"/>
			 </div>
	    </div>
	    <div class="am-u-sm-12 am-u-md-6">
		    <div class="am-form-group">  
					
			         <input v-model="keyWord" type="text"  class="am-form-field" placeholder="关键字"/>
			 </div>
	    </div>
		 
	</div>
	<div class="am-g">
		
		<div class="am-u-sm-12 am-u-md-6">
			<div class="am-form-group">  
			     <input class="am-form-field"  type="text" placeholder="开始时间" v-date-picker="startTime" :options="{format:'yyyy-mm-dd',language:'zh'}" ></input>
		    </div>
		 </div>
		 <div class="am-u-sm-12 am-u-md-6">
			<div class="am-form-group">  
			    
			     <input  class="am-form-field" type="text" placeholder="结束时间" v-date-picker="endTime" :options="{format:'yyyy-mm-dd',pickTime:true,language:'zh'}" ></input>
		    </div>
		 </div>
    </div>
    <div class="am-g">
		<div class="am-u-sm-12 am-u-md-4">
			<div class="am-form-group">  
			    <label>年份：</label>
                <select v-select="year">
					<option v-for="year in years" v-bind:value="year">{{year}}</option>
				</select>
		    </div>
		 </div>	  
		<div class="am-u-sm-12 am-u-md-4">
			<div class="am-form-group">  
			    <label>月份：</label>
                 <select v-select="month" >
					<option v-for="month in 12" v-bind:value="month">{{month+1 }}</option>
				 </select>
		    </div>
		 </div>	 
		 <div class="am-u-sm-12 am-u-md-4">
		    <div class="am-form-group">  
					 <label>项目名称：</label>
			       <select v-select v-model="sydId" >
						<option v-for="project in projects" v-bind:value="project.id">{{project.label}}</option>
		            </select>
			</div>
		</div> 	    
	</div>	
	<div class="am-g">	
		<div class="am-u-sm-12 am-u-md-3">
			<div class="am-form-group">     
				<button class="am-btn am-btn-default" @click="search">检索</button>
			</div>
	    </div>
	</div>
	<div class="am-g">
      <div class="am-u-sm-12">
	   
		    <table class="am-table am-table-striped am-table-hover table-main">
		        <thead>
		               <tr>
					<th width="5%">序号</th>
					<th width="25%">请求地址</th>
					<th width="20%">关键字</th>
					<th width="20%">操作时间</th>			
					<th width="10">执行时间</th>
					<th width="10%">系统名称</th>
					<th width="5%">操作类型</th>
					<th width="5%">详情</th>
	             </tr>
	            </thead>
	            <tbody>
					<tr v-for="item in items">
						<td >
						    {{$index}}
						</td>
						<td>

							{{item.url}}

						</td>
						<td >
							{{item.keyWord}}
						</td>
						<td >
							{{item.operateTime  | date  'YYYY-MM-DD HH:mm:ss'}}
						</td>
						
							<td> {{item.executeTime}}</td>

							<td>
							{{item.systemName}}
						</td>
						<td>
							 {{item.operateType}}				
	                    </td>
							
							<td> <a v-link="{name:'logDetail',params:{id:item.id},query:{tableName:tableName}}">详情</td>
					</tr>
		
	            </tbody>	
	            	     
		    </table> 
	        <pagination :page-per-rows="rows" :total-page="totalPage" :cur-page.sync="curPage"></pagination>

    </div>
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
       logDataService.getSysProject().then((xhr,response) =>{
        this.projects = response
      });
    
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

         params.startTime = this.startTime;
          params.endTime = this.endTime;
      
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
            monthStr += '0' +(parseInt(this.month)+1);
	    }else{
            monthStr = (parseInt(this.month)+1).toString();
	    }
	    console.log(monthStr)
	    this.tableName = this.year + monthStr;
	    

    },
    year () {
        var monthStr = "";
	    if(this.month <9){
            monthStr += '0' +(parseInt(this.month)+1);
	    }else{
            monthStr = (parseInt(this.month)+1).toString();
	    }
	    console.log(monthStr)
	    this.tableName = this.year + monthStr;

    },
    curPage () {
	   this.$router.go({name:'log',query:{page:this.curPage,searchText:this.searchText,rows:this.rows,startTime:this.startTime,endTime:this.endTime,tableName:this.tableName}})
    }
  }
}
</script>
