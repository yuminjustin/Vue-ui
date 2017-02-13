<template>
  <li :value="item.id" @click="$emit('select',item)" :title="item.name">
    <a :href="item.url">{{item.name}}</a>
    <span v-show="muti" class="glyphicon glyphicon-ok"></span>
  </li>
</template>
<script>
  export default {
    name: 'Item',
    props: ['item', 'muti']
  }

</script>
