<template>
			  <ul class="pagination">
			     <li class="waves-effec"><a @click="changePage(1)">首页</a></li>
			    <li :class="{'disabled': curPage == 1,'waves-effect':curPage != 1}"><a @click="prePage(curPage)">上一页</a></li>
			    <li v-for="item in items"  :class="{'active':item == curPage,'waves-effect':item != curPage}"><a @click="changePage(item)">{{item}}</a></li>
			   <li :class="{'disabled':curPage == totalPage,'waves-effect':curPage != 1}"><a @click="nextPage(curPage)">下一页</a></li>
			    <li class="waves-effec"><a @click="changePage(totalPage)">尾页</a></li>
			  </ul>
	
</template>
<script>
export default{
    data () {
      return {
	    totalPage:1
      }
    },
    props: ['page','curPage'],
    ready () {
       
    },
    methods: {
      changePage (item) {
        
        this.curPage = item;
        console.log(this.curPage)
      },
      prePage (item) {
        if(item > 1){
          this.curPage = item -1;
        }else{
          this.curPage = 1;
        }
      },
      nextPage (item) {
        if(item < this.totalPage){
          this.curPage = item + 1;
        }else{
          this.curPage = this.totalPage;
        }
      }
    },
     computed: {
      items: function(){
        var left = 1;
        var floatPage = this.page.totalRows / this.page.rows;
        var totalPage = floatPage.toFixed(0);
        this.totalPage = totalPage;
        var right = totalPage;
        var ar = [];
        if(totalPage>= 7){
          if(this.curPage > 5 && this.curPage <totalPage-4){
            left = this.curPage - 3;
            right = this.curPage + 3;
          }else{
            if(this.curPage<=5){
              left = 1;
              right = 7;
            }else{
              right = totalPage;
              left = totalPage - 6;
            }
          }
        }
        while (left <= right){
          ar.push(left);
          left ++;
        }
        return ar;
      }
    }
  }

</script>