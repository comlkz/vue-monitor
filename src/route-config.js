export function configRouter (router) {

  // normal routes
  router.map({
	  "/mq" :{
		   component: require('./components/Mq.vue'),
		  
         },
      "/mq/deadmsg" :{
	      component: require('./components/DeadMsg.vue')
      },
      "/log" :{
	      component: require('./components/Log.vue')
      },
    '*': {
      component: require('./components/Hello.vue')
    },

    
  })

}
