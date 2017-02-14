<template>
  <div>
    <Range :start="0" :stop="100" :step="1"/>
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
