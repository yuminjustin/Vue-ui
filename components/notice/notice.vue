<template>
  <div :class="['_notice','alert',cn]" role="alert" @click="clickClose?close():''">
    <span :class="['glyphicon',icon]"></span> {{msg}}
  </div>
</template>
<script>
  import Popup from '../popup/popup'
  let Lang = ['这是一个提示']

  export default {
    extends: Popup,
    name: 'Notice',
    props: {
      type: {
        type: String,
        default: "normal"
      },
      msg: {
        type: String,
        default: Lang[0]
      },
      closeType: {
        type: Boolean,
        default: !0
      },
      clickClose: {
        type: Boolean,
        default: !1
      }
    },
    data() {
      let cn, icon
      switch (this.type) {
        case "load":
          cn = "info";
          icon = "refresh";
          break;
        case "error":
          cn = "danger";
          icon = "remove-sign";
          break;
        case "warn":
          cn = "warning";
          icon = "exclamation-sign";
          break;
        case "normal":
          cn = this.type;
          icon = "info-sign";
          break;
        case "success":
          cn = this.type;
          icon = "ok-sign";
          break;
      }
      return {
        cn: 'alert-' + cn,
        icon: 'glyphicon-' + icon
      }
    }
  }

</script>
<style>
  ._notice {
    position: fixed;
    z-index: 9999999;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 80%;
    word-break: break-all;
  }
  
  .alert-normal {
    background-color: #fff;
    border-color: #dedede!important;
  }
  
  ._notice .glyphicon {
    font-size: 18px;
    top: 3px!important;
  }
  
  ._notice .glyphicon-refresh {
    animation: load 1s infinite;
    -ms-animation: load 1s infinite;
    -moz-animation: load 1s infinite;
    -webkit-animation: load 1s infinite;
    -o-animation: load 1s infinite;
  }
  
  @keyframes load {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @-ms-keyframes load {
    from {
      -ms-transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
    }
  }
  
  @-moz-keyframes load {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
  
  @-webkit-keyframes load {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  
  @-o-keyframes load {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(360deg);
    }
  }

</style>
