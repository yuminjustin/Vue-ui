<template>
  <div>
     <button type="button" class="btn btn-default" @click="notice('','常规')">常规</button>
	 <button type="button" class="btn btn-danger" @click="notice('error','错误')">错误</button>
	 <button type="button" class="btn btn-info" @click="notice('load','加载中')">加载中</button>
	 <button type="button" class="btn btn-warning" @click="notice('warn','警告')">警告</button>
	 <button type="button" class="btn btn-success" @click="notice('success','成功')">成功</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Notice from '../components/notice'

let noticeComs = Vue.extend(Notice),
    notice = new noticeComs();

export default {
  data(){
    return {}
  },
  methods: {
    notice(type,msg){
	  notice.open({
	     type:type,
		 msg:"这是"+msg+"一个提示!"
	  })
	}
  }
}
</script>
