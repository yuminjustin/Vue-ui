<template>
  <div class="_range">
    <div class="_range_area">
      <div is="Bar" v-for="(fact,idx) in facts" :fact="fact" :idx="idx" :start="start" :scale="scale" :step="step" :isArea="isArea" @move="move" @up="putout">
      </div>
      <div class="progress" ref="_progress">
        <div class="progress-bar" :style="{left:left+'%',width:width+'%'}"></div>
      </div>
      <div class="_scale">
        <span v-for="n in points" :style="{width:scale+'%'}" :class="islast(n.value)">
          {{n.value}}
        </span>
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
      },
      selectd: [Number, Array]
    },
    data() {
      let re = this.format();
      return {
        points: this.viewPort(),
        isArea:re.isArea,
        facts:re.facts,
        block: 0,
        pw: 0,
        begin: 0
      }
    },
    computed: {
      scale() {
        return (100 / (this.points.length - 1)).toFixed(2)
      },
      left() {
        let s = this.facts[0] < this.facts[1] ? this.facts[0] : this.facts[1]
        return (s-this.start)/this.step*this.scale 
      },
      width() {
        return Math.abs(this.facts[1] - this.facts[0])/this.step*this.scale
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
      islast(n) {
        let l = this.points[this.points.length - 1].value
        return n == l ? "_last" : ""
      },
      move(idx, x) {
        let n = Math.floor((x - this.begin) / (Number(this.scale) / 100 * this.pw));
        if(n<=0) n = 0
        if(n>=(this.points.length-1)) n = this.points.length-1
        this.$set(this.facts, idx, this.points[n].value)
      },
      viewPort() {
        let full = this.stop - this.start,
          arr = []
        for (let i = this.start; i <= this.stop; i+=this.step) {
          arr.push({
            value: i
          })
        }
        return arr
      },
      format() {
        var arr = [], isArea = !0;
        if(this.selectd instanceof Array){
            if(this.selectd.length == 2)   arr = this.selectd
            else if(this.selectd.length == 1)   {
              isArea = !1
              arr = [this.start, this.selectd[0]]
            }
            else arr = [this.start, this.stop]
        }
        else {
          isArea = !1
          arr = [this.start, this.selectd]
        }
        return {
          isArea:isArea,
          facts:arr
        }
      },
      putout(){
        if(this.isArea) this.$emit("ranged",this.facts)
        else this.$emit("ranged",this.facts[1])
      }
    }
  }

</script>
<style>
  ._range {
    min-width: 260px;
    position: relative;
    height: 56px;
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
    z-index: 2;
  }
  
  ._range .progress .progress-bar {
    position: absolute;
    top: 0;
    -webkit-transition: inherit;
    -o-transition: inherit;
    transition: inherit;
  }
  
  ._range ._scale {
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 22px;
    z-index: 1;
  }
  
  ._range_area ._scale span {
    display: block;
    float: left;
    font-size: 12px;
    position: relative;
    text-indent: -2px;
    line-height: 26px;
  }
  
  ._range_area ._scale span._last {
    position: absolute;
    left: 100%
  }
  
  ._range_area ._scale span:after {
    content: '';
    display: block;
    width: 1px;
    height: 5px;
    position: absolute;
    background: #000;
    top: 0;
    left: 0;
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
