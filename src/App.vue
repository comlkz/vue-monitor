<template>
<header class="am-topbar admin-header">
  <div class="am-topbar-brand">
    <strong>美丽加</strong> <small>监控平台</small>
  </div>

  <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

  <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

    <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
     
    </ul>
  </div>
</header>
<div class="am-cf admin-main">
	<div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
	    <div class="am-offcanvas-bar admin-offcanvas-bar">
	      <ul class="am-list admin-sidebar-list">

		       <Menu v-for="function in functions" :function="function" :menuindex.sync="activeIndex" :itemindex.sync="itemIndex" >
		  </ul>

       
		</div>
    </div>
    <div class="admin-content">
         <router-view></router-view>
    </div>
    
 </div>   
</template>

<script>
import Menu from './components/Menu.vue'
import {getMenu} from './services/MenuService.js'
export default {
  data () {
   
   
    return {
      functions: [],
      activeIndex: -1,
      itemIndex:-1
    }
  },
  components: {
    'Menu': Menu
  },
  ready () {

    
    getMenu(this).then((xhr,response) =>{
        this.functions = JSON.parse(response.content);
        var head = {"path":"index","label":"首页","index":0};
        this.functions.unshift(head);
        var logOut = {"path":"edge/logout","label":"注销","index":0};
        this.functions.push(logOut)
    })

   
   
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
