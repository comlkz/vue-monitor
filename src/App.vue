<template>
   <header>
       <nav class="top-nav cyan">
        <div class="nav-wrapper">
           <a href="#" class="brand-logo">监控平台</a>
		      <ul id="nav-mobile" class="right hide-on-med-and-down">
		          <li><a href="edge/logout">注销</a></li>
		      </ul>
        </div>
       
      </nav>
      <div class="container"><a href="#" data-activates="nav-mobile" class="button-collapse top-nav waves-effect waves-light circle hide-on-large-only"><i class="mdi-navigation-menu"></i></a></div>
      <ul id="nav-mobile" class="side-nav fixed">
        <Menu v-for="function in functions" :function="function" :index.sync="activeIndex" :itemindex.sync="itemIndex" >
      </ul>
    </header>
  
    <div id="grid-container" class=" container section scrollspy">
         <router-view></router-view>
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
        
    })

   
   
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
