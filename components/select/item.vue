<template>
  <li :value="item.id" @click="select" :title="item.name">
    <a :href="item.url">{{item.name}}</a>
    <span v-show="muti" class="glyphicon glyphicon-ok"></span>
  </li>
</template>
<script>
  export default {
    name: 'Item',
    props: ['item', 'muti','isSelected'],
    methods:{
      select(e){
        if(this.muti) this.$emit('select',this.item,e)
        else !this.isSelected && this.$emit('select',this.item,e)
      }
    }
  }

</script>
