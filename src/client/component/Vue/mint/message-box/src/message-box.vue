<template>
  <div class="mint-msgbox-wrapper" :class="className">
    <transition name="msgbox-bounce">
      <div class="mint-msgbox" v-show="value">
        <div class="mint-msgbox-header" v-if="title !== ''">
          <div class="mint-msgbox-title">{{ title }}</div>
        </div>
        <div class="mint-msgbox-content" v-if="message !== ''">
          <div class="mint-msgbox-message" v-html="message"></div>
          <div class="mint-msgbox-input" v-if="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div class="mint-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
            <slot />
        </div>
        <div class="mint-msgbox-btns">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" v-tap="{method(){handleAction('cancel')}}">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" v-tap="{method(){handleAction('confirm')}}">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
  @component-namespace mint {
    @component msgbox {
      position: fixed;
      top: 50%;
      left: 52px;
      right: 52px;
      transform: translateY(-50%);
      background-color: #fff;
      /*width: 85%;*/
      border-radius: 3px;
      font-size: 16px;
      -webkit-user-select: none;
      overflow: hidden;
      backface-visibility: hidden;
      transition: .2s;

      @descendent header {
        padding: 15px 0 0;
      }

      @descendent content {
        padding: 20px 12px;
        border-bottom: 1px solid #ddd;
        position: relative;
      }

      @descendent input {
        padding-top: 15px;
        & input {
          border: 1px solid #dedede;
          border-radius: 5px;
          padding: 4px 5px;
          width: 100%;
          box-sizing: border-box;
          line-height: 20px;
          font-size: 14px;
          border-radius: 2px;
          appearance: none;
          outline: none;
        }
        & input.invalid {
          border-color: #ff4949;
          &:focus {
            border-color: #ff4949;
          }
        }
      }

      @descendent errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
      }

      @descendent title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      @descendent message {
        color: #000000;
        margin: 0;
        text-align: center;
          font-size:18px;
          font-weight: bold;
          line-height: 22px;
          & p{
            margin: 0;
          }
      }

      @descendent btns {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 44px;
        line-height: 44px;
      }

      @descendent btn {
        line-height: 44px;
        display: block;
        background-color: #fff;
        flex: 1;
        font-size: 18px;
        margin: 0;
        border: 0;
        color: #20bba9;

        &:focus {
          outline: none;
        }

        &:active {
          background-color: #fff;
        }
      }

      @descendent cancel {
        width: 50%;
        border-right: 1px solid #ddd;
        &:active {
          color: #20bba9;
        }
      }

      @descendent confirm {
        color: #20bba9;
        font-weight: bold;
        width: 50%;
        &:active {
         color: #20bba9;
        }
      }
    }
  }

  .msgbox-bounce-enter {
    opacity: 0;
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
  }
</style>
<style src="@client/component/Vue/style/popup.css"></style>

<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  import Popup from '@client/component/Vue/utils/popup';

  export default {
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      },
      className: {
        type: String,
        default: ''
      }
    },

    computed: {
      confirmButtonClasses() {
        let classes = 'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' mint-msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' mint-msgbox-cancel-highlight';
        }
        return classes;
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              this.$refs.input.classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        this.$refs.input.classList.remove('invalid');
        return true;
      },

      handleInputType(val) {
        if (val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      value(val) {
        this.handleInputType(this.inputType);
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus();
            }
          }, 500);
        }
      },

      inputType(val) {
        this.handleInputType(val);
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      };
    }
  };
</script>
