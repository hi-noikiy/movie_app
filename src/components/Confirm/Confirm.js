import Toast from './Confirm.vue';

var toast = {};
var toastVM = null;

Toast.install = function(Vue, options) {
  Vue.prototype.$confirm = (content, type) => {
    if(!toastVM) {
      let toastTpl = Vue.extend(Toast);
      toastVM = new toastTpl();
      let tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }

    toastVM.show = true;
    toastVM.content = content;

    return new Promise((resolve, reject) => {
      let sure = toastVM.sure;
      let cancel = toastVM.cancel;
      toastVM.sure = () => {
        sure()
        resolve('sure');
      }

      toastVM.cancel = () => {
        cancel()
        resolve('cancel');
      }
    })
  }
}

export default Toast;