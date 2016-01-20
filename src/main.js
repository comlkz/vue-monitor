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
  twoWay: true,
  priority: 1000,

  params: ['options'],
    
  bind: function () {
    var self = this;
    console.log(this.el)
     $(this.el).fdatepicker()
     
  },
  update: function (value) {
    console.log('change')
  },
  unbind: function () {
   
  }
})

var router = new VueRouter()
configRouter(router)
router.start(App, '#app')