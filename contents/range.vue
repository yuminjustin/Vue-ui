<template>
  <div>
    <Range :start="-10" :stop="10" :step="2" :selectd="[2,8]"/>
  </div>
</template>
<script>
  import Range from "../components/range"
  export default {
    components:{
      Range
    }
  }

</script>
