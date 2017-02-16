<template>
  <div :class="['_pop',isshow]">
    <div :class="mask_cn" @click="maskclose"></div>
    <div class="_pop_content" v-bind:is="currentView">
      I'm a Popup
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Popup',
    props: {
      show: {
        type: Boolean,
        default: !1
      },
      mask: {
        type: Boolean,
        default: !0
      },
      maskClose: {
        type: Boolean,
        default: !0
      },
      closeType: {
        type: Boolean, // true:destroy false:hide
        default: !1
      },
      view: {
        type: Object,
        default: null
      }
    },
    computed:{
        mask_cn(){
          return this.mask?'_black_mask':''
        },
        isshow(){
          return this.show?'':'_none'
        }  
    },
    data() {
      return {
        currentView: this.view
      }
    },
    methods: {
      splice() {},
      open() {
        this.show = !0
      },
      maskclose() {
        if (this.mask && this.maskClose) this.close()
      },
      close() {
        if (this.closeType) this._destroy()
        else this.hide()
      },
      hide() {
        this.show = !1
      },
      _destroy() {
        this.$destroy()
      }
    },
    destroyed() {
      this.$el.remove()
    }
  }

</script>
<style>
  ._none {
    display: none;
  }
  
  ._black_mask {
    background: rgba(0, 0, 0, .45);
    position: fixed;
    z-index: 9999991;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  ._pop_content {
    position: fixed;
    z-index: 9999992;
    left: 50%;
    top: 50%;
    min-width: 160px;
    min-height: 160px;
    background: #fff;
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 3px;
    padding: 4px;
  }

</style>
