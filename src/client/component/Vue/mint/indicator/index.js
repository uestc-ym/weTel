import Vue from 'vue';
import IndicatorComp from './src/indicator.vue';

const Indicator = Vue.extend(IndicatorComp);
let instance;

export default {
  open(options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    instance.text = typeof options === 'string' ? options : options.text || '';
    instance.spinnerType = options.spinnerType || 'snake';
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  update(text) {
    if (!instance) {
      return
    }
    instance.text = text;
  },

  close() {
    if (instance) {
      Vue.nextTick(() => {
        instance.visible = false;
      });
    }
  }
};
