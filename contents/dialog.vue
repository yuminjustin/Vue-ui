<template>
  <div>
     <button type="button" class="btn btn-default" @click="open">打开dialog</button>
	 <button type="button" class="btn btn-default" @click="close">关闭dialog</button>
	 <button type="button" class="btn btn-default" @click="hide">隐藏dialog</button>
	 <button type="button" class="btn btn-default" @click="destroy">销毁dialog</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Dialog from '../components/dialog'

let dialogComs = Vue.extend(Dialog),
    dialog = new dialogComs();
var Posts = {
	template: '<p @click="test">It\'s working!<br/>Try to click me</p>',
	methods: {
	   test(){
	     alert(`I'm a Dialog`)
	   }
	}
}

export default {
  data(){
    return {}
  },
  methods: {
    open(){
	  dialog.open({
	     mask:!1,
		 maskClose:!1,
		 title:"这是一个标题",
		 view:Posts,
		 closeText:"这是关闭",
		 closeFun:function(obj){
			console.log("您点击了close",obj)
		    return !0
		 },
		 sureText:"确定",
		 sureFun:function(obj){
			console.log("您点击了sure",obj)
		    return !0
		 },
		 cancelText:"放弃",
		 cancelFun:function(obj){
		    console.log("您点击了cancel",obj)
		    return !0
		 },
		 hasSureBtn:!0,
		 hasCancelBtn:!1
	  })
	},
	close(){
	  dialog.close()
	},
	hide(){
	  dialog.hide()
	},
	destroy(){
	  dialog.destroy()
	}
  }
}
</script>
