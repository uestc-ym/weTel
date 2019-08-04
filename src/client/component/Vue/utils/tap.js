function isPc() {
  const uaInfo = navigator.userAgent;
  const agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function isTap(self) {
  if (self.disabled) {
    return false;
  }
  const tapObj = self.tapObj;
  return self.time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10;
}

function touchstart(e, self) {
  const touches = e.touches[0];
  const tapObj = self.tapObj;
  tapObj.pageX = touches.pageX;
  tapObj.pageY = touches.pageY;
  tapObj.clientX = touches.clientX;
  tapObj.clientY = touches.clientY;
  self.time = +new Date();
}

function touchend(e, self) {
  const touches = e.changedTouches[0];
  const tapObj = self.tapObj;
  self.time = +new Date() - self.time;
  tapObj.distanceX = tapObj.pageX - touches.pageX;
  tapObj.distanceY = tapObj.pageY - touches.pageY;

  if (!isTap(self)) return;
  self.handler(e);
}

const tapDirective = {
  bind: function (el, binding) {
    const {value,modifiers = {}} = binding;
    el.tapObj = {};
    el.handler = function (e,isPc) { //This directive.handler

      if (!value && el.href && !modifiers.prevent) {
        window.location = el.href;
        return;
      }
      const tagName = e.target.tagName.toLocaleLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        return e.target.focus();
      }

      const method = value.method;
      method();
    };
    if (isPc()) {
      el.addEventListener('click', function (e) {

        if (modifiers.stop) {
          e.stopPropagation();
        }
        if (modifiers.prevent) {
          e.preventDefault();
        }
        el.handler(e, true)
      }, false);
    } else {
      el.addEventListener('touchstart', function (e) {

        if (modifiers.stop) {
          e.stopPropagation();
        }
        if (modifiers.prevent) {
          e.preventDefault();
        }
        touchstart(e, el);
      }, false);
      el.addEventListener('touchend', function (e) {
        try {
          Object.defineProperty(e, 'currentTarget', {// 重写currentTarget对象 与jq相同
            value: el,
            writable: true,
            enumerable: true,
            configurable: true
          })
        } catch (e) {
          // ios 7下对 e.currentTarget 用defineProperty会报错。
          // 报“TypeError：Attempting to configurable attribute of unconfigurable property”错误
          // 在catch里重写
          console.error(e.message)
          e.currentTarget = el
        }
        e.preventDefault();

        return touchend(e, el);
      }, false);
    }
  },
  componentUpdated : function(el,binding) {
    const {value,modifiers = {}} = binding;
    el.tapObj = {};
    el.handler = function (e,isPc) { //This directive.handler
      if (!value && el.href && !modifiers.prevent) {
        return window.location = el.href;
      }
      const tagName = e.target.tagName.toLocaleLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        return e.target.focus();
      }
      const method = value.method;
      method();
    };
  },
  unbind: function (el) {
    // 卸载，别说了都是泪
    el.handler = function () {};
  }
};

export default tapDirective;
