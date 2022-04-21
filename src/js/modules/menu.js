import { config } from "../config";

var menu = {
    btn: $('.js-btn-menu'),

    init: () => {
        const btnMenu = menu.btn
        btnMenu.on('click', function (e) {
            const $this = $(this)
            e.preventDefault()
            btnMenu.toggleClass('is-active')
        })
    }
}

export { menu };