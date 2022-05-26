import { config } from "../config";

var menu = {
    btn: $('.js-btn-menu'),
    item: $('.js-menu-item'),
    tab: $('.js-tab'),
    content: $('.js-tab-content'),
    dropdown: $('.js-menu-dropdown'),
    OldScrollPosition: 0,

    dropDown: (item = menu.item, dropdown = menu.dropdown) => {

        item.hover(function() {
            const $this = $(this)
            dropdown.each(function () {
                if ($(this).data('content') === $this.data('id')) {

                    if ($(this).is(':visible')) { // Если элемент виден
                        return false;
                    }

                    item.removeClass('is-active');
                    dropdown.hide();

                    $this.addClass('is-active')

                    $(this).stop().fadeIn();
                    return false;
                }

            })


            return false;
        });
    },

    open: () => {
        menu.btn.on('click', function (e) {
            const $this = $(this)
            e.preventDefault()
            $this.toggleClass('is-active')
            $('.tippy-bg_menu').fadeToggle()
            config.header.css('width', `calc(100% - ${config.scrollbarWidth()}px)`)
            config.body.toggleClass('js-lock').toggleClass('js-menu-open')
            config.html.toggleClass('js-lock')

            $(config.menu).fadeToggle()

        })
    },

    close: () => {
        $('.js-close-menu').on('click', function (e) {
            e.preventDefault()
            menu.btn.removeClass('is-active')
            $('.tippy-bg_menu').fadeOut(400)
            $(config.menu).fadeOut(400, function () {
                config.body.removeClass('js-menu-open').removeClass('js-lock')
                config.html.removeClass('js-lock')
                config.header.css('width', '')
            })
        })
    },

    scrollState: () => {
        $(window).scroll(function(){
            const sticky = $('.top-banner'),
                  scroll = $(window).scrollTop();

            if ($(window).width() < 580) {
                sticky.removeAttr('style')
                return false
            }

            if (scroll >= sticky.outerHeight()) {
                setTimeout(function () {
                    sticky.slideUp()
                    return false;
                }, 100)

            } else {
                setTimeout(function () {
                    sticky.slideDown()
                    return false;
                }, 100)
            }
        });

        const $header_top = $('.header__top');

        if ($(window).width() > 580) {
            $header_top.removeAttr('style')
            return false
        }

        const ScrollDown = menu.OldScrollPosition < window.scrollY;

        menu.OldScrollPosition = window.scrollY;

        const HEADER_TOP_HEIGHT = $header_top.outerHeight();

        if (window.scrollY > HEADER_TOP_HEIGHT) {

            const style = {
                'margin-top': `${-HEADER_TOP_HEIGHT}px`,
            };

            if (!ScrollDown) {
                style['margin-top'] = 0;
            }
            setTimeout(function () {
                $header_top.css(style)
            }, 100)

        } else {

            if (!ScrollDown) {
                setTimeout(function () {
                    $header_top.css({
                        'margin-top': 0,
                    })
                }, 100)
            } else {
                setTimeout(function () {
                    $header_top.removeAttr('style')
                }, 100)
            }
        }
    },

    init: () => {
        menu.btn.parent().append("<div class='tippy-bg tippy-bg_menu js-close-menu' style='display: none'></div>")
        menu.open()
        menu.close()
        menu.dropDown()
        config.addListenerMulti(window, 'scroll load', function () {
            menu.scrollState()
        })

        menu.dropDown(menu.tab, menu.content)
    }
}

export { menu };