import select2 from "select2";

var select = {
    selector: $('.js-select'),
    init: () => {
        select.selector.select2({
            minimumResultsForSearch: -1,
            width: '100%',
        });
    }
}

export { select };