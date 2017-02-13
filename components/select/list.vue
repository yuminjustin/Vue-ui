<template>
  <ul :class="['dropdown-menu',show?'_show':'',search?'_has_search':'']">
    <li class="input-group" v-show="search">
      <span class="glyphicon glyphicon-search" @click="autofocus"></span>
      <input type="text" class="form-control" :placeholder="searchText" @input="input" ref="keyword" :value="searchValue">
    </li>
    <li is="Item" v-for="item in list" :item="item" :muti="muti" :class="isSelected(item)" @select="select"></li>
  </ul>
</template>
<script>
  import Item from './item'
  let Lang = ['搜索关键字...', '--请选择--']
  export default {
    name: 'List',
    props: ['show', 'data', 'idx', 'pd', 'search', 'muti', 'selected'],
    data() {
      let init = (this.muti ? this.selected[0] : this.selected) == " " ? this.data[0].id : this.selected;
      return {
        init: init,
        list: this.data,
        searchText: Lang[0],
        searchValue: ""
      }
    },
    created() {
      if (this.idx == 0 && (this.selected == " " || !this.selected) && !this.pd) this.select(this.list[0])
    },
    components: {
      Item
    },
    watch: {
      data(arr) {
        this.list = arr
      }
    },
    methods: {
      select(item) {
        this.init = item.id
        this.$emit('select', item, this.idx)
      },
      input() {
        window.ssbox && clearTimeout(window.ssbox)
        window.ssbox = setTimeout(() => {
          this.findData(this.$refs.keyword.value)
        }, 8e2)
      },
      autofocus() {
        this.$refs.keyword.focus()
      },
      findData(value) {
        this.searchValue = value
        if (value) {
          let arr = [];
          this.data.map((item) => {
            if (value == item.name || value.indexOf(item.name) > -1 || item.name.indexOf(value) > -1) arr.push(
              item)
          })
          this.list = arr
        } else this.list = this.data
      },
      isSelected(item) {
        if (this.muti) {
          var cn = ""
          this.selected.map((s) => {
            s == item.id && (cn = "_selected")
          })
          return cn
        } else return this.selected == item.id ? "_selected" : ""
      }
    }
  }

</script>
<style>
  .dropdown-menu {
    max-height: 172px;
    overflow-y: auto;
  }
  
  .dropdown-menu._has_search {
    max-height: 202px;
  }
  
  .dropdown-menu._show {
    display: block
  }
  
  .dropdown-menu li .form-control {
    width: 96%;
    margin: 0 2%;
  }
  
  .dropdown-menu li {
    position: relative;
    cursor: pointer;
  }
  
  .dropdown-menu li._selected,
  .dropdown-menu li._selected a {
    background: #7cabce;
  }
  
  .dropdown-menu li._selected a {
    color: #fff;
  }
  
  .dropdown-menu li._selected a:hover {
    background: #7cabce;
    color: #fff;
  }
  
  .dropdown-menu li span {
    position: absolute;
    right: 6px;
    top: 6px;
    color: #ccc;
    z-index: 9;
  }
  
  .dropdown-menu li._selected span {
    color: #017201;
  }
  
  .dropdown-menu li span.glyphicon-search {
    top: 9px;
    cursor: text;
  }
  
  .dropdown-menu li span .dropdown-menu li span._on {
    color: #15c760;
  }

</style>
