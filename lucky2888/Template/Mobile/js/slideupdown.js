 //animate模块
    ; (function ($, undefined) {
        var prefix = '', eventPrefix,
          vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
          testEl = document.createElement('div'),
          supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
          transform,
          transitionProperty, transitionDuration, transitionTiming, transitionDelay,
          animationName, animationDuration, animationTiming, animationDelay,
          cssReset = {}

        function dasherize(str) { return str.replace(/([A-Z])/g, '-$1').toLowerCase() }
        function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

        if (testEl.style.transform === undefined) $.each(vendors, function (vendor, event) {
            if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
                prefix = '-' + vendor.toLowerCase() + '-'
                eventPrefix = event
                return false
            }
        })

        transform = prefix + 'transform'
        cssReset[transitionProperty = prefix + 'transition-property'] =
        cssReset[transitionDuration = prefix + 'transition-duration'] =
        cssReset[transitionDelay = prefix + 'transition-delay'] =
        cssReset[transitionTiming = prefix + 'transition-timing-function'] =
        cssReset[animationName = prefix + 'animation-name'] =
        cssReset[animationDuration = prefix + 'animation-duration'] =
        cssReset[animationDelay = prefix + 'animation-delay'] =
        cssReset[animationTiming = prefix + 'animation-timing-function'] = ''

        $.fx = {
            off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
            speeds: { _default: 400, fast: 200, slow: 600 },
            cssPrefix: prefix,
            transitionEnd: normalizeEvent('TransitionEnd'),
            animationEnd: normalizeEvent('AnimationEnd')
        }

        $.fn.animate = function (properties, duration, ease, callback, delay) {
            if ($.isFunction(duration))
                callback = duration, ease = undefined, duration = undefined
            if ($.isFunction(ease))
                callback = ease, ease = undefined
            if ($.isPlainObject(duration))
                ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
            if (duration) duration = (typeof duration == 'number' ? duration :
                            ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
            if (delay) delay = parseFloat(delay) / 1000
            return this.anim(properties, duration, ease, callback, delay)
        }

        $.fn.anim = function (properties, duration, ease, callback, delay) {
            var key, cssValues = {}, cssProperties, transforms = '',
                that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
                fired = false

            if (duration === undefined) duration = $.fx.speeds._default / 1000
            if (delay === undefined) delay = 0
            if ($.fx.off) duration = 0

            if (typeof properties == 'string') {
                // keyframe animation
                cssValues[animationName] = properties
                cssValues[animationDuration] = duration + 's'
                cssValues[animationDelay] = delay + 's'
                cssValues[animationTiming] = (ease || 'linear')
                endEvent = $.fx.animationEnd
            } else {
                cssProperties = []
                // CSS transitions
                for (key in properties)
                    if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
                    else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

                if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
                if (duration > 0 && typeof properties === 'object') {
                    cssValues[transitionProperty] = cssProperties.join(', ')
                    cssValues[transitionDuration] = duration + 's'
                    cssValues[transitionDelay] = delay + 's'
                    cssValues[transitionTiming] = (ease || 'linear')
                }
            }

            wrappedCallback = function (event) {
                if (typeof event !== 'undefined') {
                    if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
                    $(event.target).unbind(endEvent, wrappedCallback)
                } else
                    $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

                fired = true
                $(this).css(cssReset)
                callback && callback.call(this)
            }
            if (duration > 0) {
                this.bind(endEvent, wrappedCallback)
                // transitionEnd is not always firing on older Android phones
                // so make sure it gets fired
                setTimeout(function () {
                    if (fired) return
                    wrappedCallback.call(that)
                }, ((duration + delay) * 1000) + 25)
            }

            // trigger page reflow so new elements can animate
            this.size() && this.get(0).clientLeft

            this.css(cssValues)

            if (duration <= 0) setTimeout(function () {
                that.each(function () { wrappedCallback.call(this) })
            }, 0)

            return this
        }

        testEl = null
    })(Zepto)
    //动画效果模块
    ; (function ($, undefined) {
        var document = window.document, docElem = document.documentElement,
          origShow = $.fn.show, origHide = $.fn.hide, origToggle = $.fn.toggle

        function anim(el, speed, opacity, scale, callback) {
            if (typeof speed == 'function' && !callback) callback = speed, speed = undefined
            var props = { opacity: opacity }
            if (scale) {
                props.scale = scale
                el.css($.fx.cssPrefix + 'transform-origin', '0 0')
            }
            return el.animate(props, speed, null, callback);
        }

        function hide(el, speed, scale, callback) {
            return anim(el, speed, 0, scale, function () {
                origHide.call($(this))
                callback && callback.call(this)
            })
        }

        $.fn.show = function (speed, callback) {
            origShow.call(this)
            //不是很理解作者的想法，如果这里继续执行下去，所有调用zepto原生show事件的元素，都会被这个事件覆盖，并且透明度都为被设为1...
            if (speed === undefined) return origShow.call(this) // 原版为：if (speed === undefined) speed = 0
            else this.css('opacity', 0)
            return anim(this, speed, 1, '1,1', callback)
        }

        $.fn.hide = function (speed, callback) {
            if (speed === undefined) return origHide.call(this)
            else return hide(this, speed, '0,0', callback)
        }

        $.fn.toggle = function (speed, callback) {
            if (speed === undefined || typeof speed == 'boolean')
                return origToggle.call(this, speed)
            else return this.each(function () {
                var el = $(this)
                el[el.css('display') == 'none' ? 'show' : 'hide'](speed, callback)
            })
        }

        $.fn.fadeTo = function (speed, opacity, callback) {
            return anim(this, speed, opacity, null, callback)
        }

        $.fn.fadeIn = function (speed, callback) {
            var target = this.css('opacity')
            if (target > 0) this.css('opacity', 0)
            else target = 1
            return origShow.call(this).fadeTo(speed, target, callback)
        }

        $.fn.fadeOut = function (speed, callback) {
            return hide(this, speed, null, callback)
        }

        $.fn.fadeToggle = function (speed, callback) {
            return this.each(function () {
                var el = $(this)
                el[
                  (el.css('opacity') == 0 || el.css('display') == 'none') ? 'fadeIn' : 'fadeOut'
                ](speed, callback)
            })
        }

        $.fn.slideDown = function (speed, callback) {
			
            //获取元素position
            var position = this.css('position');
            this.show().css({
                position: 'absolute',
                visibility: 'hidden'
            });
            //获取元素高度
            var height = this.height() === 0 ? $(window).height() : this.height();

            //-------通过伸缩元素高度实现动画-------
//            return this.css({
//                position: position,
//                visibility: 'visible',
//                overflow: 'auto',
//                height: 0
//            }).animate({ height: height }, speed, null, callback);

            //-------通过移动元素相对位置实现动画-------
            return this.css({
                top: -height,
                left: 0,
                position: position,
                visibility: 'visible',
                overflow: 'auto'
            }).animate({ top: 0 }, speed, null, callback);
        };

        $.fn.slideUp = function (speed, callback) {
            //获取元素position
            var position = this.css('position');
            this.hide().css({
                position: 'absolute',
                visibility: 'auto'
            });
            //获取元素高度
            var height = this.height();

            //-------通过伸缩元素高度实现动画-------
//            return this.css({
//                position: position,
//                visibility: 'visible',
//                overflow: 'hidden',
//                height: height
//            }).animate({ height: 0 }, speed, null, callback);

            //-------通过移动元素相对位置实现动画-------
            return this.css({
                left: 0,
                position: position,
                visibility: 'visible',
                overflow: 'auto'
            }).animate({ top: -height }, speed, null, callback);
        };

        $.fn.slideLeft = function (speed, callback) {
            //获取元素position
            var position = this.css('position');
            this.show().css({
                position: 'absolute',
                visibility: 'hidden'
            });
            //获取元素宽度
            var width = this.width();

            //-------通过伸缩元素宽度实现动画-------
            //return this.css({
            //    top: 0,
            //    position: position,
            //    visibility: 'visible',
            //    overflow: 'auto'
            //}).animate({ width: 0 }, speed, null, callback);

            //-------通过移动元素相对位置实现动画-------
            return this.css({
                top: 0,
                position: position,
                visibility: 'visible',
                overflow: 'auto'
            }).animate({ left: -width }, speed, null, callback);
        };

        $.fn.slideRight = function (speed, callback) {
            //获取元素position
            var position = this.css('position');
            this.show().css({
                position: 'absolute',
                visibility: 'hidden'
            });
            //获取元素宽度
            var width = this.width() === 0 ? $(window).width() : this.width();

            //-------通过伸缩元素宽度实现动画-------
            //return this.css({
            //    top: 0,
            //    width: 0,
            //    position: position,
            //    visibility: 'visible',
            //    overflow: 'auto'
            //}).animate({ width: width }, speed, null, callback);

            //-------通过移动元素相对位置实现动画-------
            return this.css({
                top: 0,
                left: -width,
                position: position,
                visibility: 'visible',
                overflow: 'auto',
            }).animate({ left: 0 }, speed, null, callback);
        };
    })(Zepto)