import Base from 'js_core/base-controller';

export default class Prices extends Base {

    /**
     * Инициализация слайдера
     *
     * @returns {boolean}
     */
    _init() {
        this.$link = $('[data-js="show-more-prices-link"]');
        this.$elements = $('[data-js="show-more-prices"]');
        this.hideArrLen = 3;
        this.$wrappers = $('[data-js-slider="prices-slider-wrapper"]');

        let options = {
            infinite: false,
            cssEase: 'linear',
            speed: 500,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: $('[data-js-arrow-next="prices-slider-wrapper"]'),
            prevArrow: $('[data-js-arrow-prev="prices-slider-wrapper"]'),
            lazyLoad: 'progressive',
        };

        let optionsLaptop = {
            infinite: false,
            cssEase: 'linear',
            speed: 500,
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            nextArrow: $('[data-js-arrow-next="prices-slider-wrapper"]'),
            prevArrow: $('[data-js-arrow-prev="prices-slider-wrapper"]'),
            lazyLoad: 'progressive',
        };

        this.options = $.extend(options, this.options, true);
        this.optionsLaptop = $.extend(optionsLaptop, this.optionsLaptop, true);

        return !!this.$wrappers.length;
    }

    /**
     * Бинд событий
     *
     * @returns {boolean}
     */
    _bind() {
        this._bindTo($(window), 'resize load orientationchange', () => {

            this.$wrappers.each((i, el) => {
                let $wrapper = $(el),
                    $slider = $wrapper.find('[data-js-slider="prices-slider"]'),
                    $slider_item = $wrapper.find('.prices__item');

                // слайдер на десктопе
                if (window.innerWidth >= 1024 && $slider_item.length > 3 ) {
                    $slider.slick(this.options);
                    if (!$slider.is('.slick-initialized')) {
                        $slider.slick(this.options);
                    }
                } else if (window.innerWidth >= 768 && window.innerWidth < 1023 ) {
                    $slider.slick(this.optionsLaptop);
                    if (!$slider.is('.slick-initialized')) {
                        $slider.slick(this.optionsLaptop);
                    }
                } else if (window.innerWidth < 768 ) {
                    if ($slider.is('.slick-initialized')) {
                        $slider.slick('unslick');
                    }
                }

                // логика работы кнопки показать больше
                if (window.innerWidth < 768) {
                    this.$elements.each((i, elem) => {
                        $(elem).addClass('hidden');
                        if(i <= 2) {
                            $(elem).addClass('show');
                            $(elem).removeClass('hidden');
                        }
                    });
                }
            });

            $(this.$link).removeClass('hidden');
        });

        $(this.$link).on('click', () => {
            this.checkHideElem(this.hideArrLen);
        });

        return true;
    }

    checkHideElem(len) {
        let hideElem = [];

        $(this.$elements).each((index, element) => {

            if($(element).hasClass('hidden')) {
                hideElem.push(element);
            }
        });

        hideElem.forEach((element, index) => {
            index = index + 1;
            if(index++ <= len) {
                $(element).addClass('show');
                $(element).removeClass('hidden');
            }
        });

        if(hideElem.length === len || hideElem.length === 1) {
            $(this.$link).addClass('hidden');
        }
    }
}
