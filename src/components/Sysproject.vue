<template>
    <select v-model="sydId" class="browser-default">
			<option v-for="project in projects" v-bind:value="project.name">{{project.label}}</option>
	  </select>
</template>
<script>
import * as logDataService from '../services/LogDataService.js'
export default{
    data () {
      return {
	    projects:[],
	    sydId:-1
      }
    },
    props: ['sydId'],
    ready () {
        logDataService.getSysProject(this)
    },
    
}
</script>