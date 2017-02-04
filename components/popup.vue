<script>
  import Vue from 'vue'

  const Popup = Vue.extend({
    name: 'Popup',
	props:{
     show:{
	   type:Boolean,
	   default:!1
	 },
	 mask:{
	   type:Boolean,
	   default:!0
	 },
	 maskClose:{
	   type:Boolean,
	   default:!0
	 },
	 closeType:{
	    type:Boolean,  // true:destroy false:hide
		default:!1
	 },
	 view:{
	   type:Object,
	   default:null
	 }
    }, 
	data(){
	  return {
	     currentView:this.view
	  }
	},
    template: `
	  <div :class="['_pop',show?'':'_none']">
         <div :class="mask?'_black_mask':''" @click="maskclose"></div>
	     <div class="_pop_content" v-bind:is="currentView">
		   I'm a Popup
		 </div>
      </div>
	  `,
    methods:{
	   open(){
	     this.show = !0
	   },
	   maskclose(){
	      if(this.mask&&this.maskClose) this.close()
	   },
	   close(){
	     if(this.closeType) this._destroy()
		 else this.hide()
	   },
	   hide(){
	      this.show = !1
	   },
	   _destroy(){
	      this.$destroy()
	   }
    },
	destroyed () {
       this.$el.remove()
    }
  })

  export default {
     original:Popup,
	 data(){
	    return {
		   $_pop_:null,
		   $_dom_:null,
		}
	 },
     methods:{
	   open(cfg){
	      if(!this.$_pop_){
		     let popdom = document.createElement("div"),
	         $pop;
	         document.body.appendChild(popdom)
	         $pop = new Popup({propsData:cfg}).$mount()
             popdom.appendChild($pop.$el)
			 this.$_pop_ = $pop;
			 this.$_dom_ = popdom;
		  }
		  this.$_pop_.open()
	   },
	   close(){
	      if(this.$_pop_) this.$_pop_.close()
		  else return false
	   },
	   hide(){
	      if(this.$_pop_) this.$_pop_.hide()
		  else return false
	   },
	   destroy(){
	      if(this.$_pop_) {
		    this.$_pop_._destroy()
			this.$_dom_.remove()
		  }
		  else return false
	   }
	 }
  }
</script>
<style>
  ._none{
    display:none;
  }
  ._black_mask {
    background: rgba(0,0,0,.45);
    position: fixed;
    z-index: 9999991;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  ._pop_content {
    position: fixed;
    z-index: 9999992;
    left: 50%;
    top: 50%;
    min-width: 160px;
    min-height: 160px;
    background: #fff;
    -ms-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    border-radius: 3px;
    padding: 4px;
  }
</style>
