<template>
   <div class="am-modal am-modal-dialog" tabindex="-1" :class="{'am-modal-active':show,'am-modal-out':show==false}" :style="{display:display}" transition="modal">
        <div class="am-modal-dialog">
	        <div class="am-modal-hd">
                <slot name="header"></slot>
            </div>
            <div class="am-modal-bd">
	          <slot name="body">
	            default body
	          </slot>
             </div>
        </div>
        <div class="am-modal-footer">
          <slot name="footer">
            <span class="am-modal-btn" @click="show = false">确定</span>
          </slot>
        </div>
    </div>
   <div class="am-dimmer " :class="{'am-active':show}" data-am-dimmer="" :style="{display:display}"></div>
</template>
<script>
export default {
    props: {
	    show: {
	      type: Boolean,
	      required: true,
	      twoWay: true    
	    }
    },
    data (){

      return {
        display:'none',
        opacity:0,
        top:'144px',
        transform:'scaleX(0.7)'
      }
    },
    computed: {
       display () {
        return this.show == true ? 'block':'none';
       },
      
       top (){
        return this.show == true ? '-65px':'144px';
       }
       
    }
}
</script>
<style>
   .modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>