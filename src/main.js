import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config.js'
Vue.use(require('vue-resource'));
Vue.use(VueRouter);

var moment = require('moment');

Vue.filter('date', function (value,format) {

  return moment(new Date(value)).format(format)
})

Vue.directive('date-picker', {
 
  params: ['options'],
    
  bind: function () {

    console.log(this.params.options)
    $.datetimepicker.setLocale(this.params.options.language);
     $(this.el).datetimepicker({
	     format :this.params.options.format,
	     timepicker: this.params.options.pickTime,
     })
     
  },
  update: function (value) {
  
  },
  unbind: function () {
   
  }
})

var router = new VueRouter()
configRouter(router)
router.start(App, '#app')