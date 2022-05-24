import select2 from "select2";

var select = {
    selector: $('.js-select'),
    init: () => {
        function formatState (state) {
            if (!state.id) {
                return state.text;
            }
            const icon = $(state.element).attr('data-icon')
            const title = $(state.element).attr('data-title')
            if (icon) {
                return $(`<span>
                        <svg class="icon"><use xlink:href="app/icons/sprite.svg#${icon}"></use></svg>
                        <strong>${title}</strong>
                </span>`);
            }

            if (title) {
                return $(`<span>
                        <strong>${title}</strong>
                        ${state.text}
                </span>`);
            }

            return state.text;
        }

        select.selector.select2({
            minimumResultsForSearch: -1,
            width: '100%',
            templateResult: formatState
        }).on('select2:select', function (e) {
            if ($(this).closest('.js-select-show').length > 0) {
                $.magnificPopup.close();
            }
        });
    }
}

export { select };