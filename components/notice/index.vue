<script>
  import Vue from 'vue'
  import Notice from './notice'

  let noticeComs = Vue.extend(Notice)

  export default {
    data() {
      return {
        duration: 3e3
      }
    },
    methods: {
      open(cfg) {
        cfg.type = (typeof cfg.type == "string" && cfg.type) ? cfg.type : "normal"
        let noticedom = document.createElement("div"),
          $notice;
        document.body.appendChild(noticedom)
        $notice = new noticeComs({
          propsData: cfg
        }).$mount()
        noticedom.appendChild($notice.$el)
        $notice.open()
        setTimeout(() => {
          $notice._destroy()
          noticedom.remove()
        }, cfg.duration || this.duration)
      }
    }
  }

</script>
