<template>
  <transition :name="currentTransition">
    <div
      :style="popStyle"
      v-show="value"
      class="mint-popup"
      :class="[
        position ? 'mint-popup-' + position : '',
        popupAlign === 'center' ? 'center' : '',
        popClass,
      ]"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<style>
@component-namespace mint {
  @component popup {
    position: fixed;
    background: #fff;
    backface-visibility: hidden;
    transition: 0.2s ease-out;

    &.center {
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }

    @descendent top {
      top: 0;
      right: auto;
      bottom: auto;

      &.center {
        left: 50%;
        top: 0;
        transform: translate3d(-50%, 0, 0);
      }
    }

    @descendent right {
      right: 0;
      bottom: auto;
      left: auto;

      &.center {
        top: 50%;
        right: 0;
        left: auto;
        transform: translate3d(0, -50%, 0);
      }
    }

    @descendent bottom {
      top: auto;
      right: auto;
      bottom: 0;
      padding-bottom: env(safe-area-inset-bottom);

      &.center {
        top: auto;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
      }
    }

    @descendent left {
      right: auto;
      bottom: auto;
      left: 0;

      &.center {
        top: 50%;
        left: 0;
        transform: translate3d(0, -50%, 0);
      }
    }
  }
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
  transform: translate3d(-50%, -100%, 0) !important;
}

.popup-slide-right-enter,
.popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0) !important;
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0) !important;
}

.popup-slide-left-enter,
.popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0) !important;
}

.popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}
</style>

<script>
import Popup from '@client/component/Vue/utils/popup';
import Vue from 'vue';
if (!Vue.prototype.$isServer) {
  require('@client/component/Vue/style/popup.css');
}

export default {
  name: 'mt-popup',

  mixins: [Popup],

  props: {
    modal: {
      default: true,
    },

    modalFade: {
      default: true,
    },

    lockScroll: {
      default: false,
    },

    popupAlign: {
      type: String,
      default: 'center',
    },
    popClass: {
      type: String,
    },

    closeOnClickModal: {
      default: true,
    },

    popupTransition: {
      type: String,
      default: 'popup-slide',
    },

    position: {
      type: String,
      default: '',
    },

    popStyle: {
      type: [Object, String],
    },
  },

  computed: {
    currentTransition() {
      if (this.popupTransition === 'popup-slide') {
        return `popup-slide-${this.position}`;
      }

      // slide or customize
      return this.popupTransition;
    },
  },

  mounted() {
    if (this.value) {
      this.rendered = true;
      this.open();
    }
  },
};
</script>
