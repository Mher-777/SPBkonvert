import tippy from 'tippy.js';
import { config } from "../config";

var tooltip = {
    init: () => {
        tippy('[data-tippy-content]', {
            allowHTML: true,
            // interactive: true,
            dynamicTitle: true,
            // trigger: 'click',
            arrow: false,
            onShow (instance) {
                $(instance.reference).addClass('is-focus')
                const closeBtn = $(instance.popper).find('.js-close-tooltip')
                closeBtn.on('click', function (e) {
                    e.preventDefault()
                    instance.hide();
                })
                config.body.find(".tippy-bg").fadeIn(200)
            },
            onHide(instance) {
                config.body.find(".tippy-bg").fadeOut(200, function () {
                    $(instance.reference).removeClass('is-focus')
                })
            },
        });
        config.body.append("<div class='tippy-bg' style='display: none'></div>")
    },
}

export { tooltip };