<template>
     <li v-if="function.isLeaf ==0" class="bold">
         <a  v-link="{ path: function.path }" class="waves-effect waves-teal">
             {{function.label}}
          </a>
     </li>
     
    <li v-else class="no-padding" >
        <ul class="collapsible collapsible-accordion">
          <li class="bold" :class="{active:index == function.id}">
              <a class="collapsible-header  waves-effect waves-teal" :class="{active:index == function.id}" v-link="{ path: function.path }" @click="toggle"> 
                  {{function.label}}
              </a>
               <div class="collapsible-body" :style="{display:display}">
                 <ul>
                    <li v-for="item in function.functions" :class="{active:itemindex == item.id,cyan:itemindex == item.id}" >
                        <a v-link="{ path: item.path ,query:{page:1}}" @click="toggleItem(item.id,function.id)">
                            {{item.label}}
                        </a>
                    </li> 
                </ul>
              </div>
          </li>
        </ul>
    </li>
</template>
<script>
export default {
  data () {
    return {
      itemActive: false,
      display: 'none',
      index: -1
    }
  },
  props:{
    function: {
       type: Object
    },
    index: {
      type: Number
    },
    itemindex: {
      type: Number
    }
  },
  methods: {
    toggle () {

      if(this.index == this.function.id){
        this.index = -1;
      }else{
          
          this.index = this.function.id;
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
