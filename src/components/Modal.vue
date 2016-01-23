<template>
   <div class="modal" style="z-index: 1003;" :style="{display:display,opacity:opacity,transform:transform,top:top}" transition="modal">
        <div class="modal-content">
          <slot name="header">
           
          </slot>
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <a  class="modal-action modal-close waves-effect waves-green btn-flat" @click="show = false">确定</a>
          </slot>
        </div>
    </div>
   
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
       opacity (){
         return this.show == true ? '1':'0';
       },
       top (){
        return this.show == true ? '10%':'144px';
       },
       transform (){
          return this.show == true ? 'scaleX(1)':'scaleX(0.7)';
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