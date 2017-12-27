import Confirm from './Confirm.vue';
import ToastComponent from './ToastComponent.vue';

var Util = {};
var toastVM = null;
var confirmVM = null;

Util.install = function(Vue, options) {
  Vue.prototype.$confirm = (content, type) => {
    if(!confirmVM) {
      let toastTpl = Vue.extend(Confirm);
      confirmVM = new toastTpl();
      let tpl = confirmVM.$mount().$el
      document.body.appendChild(tpl)
    }

    confirmVM.show = true;
    confirmVM.content = content;

    return new Promise((resolve, reject) => {
      let sure = confirmVM.sure;
      let cancel = confirmVM.cancel;
      confirmVM.sure = () => {
        sure()
        resolve('sure');
      }

      confirmVM.cancel = () => {
        cancel()
        resolve('cancel');
      }
    })
  }

  Vue.prototype.$toast = (content, type, time) => {
    if(!toastVM) {
      let toastTpl = Vue.extend(ToastComponent);
      toastVM = new toastTpl();
      let tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }

    toastVM.show = true;
    toastVM.content = content;
    toastVM.type = type?type:'success';

    setTimeout(() => {
      toastVM.show = false;
    }, time?time:800)
  }
}

export default Util;