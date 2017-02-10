<script>
  import Vue from 'vue'
  import Popup from './popup'

  const popComs = Vue.extend(Popup)

  export default {
    data() {
      return {
        $_pop_: null,
        $_dom_: null,
      }
    },
    methods: {
      open(cfg) {
        if (!this.$_pop_) {
          let popdom = document.createElement("div"),
            $pop;
          document.body.appendChild(popdom)
          $pop = new popComs({
            propsData: cfg
          }).$mount()
          popdom.appendChild($pop.$el)
          this.$_pop_ = $pop;
          this.$_dom_ = popdom;
        }
        this.$_pop_.open()
      },
      close() {
        if (this.$_pop_) this.$_pop_.close()
        else return false
      },
      hide() {
        if (this.$_pop_) this.$_pop_.hide()
        else return false
      },
      destroy() {
        if (this.$_pop_) {
          this.$_pop_._destroy()
          this.$_dom_.remove()
        } else return false
      }
    }
  }

</script>
