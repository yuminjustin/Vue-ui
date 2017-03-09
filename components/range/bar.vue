<template>
  <div class="_bar" :style="{ left: left+ '%' }" @mousedown="mousedown" v-show="show">
    <i>{{fact}}</i>
    <span ref="bar"></span>
  </div>
</template>
<script>
  export default {
    props: ["fact","idx",'start','scale','step','isArea'],
    data(){
       return {
         isMe:!1 
       }
    },
    computed:{
      left(){
        return (this.fact-this.start)/this.step*this.scale - 0.5
      },
      show(){
         return (!this.isArea && !this.idx)?!1:!0
      }
    },
    mounted() {
      document.addEventListener('mousemove', (e) => {
        if(this.isMe) {
          this.$emit("move",this.idx,e.pageX)
        }
      }, false)
      document.addEventListener('mouseup', (e) => {
        if(this.isMe) {
           this.isMe = !1
           this.$emit("up")
        }
      }, false)
    },
    methods:{
      mousedown(e){
         e.preventDefault()
         this.isMe = !0
      }
    }
  }

</script>
