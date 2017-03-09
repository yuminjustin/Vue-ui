<template>
  <div>
    <Range :start="-10" :stop="10" :step="0.5" :selectd="[5.5]" @ranged="ranged"/>
  </div>
</template>
<script>
  import Range from "../components/range"
  export default {
    components:{
      Range
    },
    methods:{
      ranged(s){
         console.log(s)
      }
    }
  }

</script>
