<template>
  <div class="_bar" :style="{ left: left+ '%' }" @mousedown="mousedown" @mouseup="isMe = !1">
    <i>{{fact}}</i>
    <span ref="bar"></span>
  </div>
</template>
<script>
  export default {
    props: ["fact","idx",'start','scale','step'],
    data(){
       return {
         isMe:!1 
       }
    },
    computed:{
      left(){
        return (this.fact-this.start)/this.step*this.scale - 0.5
      }
    },
    mounted() {
      document.addEventListener('mousemove', (e) => {
        if(this.isMe) {
          this.$emit("move",this.idx,e.pageX)
        }
      }, false)
      document.addEventListener('mouseup', (e) => {
        this.isMe = !1
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
