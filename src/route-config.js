export function configRouter (router) {

  // normal routes
  router.map({
	  "/mq" :{
		   name:'mq',
		   component: require('./components/Mq.vue'),
		  
         },
      "/mq/deadmsg" :{
	      name:'deadmsg',
	      component: require('./components/DeadMsg.vue')
      },
      "/log" :{
	      name:'log',
	      component: require('./components/Log.vue')
      },
      "/log/info/:id":{
	       name:'logDetail',
	       component: require('./components/LogDetail.vue')
      },
    '*': {
      component: require('./components/Hello.vue')
    },

    
  })

}
