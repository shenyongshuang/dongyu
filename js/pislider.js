(function ($) {
    $.fn.slider = function (options) {

        options.sliderBox = this.find(options.sliderBox);
        options.sliderBox.append(this.find(options.sliderChild).eq(0).clone(true));
        options.sliderItem = this.find(options.sliderItem);
        options.btnPrev = this.find(options.btnPrev);
        options.btnNext = this.find(options.btnNext);
        options.sliderChild = this.find(options.sliderChild);

        var isStar = false,
            sliderHeight = $(this).height(),//组件的高度
            sliderWidth = $(this).width(),//组件的宽度
            length = options.sliderChild.length,//组件的length
            isAnimate,
            sliderItemA = '',
            _this = this;

        for (var i = 0; i < length - 1; i++) {
            sliderItemA += '<li></li>';
        }
        options.sliderItem.html(sliderItemA);
        options.sliderItemA = options.sliderItem.find("li");
        options.sliderItemA.eq(0).addClass("cur");

        if (this) {
            isStar = true;
            slideStyle();
            nextAnimate();
            options.btnPrev.on("click", prev);//
            options.btnNext.on("click", next);//
            options.sliderItemA.on("click", jump)
        }
        else {
            return;
        }

        $(window).resize(function () {
            clearSet();
            sliderHeight = $(_this).height();//组件的高度
            sliderWidth = $(_this).width();//组件的宽度
            slideStyle();
            nextAnimate()
        });

        function slideStyle() {
            options.sliderChild.css({
                "width": sliderWidth,
                "height": sliderHeight,
                "float": "left"
            }).fadeIn(200);
            options.sliderBox.css({
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": sliderWidth * length,
                "height": sliderHeight
            })
        }

        function nextAnimate() {
            if (options.isSlider) {
                isAnimate = setInterval(isNextAn, options.timer)
            }
        }

        function jump() {
            clearSet();
            options.item = $(this).index();
            optionsAn();
            nextAnimate()
        }

        function clearSet() {
            clearInterval(isAnimate)
        }

        function prev() {
            if (isStar) {
                isStar = false;
            } else {
                return;
            }
            clearSet();
            options.item--;
            if (options.item < 0) {
                options.sliderBox.css("left", -(sliderWidth * (length - 1)));
                options.item = length - 1;
                if (options.item == length - 1) {
                    options.item--;
                    options.sliderBox.animate({
                        left: -(sliderWidth * options.item)
                    }, options.animateTime);
                    isStar = true;
                }
            } else {
                optionsAn()
            }
            nextAnimate()
        }

        function next() {
            if (isStar) {
                isStar = false;
            } else {
                return;
            }
            clearSet();
            options.item++;
            if (options.item > length - 1) {
                options.item = 0;
                optionsAn()
            } else {
                optionsAn()
            }
            nextAnimate()
        }

        function isNextAn() {
            options.item++;
            if (options.item < length - 1 && options.item >= 0) {
                optionsAn();
            } else if (options.item < 0) {
                options.item = 0;
                options.sliderBox.animate({
                    left: 0
                }, options.animateTime)
            } else if (options.item > length - 1) {
                options.item = 0;
                optionsAn()
            } else {
                optionsAn()
            }
        }

        function optionsAn() {
            options.sliderBox.animate({
                left: -(sliderWidth * options.item)
            }, options.animateTime, function () {
                if (options.item >= length - 1) {
                    options.sliderBox.css("left", 0);
                    options.item = 0;
                }
                options.sliderItemA.removeClass("cur").eq(options.item).addClass("cur");
                isStar = true;
            })

        }
    }
})
(jQuery);