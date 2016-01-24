<template>
	 <div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">错误队列列表</strong></div>
    </div>

    <div class="am-g">
		<div class="am-u-sm-12 am-u-md-3">
	        <div class="am-input-group am-input-group-sm">
	          <input type="text" class="am-form-field" v-model="searchText">
	          <span class="am-input-group-btn">
	            <button class="am-btn am-btn-default" type="button">搜索</button>
	          </span>
	        </div>
      </div>

	  <div class="am-u-sm-12 am-u-md-2">
		   <div class="am-form-group">	
			      <button class="am-btn am-btn-default" type="button" @click="showModal=true">重置</button>
			      <modal :show.sync="showModal">
				      
				        <p slot="body">确定要重置这些记录吗</p>
				        
				            <span class="am-modal-btn" slot="footer" data-am-modal-cancel @click="showModal=false">取消</span>
                            <span class="am-modal-btn" slot="footer" data-am-modal-confirm @click="reset">确定</span>
				         
                  </modal> 
			 </div>
	    </div>
	</div>
	
	<div class="am-g">
      <div class="am-u-sm-12">
	    <table class="am-table am-table-striped am-table-hover table-main">
	        <thead>
	            <tr>
					<th style="width:5%"> <input id="chkAll" type="checkbox" @click="selectAll(checked)"/><label for="chkAll"></label></th>
					<th style="width:25%">消息地址</th>
					
					<th style="width:15%">优先级</th>
					<th style="width:15%">重传次数</th>
					<th style="width:15%">创建时间</th>
					<th style="width:15%">更改时间</th>
					<th style="width:5%">详情</th>
	             </tr>
            </thead>
            <tbody>
				<tr v-for="item in items">
					<td>
					    <input type="checkbox" id="{{item.id}}" value={{item.id}}  v-model="checkedNames"/>
					    <label for="{{item.id}}"></label>
					</td>
					<td>
						{{item.msgType}}
					</td>
					<td>
						{{item.priority}}
					</td>
					<td>
					  {{item.rewriteCount}}				
                   </td>
					<td>
						 {{item.createdDate | date  'YYYY-MM-DD HH:mm:ss'}}			
					</td>
					<td> 
					     {{item.lastRewriteDate | date  'YYYY-MM-DD HH:mm:ss'}}
					</td>
					<td>
					   <table-modal :item="item"></table-modal>
					</td>
				</tr>
            </tbody>	
            	     
	    </table>
	     
	    <pagination :page-per-rows="rows" :total-page="totalPage" :cur-page.sync="curPage"></pagination>
     </div>
   </div>
</template>
<script>
import * as errorMsgService from '../services/ErrorMsgService.js'
import pagination from './Pagination.vue'
import tableModal from './TableModel.vue'
import modal from './Modal.vue'
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
      showModal:false
    }
  },
  components: {
    pagination,
    tableModal,
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
	    this.showModal = false;
	    if(this.checkedNames.length < 1){
		    alert('至少要选择一项哟!')
		    return
	    }
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