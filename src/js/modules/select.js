import select2 from "select2";

var select = {
    selector: $('.js-select'),
    init: () => {
        select.selector.select2({
            minimumResultsForSearch: -1,
            width: '100%',
        }).on('select2:select', function (e) {
            if ($(this).closest('.js-select-show').length > 0) {
                $.magnificPopup.close();
            }
        });
    }
}

export { select };