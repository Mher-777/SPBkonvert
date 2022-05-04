import { config } from "../config";

var menu = {
    btn: $('.js-btn-menu'),
    item: $('.js-menu-item'),
    tab: $('.js-tab'),
    content: $('.js-tab-content'),
    dropdown: $('.js-menu-dropdown'),

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
            config.body.toggleClass('js-menu-open').toggleClass('js-lock')
            $(config.menu).fadeToggle()
        })
    },

    close: () => {
        $('.js-close-menu').on('click', function (e) {
            e.preventDefault()
            console.log($(this))
            menu.btn.removeClass('is-active')
            $('.tippy-bg_menu').fadeOut(400)
            $(config.menu).fadeOut(400, function () {
                config.body.removeClass('js-menu-open').removeClass('js-lock')
            })
        })
    },

    init: () => {
        menu.btn.parent().append("<div class='tippy-bg tippy-bg_menu js-close-menu' style='display: none'></div>")
        menu.open()
        menu.close()
        menu.dropDown()
        menu.dropDown(menu.tab, menu.content)
    }
}

export { menu };