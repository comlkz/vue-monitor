export function directive (Vue) {

 Vue.directive('date-picker', {
  twoWay: true,
  params: ['options'],
    
  bind: function () {

     var self = this
     $(this.el).datepicker({
	     //format :this.params.options.format,
     })
     .on('changeDate.datepicker.amui', function(event) {
	    
	     self.set(this.value)
     })
     
  },
  update: function (value) {
  //  $(this.el).val(value).trigger('changeDate.datepicker.amui')
  },
  unbind: function () {
    $(this).datepicker('close');
  }
});

Vue.directive('select', {
  twoWay: true,
  priority: 1000,

  params: ['options'],
    
  bind: function () {
    var self = this
    $(this.el)
      .selected({
       
	    btnSize: 'sm',
	  
	      })
      .on('change', function () {
	    console.log(this.value)
       self.set(this.value)
      })
  },
  update: function (value) {
    $(this.el).val(value).trigger('change')
  },
  unbind: function () {
    $(this.el).off().selected('destroy')
  }
});


}

