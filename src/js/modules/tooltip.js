import tippy from 'tippy.js';
import { config } from "../config";

var tooltip = {
    instance: null,
    init: () => {
        tippy('[data-tippy-content]', {
            allowHTML: true,
            // interactive: true,
            dynamicTitle: true,
            maxWidth: '35rem',
            // trigger: 'click',
            arrow: false,
            onShow (instance) {
                $(instance.reference).addClass('is-focus')
                const closeBtn = $(instance.popper).find('.js-close-tooltip')
                closeBtn.on('click', function (e) {
                    e.preventDefault()
                    instance.hide();
                })
                tooltip.instance = instance;
                $(instance.reference).find(".tippy-bg").fadeIn(200)
            },
            onHide(instance) {
                $(instance.reference).find(".tippy-bg").fadeOut(200, function () {
                    $(instance.reference).removeClass('is-focus')
                })
            },
            onCreate(instance) {
                if (instance.props.interactive) {
                    $(instance.reference).append("<div class='tippy-bg' style='display: none'></div>")
                } else {
                    $(instance.reference).append("<div class='tippy-bg' style='display: none; pointer-events: none'></div>")
                }

            }
        });

    },

    getInstance: (instance) => {

    }
}

export { tooltip };