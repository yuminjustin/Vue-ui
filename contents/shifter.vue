<template>
  <div>
     <p>开关</p>
	 <Shifter :value="value" :clickFun="click"></Shifter>
	 <p>您选择了{{text}}</p>
  </div>
</template>

<script>
import Vue from 'vue'
import Shifter from '../components/shifter'

export default {
  data(){
    return {
	  value:!0,
	  text:"开启"
	}
  },
  components: {
     Shifter
  },
  methods:{
     click(v){
	    this.value = v;
	 }
  },
  watch:{
     value(v){
	    this.text = v?"开启":"关闭"
	 }
  }
}
</script>
