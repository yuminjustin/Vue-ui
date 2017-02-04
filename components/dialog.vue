<script>
  import Vue from 'vue'
  import Popup from '../components/popup'
  
  let Lang = ['提示','关闭','确定','取消']

  const Dialog = Vue.extend({
    extends:Popup.original,
    name: 'Dialog',
    props:{
	   title:{
	     type:String,
		 default:Lang[0]
	   },
	   closeText:{
	     type:String,
		 default:Lang[1]
	   },
	   closeFun:{
	     type:Function,
		 default:null
	   },
	   sureText:{
	     type:String,
		 default:Lang[2]
	   },
	   sureFun:{
	     type:Function,
		 default:null
	   },
	   cancelText:{
	     type:String,
		 default:Lang[3]
	   },
	   cancelFun:{
	     type:Function,
		 default:null
	   },
	   hasSureBtn:{
	     type:Boolean,
		 default:!0
	   },
	   hasCancelBtn:{
	     type:Boolean,
		 default:!0
	   }
	},
    data(){
	  let t = this,
	      template = '\
	        <div class="_dialog_content">\
		       <div class="_dialog_title">\
			     <p>{{title}}</p>\
				 <span class="glyphicon glyphicon-remove" @click="close" :title="closeText"></span>\
			   </div>\
			   <div class="_dialog_box">'+
			   t.view.template
		    +'</div>\
			  <div class="_dialog_foot">\
			     <button v-show="hasSureBtn" type="button" class="btn btn-warning" @click="submit">\
				  {{sureText}}\
				 </button>\
				 <button v-show="hasCancelBtn" type="button" class="btn btn-default" @click="cancel">\
				  {{cancelText}}\
				 </button>\
			  </div>\
			</div>',
	     dialogView = {
	       extends:t.view,
		   data(){
		      return {
			    title:t.title,
				closeText:t.closeText,
				sureText:t.sureText,
				cancelText:t.cancelText,
				hasSureBtn:t.hasSureBtn,
				hasCancelBtn:t.hasCancelBtn
			  }
		   },
		   template:template,
		   methods:{
		      close(){
			     if(t.closeFun){
				    t.closeFun(t)&&t.close()
					// callback return true
				 }
			     else t.close()
			  },
			  submit(){
			    if(t.sureFun){
				    t.sureFun(t)&&t.close()
					// callback return true
				 }
			     else t.close()
			  },
			  cancel(){
			    if(t.cancelFun){
				    t.cancelFun(t)&&t.close()
					// callback return true
				 }
			     else t.close()
			  }
		   }
	    }
	  return {
	     currentView:dialogView
	  }
	}
  })

  export default {
	 data(){
	    return {
		   $_dialog_:null,
		   $_dom_:null
		}
	 },
     methods:{
	   open(cfg){
	      if(!this.$_dialog_){
		     let dialogdom = document.createElement("div"),
	         $dialog;
	         document.body.appendChild(dialogdom)
	         $dialog = new Dialog({propsData:cfg}).$mount()
             dialogdom.appendChild($dialog.$el)
			 this.$_dialog_ = $dialog;
			 this.$_dom_ = dialogdom;
		  }
		  this.$_dialog_.open()
	   },
	   close(){
	      if(this.$_dialog_) this.$_dialog_.close()
		  else return false
	   },
	   hide(){
	      if(this.$_dialog_) this.$_dialog_.hide()
		  else return false
	   },
	   destroy(){
	      if(this.$_dialog_) {
		    this.$_dialog_._destroy()
			this.$_dom_.remove()
		  }
		  else return false
	   }
	 }
  }
</script>
<style>
._dialog_content{
    min-width: 360px;
    min-height: 240px;
    border: solid 1px #dedede;
    box-shadow: 0 0 6px #999;
    padding: 8px;
}
._dialog_title {
    position: relative;
    height: 36px;
    line-height:36px;
    border-bottom:solid 1px #dedede;
    color: #999;
}
._dialog_title span{
    cursor:pointer;
    position:absolute;
    right:8px;
    top:8px;
}
._dialog_box{
   padding: 8px 0 36px;
}
._dialog_foot{
    position: absolute;
    bottom: 12px;
    width: 100%;
    text-align: center;
}
._dialog_foot .btn{
    margin: 0 12px;
}
</style>
