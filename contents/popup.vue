<template>
  <div>
     <button type="button" class="btn btn-default" @click="open">打开popup</button>
	 <button type="button" class="btn btn-default" @click="close">关闭popup</button>
	 <button type="button" class="btn btn-default" @click="hide">隐藏popup</button>
	 <button type="button" class="btn btn-default" @click="destroy">销毁popup</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Popup from '../components/popup'

let popComs = Vue.extend(Popup),
    pop = new popComs();
var Posts = {
	template: '<p @click="test">It\'s working!<br/>Try to click me</p>',
	methods: {
	   test(){
	     alert(`I'm a Popup`)
	   }
	}
}

export default {
  data(){
    return {}
  },
  methods: {
    open(){
	  pop.open({mask:!0,view:Posts})
	},
	close(){
	  pop.close()
	},
	hide(){
	  pop.hide()
	},
	destroy(){
	  pop.destroy()
	}
  }
}
</script>
