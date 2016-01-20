<template>
	<div class="row section">
		<div class="row">
			<div class="col  offset-s4 s8 "><h4 class="header">死信队列列表</h4></div>
		</div>
		<div class="row">
		    <div class="col s12 m12 l12">
		         <input v-model="searchText" type="text" placeholder="查找"/>
		    </div>
		    <div class="input-field col s3">
				    <button class="btn" @click="search">检索</button>
				</div>
		</div>
	    <table class="table bordered striped responsive-table centered">
	        <thead>
	             <tr>
					<th style="width:5%"> <input id="chkAll" type="checkbox" @click="selectAll(checked)"/><label for="chkAll"></label></th>
					<th style="width: 10%">消息地址</th>
					<th style="width:30%">消息内容</th>
					<th style="width:5%">P</th>
					<th style="width:5%">R</th>
					<th style="width:17%">创建时间</th>
					<th style="width:17%">更改时间</th>
	             </tr>
            </thead>
            <tbody>
				<tr v-for="item in items">
					<td style="width: 5%">
					    <input type="checkbox" id="{{item.id}}" value={{item.id}}  v-model="checkedNames"/>
					    <label for="{{item.id}}"></label>
					</td>
					<td style="width: 10%">
						{{item.msgType}}
					</td>
					<td style="width:30%">
					<p style=" max-width:500px;white-space:nowrap;word-break:keep-all;overflow:hidden;text-overflow:ellipsis;">
						<a href="#/mq/deadMq/{{item.id}}" title="{{item.msgText}}">{{item.msgText}}</a>
						</p>
					</td>
					<td style="width:5%">
						{{item.priority}}
					</td>
					<td style="width:5%">
					  {{item.rewriteCount}}				
                   </td>
					<td style="width:17%">
						 {{item.createdDate | date  'YYYY-MM-DD HH:mm:ss'}}			
					</td>
					<td style="width:17%"> 
					     {{item.lastRewriteDate | date  'YYYY-MM-DD HH:mm:ss'}}
					</td>
				</tr>
	
            </tbody>	
            	     
	    </table>
	     
	    <pagination :page-per-rows="10" :page="page" :cur-page.sync="curPage"></pagination>
    </div>
</template>
<script>
import {getDeadMsg} from '../services/DeadMsgService.js'
import pagination from './Pagination.vue'
export default {
  data () {
    return {
      items: [],
      checked:false,
      checkedNames:[],
      curPage:1,
      page:{page:1,rows:10},
      searchText:null
    }
  },
  components: {
    pagination
  },
  ready () {
    this.updateData();
  },
  methods: {
    selectAll (checked) {
      if(!checked){   
	      for (var i=0 ;i<this.items.length;i++){
	        var item = this.items[i]
	        var id = item['id'];
	        this.checkedNames.push(item['id'].toString());
	      }

	       this.checked = true;
      }else{
        this.checkedNames=[];
        this.checked = false;
      }
    },
    updateData () {
      let params = {};
      params.page = this.page.page;
      params.rows = this.page.rows;
      params.searchText = this.searchText;
      getDeadMsg(params).then((xhr,response) =>{
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
    curPage () {
	    this.page.page = this.curPage;
	    this.updateData()
    }
  }
}
</script>