<script>
  import Vue from 'vue'
  import Dialog from './dialog'

  const dialogComs = Vue.extend(Dialog)

  export default {
    data() {
      return {
        $_dialog_: null,
        $_dom_: null
      }
    },
    methods: {
      open(cfg) {
        if (!this.$_dialog_) {
          let dialogdom = document.createElement("div"),
            $dialog;
          document.body.appendChild(dialogdom)
          $dialog = new dialogComs({
            propsData: cfg
          }).$mount()
          dialogdom.appendChild($dialog.$el)
          this.$_dialog_ = $dialog;
          this.$_dom_ = dialogdom;
        }
        this.$_dialog_.open()
      },
      close() {
        if (this.$_dialog_) this.$_dialog_.close()
        else return false
      },
      hide() {
        if (this.$_dialog_) this.$_dialog_.hide()
        else return false
      },
      destroy() {
        if (this.$_dialog_) {
          this.$_dialog_._destroy()
          this.$_dom_.remove()
        } else return false
      }
    }
  }

</script>
<style>
  ._dialog_content {
    min-width: 360px;
    min-height: 240px;
    border: solid 1px #dedede;
    box-shadow: 0 0 6px #999;
    padding: 8px;
  }
  
  ._dialog_title {
    position: relative;
    height: 36px;
    line-height: 36px;
    border-bottom: solid 1px #dedede;
    color: #999;
  }
  
  ._dialog_title span {
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 8px;
  }
  
  ._dialog_box {
    padding: 8px 0 36px;
  }
  
  ._dialog_foot {
    position: absolute;
    bottom: 12px;
    width: 100%;
    text-align: center;
  }
  
  ._dialog_foot .btn {
    margin: 0 12px;
  }

</style>
