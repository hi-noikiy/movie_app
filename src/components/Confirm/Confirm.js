import Confirm from './Confirm.vue';
import ToastComponent from './ToastComponent.vue';
import PopComponent from './Pop.vue';

var Util = {};
var toastVM = null;
var confirmVM = null;
var popVM = null;

Util.install = function(Vue, options) {
  Vue.prototype.$confirm = (content,title,type) => {
    if(!confirmVM) {
      let toastTpl = Vue.extend(Confirm);
      confirmVM = new toastTpl();
      let tpl = confirmVM.$mount().$el
      document.body.appendChild(tpl)
    }

    confirmVM.show = true;
    confirmVM.content = content;
    if(title) {
      confirmVM.title = title;
    }
    if(type) {
      confirmVM.type = type;
    }

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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        toastVM.show = false;
        resolve();
      }, time?time:800)
    })
  }

  Vue.prototype.$pop = (content) => {
    console.log('piop')
    if(!popVM) {
      let popTpl = Vue.extend(PopComponent);
      popVM = new popTpl();
      let tpl = popVM.$mount().$el
      document.body.appendChild(tpl)
      console.log('create')
    }

    popVM.show = true;
    popVM.content = content;

  }
}

export default Util;