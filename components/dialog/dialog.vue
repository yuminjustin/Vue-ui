<script>
  import Vue from 'vue'
  import Popup from '../popup/popup'
  import View from './middleView'
  let Lang = ['提示', '关闭', '确定', '取消']

  export default {
    extends: Popup,
    name: 'Dialog',
    props: {
      title: {
        type: String,
        default: Lang[0]
      },
      closeText: {
        type: String,
        default: Lang[1]
      },
      closeFun: {
        type: Function,
        default: null
      },
      sureText: {
        type: String,
        default: Lang[2]
      },
      sureFun: {
        type: Function,
        default: null
      },
      cancelText: {
        type: String,
        default: Lang[3]
      },
      cancelFun: {
        type: Function,
        default: null
      },
      hasSureBtn: {
        type: Boolean,
        default: !0
      },
      hasCancelBtn: {
        type: Boolean,
        default: !0
      }
    },
    data() {
      let t = this,
        mixin = {
          data() {
            return {
              title: t.title,
              closeText: t.closeText,
              sureText: t.sureText,
              cancelText: t.cancelText,
              hasSureBtn: t.hasSureBtn,
              hasCancelBtn: t.hasCancelBtn,
              currentView: t.view
            }
          },
          methods: {
            close() {
              if (t.closeFun) {
                t.closeFun(t) && t.close()
                // callback return true
              } else t.close()
            },
            submit() {
              if (t.sureFun) {
                t.sureFun(t) && t.close()
                // callback return true
              } else t.close()
            },
            cancel() {
              if (t.cancelFun) {
                t.cancelFun(t) && t.close()
                // callback return true
              } else t.close()
            }
          }
        },
        dialogView = Vue.extend({
          extends: View,
          mixins: [mixin]
        })

      return {
        currentView: dialogView
      }
    }
  }

</script>
