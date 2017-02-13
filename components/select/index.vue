<template>
<div class="_selectbox">
  <div class="btn-group">
    <button class="btn btn-default btn-sm dropdown-toggle" type="button" @click="open">
       {{text}}
       <span class="caret"></span>
    </button>
    <ul is="List" v-for="(data,idx) in lists" :idx="idx" :data="data" :pd="placeholder" :search="searchs[idx]" :selected="selecteds[idx]" :muti="ismuti" :show="show&&data.length" @select="select" :style="{ left: idx*160 + 'px' }">
    </ul>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import List from './list'

let Lang = ['--请选择--']

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
	   default:Lang[0]
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
         selecteds = [],
		 ismuti = this.muti
     if(this.son){/*联动*/
       lists = this.getData()
       searchs = this.search instanceof Array?this.search:[]
	   selecteds = this.selected instanceof Array?this.selected:[]
       /*联动不支持多选*/
	   ismuti = !1
     }
     else {/*非联动*/
	    let arr;
		if (this.data && this.data[0] instanceof Array) lists.push(this.data[0] || [])
		else lists.push(this.data|| [])
        searchs.push(this.search)
		if(ismuti) {/*多选*/
		   let temp = this.selected instanceof Array?this.selected:[this.selected]
		   selecteds.push(this.selected[0]!=" "?temp:[])
		}
        else selecteds.push(this.selected)
     }
     return {
       show:!1,
       lists:lists,
       searchs:searchs,
       selecteds:selecteds,
	   ismuti:ismuti
     }
  },
  computed:{
     text(){
        /*文字显示*/ 
        let text="";
		if(!this.selecteds.length || this.selecteds[0]==" "){
		   this.placeholder && (text = this.placeholderText)
		}
		else {
        if(this.son){/*联动*/
		   this.lists.map((list)=>{
		      list&&list.map((item)=>{
		        this.selecteds.map((s)=>{
		          text += String(item.id) == String(s)?item.name+"/":""
		        })
			  })
		   })
		   text = text.replace(/\/$/,"")
        }
        else {/*非联动*/
          if(this.selecteds[0]){
		    let temp = this.selecteds[0];
			if(this.muti){/*多选*/
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
            /*非多选*/
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
       /*选择*/
       let isPush = !0 
       if(!this.son) this.show = !1;
       else {
         if(idx==this.data.length-1) this.show = !1;
         else {
            let arr
            isPush = !1;
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
               isPush = !0;
			}
         }
       }
       if(this.ismuti){
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
	   isPush && this.pushOut()
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
     },
	 pushOut(){/*对外输出*/
	    let arr = [],
		    temp = this.ismuti? this.selecteds[0]:this.selecteds;
	    temp.map((s,k)=>{
		    let list = this.ismuti?this.lists[0]:this.lists[k]
		    list&&list.map((item)=>{
			   item.id==s && arr.push({
				   id:item.id,
				   name:item.name
			   })
			})
		 })
	    this.$emit("select",arr)
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
</style>
