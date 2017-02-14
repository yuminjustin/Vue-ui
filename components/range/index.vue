<template>
  <div class="_range">
    <div class="_range_area">
      <div is="Bar" v-for="(point,idx) in points" :point="point" :idx="idx" @move="move">
      </div>
      <div class="progress" ref="_progress">
        <div class="progress-bar" :style="{width: stop +'%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bar from "./bar"
  export default {
    props: {
      start: {
        type: Number,
        default: null
      },
      stop: {
        type: Number,
        default: null
      },
      step: { /*步幅*/
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        isRange: !isNaN(this.start) && !isNaN(this.stop),
        points: [this.start, this.stop],
        pw: 0,
        begin: 0
      }
    },
    components: {
      Bar
    },
    mounted() {
      this.pw = Math.floor(this.$refs._progress.getBoundingClientRect().width)
      this.begin = Math.floor(this.$refs._progress.getBoundingClientRect().left)
    },
    methods: {
      move(idx, x) {
        if ((x - this.begin) >= 0 && (x - this.begin) <= this.pw) {
          let n = Math.floor((x - this.begin) / this.pw * 100);
          if(!(n%this.step)) this.$set(this.points, idx, n)
        }
      }
    }
  }

</script>
<style>
  ._range {
    min-width: 260px;
    position: relative;
    height: 40px;
    overflow: hidden;
  }
  
  ._range ._range_area {
    width: 92%;
    margin: 0 auto;
    position: relative;
    height: 100%;
  }
  
  .glyphicon-plus._range_btn {
    left: 2%;
  }
  
  .glyphicon-minus._range_btn {
    right: 2%;
  }
  
  ._range .progress {
    position: absolute;
    height: 10px!important;
    top: 24px;
    width: 100%;
  }
  
  ._range_area ._bar {
    position: absolute;
    height: 100%;
    z-index: 9;
    min-width: 18px;
    top: 0px;
    left: -5px;
  }
  
  ._range_area ._bar i {
    background: #000000;
    color: #fff;
    text-align: center;
    height: 16px;
    line-height: 16px;
    border-radius: 4px;
    padding: 0 2px;
    min-width: 16px;
    display: block;
    font-style: normal;
    font-size: 12px;
    position: absolute;
    left: 50%;
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  
  ._range_area ._bar span {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border: solid 1px #dedede;
    background: #fff;
    cursor: pointer;
    margin-top: 20px;
  }
  
  ._range_area ._bar:hover span {
    background: #D9534F;
    border-color: #B94743;
  }

</style>
