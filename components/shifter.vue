<template>
  <div :class="['_shifter', myValue?'_on':'_off']" @click="click">
     <span></span>
	 <i :class="['glyphicon',icon, myValue?'_l':'_r']"></i>
  </div>
</template>

<script>
export default {
  name: 'Shifter',
  props:{
    value:{
	  type:Boolean,
	  default:!1
	},
	clickFun:{
	  type:Function,
	  default:null
	}
  },
  data(){
    return {
	  myValue:this.value,
	  icon:"glyphicon-"+(this.value?"ok":"remove")
	}
  },
  watch: {
     myValue(v){
	    this.icon = "glyphicon-"+(v?"ok":"remove")
	 }
  },
  methods:{
    click(){
	   this.myValue = !this.myValue
	   this.clickFun&&this.clickFun(this.myValue)
	}
  }
}
</script>

<style>
  ._shifter{
    width: 64px;
    height: 24px;
    margin: 4px 0;
    display: inline-block;
    border-radius: 12px;
    position: relative;
	cursor: pointer;
	transition:all 1s;
	-webkit-transition:all 1s;
	-moz-transition:all 1s;
	-ms-transition:all 1s;
	-o-transition:all 1s;
  }
  ._shifter span {
    display: block;
    position: absolute;
    height: 22px;
    width: 22px;
    border-radius: 12px;
	transition:all 1s;
	-webkit-transition:all 1s;
	-moz-transition:all 1s;
	-ms-transition:all 1s;
	-o-transition:all 1s;
    top: 0px;
	z-index:2
  }
  ._shifter._off{
    border: solid 1px #ccc;
  }
  ._shifter._off span {
     left: 0px;
	 background: #999;
  }
  ._shifter._on {
    border: solid 1px #5cb85c;
  }
  ._shifter._on span {
     left: 40px;
	 background: #4cae4c;
  }
  ._shifter i {
    position: absolute;
    top: 4px;
	transition:left 1s;
	-webkit-transition:left 1s;
	-moz-transition:left 1s;
	-ms-transition:left 1s;
	-o-transition:left 1s;
	z-index:1
  }
  ._shifter._off i{
    color: #999;
  }
  ._shifter._on i{
    color: #4cae4c;
  }
  ._shifter ._l{
    left: 4px;
  }
  ._shifter ._r{
    left: 42px;
  }
</style>
