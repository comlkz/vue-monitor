<template>
	<div class="row section">
		<div class="row">
			<div class="col  offset-s4 s8 "><h4 class="header">错误队列列表</h4></div>
		</div>
		<div class="row">
		    <div class="col s12 m4 ">
		         <input v-model="searchText" type="text" placeholder="查找"/> 
		    </div>
		    <div class="input-field col s3">
				    <button class="btn" @click="search">检索</button>
		    </div>
		    <div class="input-field col s3">
				    <button class="btn" @click="reset">重置</button>
		    </div>
		</div>
	    <table class="table bordered striped responsive-table centered">
	        <thead>
	             <tr>
					<th style="width:5%"> <input id="chkAll" type="checkbox" @click="selectAll(checked)"/><label for="chkAll"></label></th>
					<th style="width: 10%">消息地址</th>
					<th style="width:30%">消息内容</th>
					<th style="width:5%">消息优先级</th>
					<th style="width:5%">消息重传次数</th>
					<th style="width:17%">创建时间</th>
					<th style="width:17%">更改时间</th>
	             </tr>
            </thead>
            <tbody>
				<tr v-for="item in items">
					<td style="width: 5%">
					    <input type="checkbox" id="{{item.id}}" value={{item.id}}  v-model="checkedNames"/>
					    <label for="{{item.id}}"> </label>
					</td>
					<td style="width: 10%">
						{{item.msgType}}
					</td>
					<td style="width:30%">
					  <modal :item="item"></modal>
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
					     {{item.lastRewriteDate | date 'YYYY-MM-DD HH:mm:ss'}}
					</td>
				</tr>
	
            </tbody>	
            	     
	    </table>
	     
	    <pagination :page-per-rows="rows" :total-page="totalPage" :cur-page.sync="curPage"></pagination>
    </div>
</template>
<script>
import * as errorMsgService from '../services/ErrorMsgService.js'
import pagination from './Pagination.vue'
import modal from './TableModel.vue'
export default {
  data () {
    return {
      items: [],
      checked:false,
      checkedNames:[],
      curPage:1,
      rows:10,
      totalPage:10,
      searchText:null,
    }
  },
  components: {
    pagination,
    modal
  },
  
  route: {
    data ({to,next}) {
      this.searchText = to.query.searchText;
      if(to.query.page !=null){
        this.curPage = to.query.page;
      }else{
       this.curPage = 1
      }
      if(to.query.rows != null){
        this.rows = to.query.rows;
      }
      this.updateData();   
    }
  },
  ready () {
    
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
      params.page = this.curPage;
      params.rows = this.rows;
      params.searchText = this.searchText;
      errorMsgService.getErrorMsg(params).then((xhr,response) => {
       if(response.code == 200){

           var page = response.page;
           this.totalPage = (page.totalRows / this.rows).toFixed(0);
            
           this.items = response.items;
           
	     }
      });
    },
    search () {
      this.$router.go({name:'mq',query:{searchText:this.searchText}})
    },
    reset () {
        let params = {};
        let ids ="";
        this.checkedNames.forEach(key =>{
            ids += key +","
        })
        params.ids = ids;
        errorMsgService.resetErrorMsg(params).then((xhr,response) => {
           if(response.code == 200){
              this.checkedNames=[]
              this.updateData()
	     }
      });
    }
  },
  watch:{
    curPage () {
	   this.$router.go({name:'mq',query:{page:this.curPage,searchText:this.searchText,rows:this.rows}})
    }
   
  }
  
  
}
</script>