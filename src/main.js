import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config.js'

import { directive } from './directive.js'
Vue.use(require('vue-resource'));
Vue.use(VueRouter);

var moment = require('moment');

Vue.filter('date', function (value,format) {

  return moment(new Date(value)).format(format)
})

directive(Vue)

var router = new VueRouter()
configRouter(router)
router.start(App, '#app')