/**
 @Name：fixable v1.0.0 固定尺寸比例伸缩页面
 @Author：huaianfox
 @email: 283334883@qq.com
 @License：MIT
 */

(function fixable(window, document) {
  var rescale = 0,
    metaStr = '',
    meta = Array.prototype.slice.call(document.querySelectorAll('meta[name="viewport"]'), -1)[0] || function () {
      var meta = document.createElement('meta');
      meta.name = 'viewport';
      document.querySelector('head').appendChild(meta);
      return meta;
    }(),
    setScale = function () {
      var scale = window.screen.width / width;
      if (rescale === scale) {
        return;
      }
      rescale = scale;
      meta.content = metaStr.replace(/\{s\}/g, scale);
    };
  width = parseInt(meta.getAttribute("view-width")) || 750;
  metaStr = 'width=' + width + ',initial-scale={s},minimum-scale={s},maximum-scale={s},user-scalable=no',
    throttle = function (func, wait) {
      var timeout = null;
      return function () {
        var content = this, args = arguments;
        if (!timeout) {
          timeout = setTimeout(function () {
            timeout = null;
            func.apply(content, args);
          }, wait)
        }
      }
    };

  setScale();

  // reset scale on page resize, throttle
  window.addEventListener('resize', throttle(setScale, 100), false);

  // page from cache or back
  window.addEventListener('pageshow', function (e) {
    if (e.persisted || window.performance &&
      window.performance.navigation.type == 2) {
      setScale()
    }
  }, false);

})(window, document);