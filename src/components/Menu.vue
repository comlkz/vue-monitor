<template>

     <li v-if="function.isLeaf==0">
         <a  v-link="{ path: function.path }" class="waves-effect waves-teal">
             {{function.label}}
          </a>
     </li>
     
    <li v-else class="admin-parent" >
	     <a class="am-cf"  :class="{'am-collapsed': menuindex == function.id}"  @click="toggle"> 
                  {{function.label}} 
              </a>
        <ul class="am-list am-collapse admin-sidebar-sub" :class="{'am-in': menuindex == function.id}" >
            <li v-for="item in function.functions" :class="{active:itemindex == item.id}" >
                <a v-link="{ path: item.path ,query:{page:1}}" @click="toggleItem(item.id,function.id)">
                    {{item.label}}
                </a>
            </li>       
        </ul>
    </li>

</template>
<script>
export default {
  data () {
    return {
      itemActive: false,
      height:'0px',
    }
  },
  props:{
    function: {
       type: Object
    },
    menuindex: {
      type: Number
    },
    itemindex: {
      type: Number
    }
  },
  methods: {
    toggle () {
      if(this.menuindex == this.function.id){
        this.menuindex = -1;
      }else{
	      console.log(this.function.id)
          this.menuindex = this.function.id;
      }
    },
    toggleItem(id){

         
         this.itemindex = id;

    }
  },
  computed: {
    display(){
      var display = this.index == this.function.id?'block':'none';

      return display;
      
    }
  }
}
</script>
