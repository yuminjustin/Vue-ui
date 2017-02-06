<template>
<div class="_selectbox">
  <div class="btn-group">
    <button class="btn btn-default btn-sm dropdown-toggle" type="button" @click="open">
       {{text}}
       <span class="caret"></span>
    </button>
    <ul is="List" v-for="(data,idx) in lists" :idx="idx" :data="data" :pd="placeholder" :search="searchs[idx]" :selected="selecteds[idx]" :muti="muti" :show="show&&data.length" @select="select" :style="{ left: idx*160 + 'px' }">
    </ul>
  </div>
</div>
</template>

<script>
import Vue from 'vue'

 let Lang = ['搜索关键字...','--请选择--']

const Item = Vue.extend({
   name: 'Item',
   props:['item','muti'],
   template:'\
       <li :value="item.id" @click="$emit(\'select\',item)" :title="item.name">\
         <a :href="item.url">{{item.name}}</a>\
         <span v-show="muti" class="glyphicon glyphicon-ok"></span>\
       </li>\
   '
})

const List = Vue.extend({
   name: 'List',
   props:['show','data','idx','pd','search','muti','selected'],
   template:'\
      <ul :class="[\'dropdown-menu\',show?\'_show\':\'\',search?\'_has_search\':\'\']">\
        <li class="input-group" v-show="search">\
          <span class="glyphicon glyphicon-search" @click="autofocus"></span>\
          <input type="text" class="form-control" :placeholder="searchText" @input="input" ref="keyword" :value="searchValue">\
        </li>\
        <li is="Item" v-for="item in list" :item="item" :muti="muti" :class="isSelected(item)" @select="select"></li>\
     </ul>\
    ',
   data(){
      let init = (this.muti?this.selected[0]:this.selected) == " "?this.data[0].id:this.selected; 
      return {
        init:init,
        list:this.data,
        searchText:Lang[0],
        searchValue:""
      }
   },
   created(){
      if(this.idx==0&&(this.selected==" "||!this.selected)&&!this.pd) this.select(this.list[0])
   },
   components: {
     Item
   },
   watch:{
     data(arr){
       this.list = arr
     }
   },
   methods:{
     select(item){
	    this.init = item.id
	    this.$emit('select',item,this.idx) 
     },
     input(){
       window.ssbox&&clearTimeout(window.ssbox)
       window.ssbox = setTimeout(()=>{
         this.findData(this.$refs.keyword.value)
       },8e2)
     },
     autofocus(){
       this.$refs.keyword.focus()
     },
     findData(value){
       this.searchValue = value
       if(value){
         let arr = [];
         this.data.map((item)=>{
           if(value == item.name || value.indexOf(item.name)>-1 || item.name.indexOf(value)>-1) arr.push(item)
         })
         this.list = arr
       }
       else this.list = this.data
     },
	 isSelected(item){
	    if(this.muti){
		   var cn = ""
		   this.selected.map((s)=>{
		      s == item.id && (cn = "_selected")
		   })
		   return cn
		}
		else  return this.selected == item.id?"_selected":""
	 }
   }
})

export default {
  name: 'SelectBox',
  props:{
     data:{
	   type:Array,
       required: true,
	   default(){
         return []
       }
	 },
     muti:{
       type:Boolean,
	   default:!1
     },
     selected:{
       type:[Array,String,Number],
       default:" "
     },
     placeholder:{
       type:Boolean,
	   default:!1
     },
     placeholderText:{
       type:String,
	   default:Lang[1]
     },
     search:{
       type:[Array,Boolean],
	   default:!1
     },
     son:{
       type:Boolean,
	   default:!1
     }
  },
  data(){
     let lists = [],
         searchs = [],
         selecteds = []
     if(this.son){
       lists = this.getData()
       searchs = this.search instanceof Array?this.search:[]
       selecteds = this.selected instanceof Array?this.selected:[]
     }
     else {
	    let arr;
		if (this.data && this.data[0] instanceof Array) lists.push(this.data[0] || [])
		else lists.push(this.data|| [])
        searchs.push(this.search)
		if(this.muti) selecteds.push(this.selected!=" "?[this.selected]:[])
        else selecteds.push(this.selected)
     }
     return {
       show:!1,
       lists:lists,
       searchs:searchs,
       selecteds:selecteds
     }
  },
  computed:{
     text(){
        let text="";
		if(!this.selecteds.length || this.selecteds[0]==" "){
		   this.placeholder && (text = this.placeholderText)
		}
		else {
        if(this.son){
		   this.lists.map((list)=>{
		      list&&list.map((item)=>{
		        this.selecteds.map((s)=>{
		          text += String(item.id) == String(s)?item.name+"/":""
		        })
			  })
		   })
		   text = text.replace(/\/$/,"")
        }
        else {
          if(this.selecteds[0]){
		    let temp = this.selecteds[0];
			if(this.muti){
			   if(!temp.length) text=this.placeholderText
			   else {
			      this.lists[0].map((item)=>{
                    temp.map((s)=>{
		              text += String(item.id) == String(s)?item.name+",":""
		            })
                  })
			   }
			   text = text.replace(/\,$/,"")
			}
		    else this.lists[0].map((item)=>{
              item.id == temp && (text=item.name)
            })
          }
          else text=this.placeholderText
        }
		}
        return text
     }
  },
  components: {
     List
  },
  methods:{
     splice(){
     
     },
     open(){
        this.show = !this.show;
     },
     select(item,idx){
       if(!this.son) this.show = !1;
       else {
         if(idx==this.data.length-1) this.show = !1;
         else {
            let arr
            this.data[idx+1].filter((temp)=>{
               if(temp.fid==item.id) arr = temp
            })
			this.data.map((item,idxx)=>{
			   (idx+1<idxx) && this.$set(this.lists,idxx,[]) && this.$set(this.selecteds,idxx,"")
			})
			if(arr) this.$set(this.lists,idx+1,arr.list)
            else {
			   this.$set(this.lists,idx+1,[])
			   this.$set(this.selecteds,idx+1,"")
			   this.show = !1;
			}
         }
         
       }
       if(this.muti){
	      let arr2 = this.selecteds[idx],
		      k
		  arr2.map((temp,key)=>{
		     temp == item.id && (k = key)
		  })
		  if(k == undefined) arr2.push(item.id)
		  else arr2.splice(k,1)
	      this.$set(this.selecteds,idx,arr2)
	   }
	   else this.$set(this.selecteds,idx,item.id)
	   console.log(this.selecteds,item.id,item.name,idx)
     },
     getData(){
       if(!this.selected){
          return this.data.map((arr,idx)=>{
		     if(!idx) return arr
             else return []
		  })
       }
       else {
          return this.data.map((arr,idx)=>{
		     if(!idx)  return arr
			 else {
			    let temp
			    if(this.selected[idx]){
				   arr.map((item)=>{
				      item.fid == this.selected[idx-1] && (temp = item.list)
				   })
				}
				else temp = []
				return temp
			 }
          })
       }
     }
  }
}
</script>

<style>
  ._selectbox .dropdown-menu{
    width:160px;
  }
  .btn-group>button{
    min-width: 120px;
    text-align: left;
    line-height:24px;
  }
  .btn-group>button>span{
    float: right;
    margin: 8px 0px
  }
  .dropdown-menu{
    max-height: 172px;
    overflow-y: auto;
  }
  .dropdown-menu._has_search{
    max-height: 202px;
  }
  .dropdown-menu._show{
    display:block
  }
  .dropdown-menu li .form-control{
    width: 96%;
    margin: 0 2%;
  }
  .dropdown-menu li{
    position: relative;
    cursor: pointer;
  }
  .dropdown-menu li._selected,.dropdown-menu li._selected a{
    background: #7cabce;
  }
  .dropdown-menu li._selected a{
    color: #fff;
  }
  .dropdown-menu li._selected a:hover{
    background: #7cabce;
    color: #fff;
  }
  .dropdown-menu li span{
    position: absolute;
    right: 6px;
    top: 6px;
    color:#ccc;
    z-index: 9;
  }
  .dropdown-menu li._selected span{
    color: #017201;
  }
  .dropdown-menu li span.glyphicon-search{
    top: 9px;
    cursor: text;
  }
  .dropdown-menu li span
  .dropdown-menu li span._on{
    color:#15c760;
  }
</style>
