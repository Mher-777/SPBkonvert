import { config } from "../config";

var search = {
    dropdown: $('.js-search-dropdown'),
    delete: $('.js-search-delete'),
    init: () => {
        $(".js-search")
            .on("focus, click", (e) => {
                let $input = $(e.target);
                const dropdown = search.dropdown;
                $input.closest('.search').addClass("is-focus");
                config.body.find(".tippy-bg").fadeIn(200)
                dropdown.fadeIn(200)
                search.changeValue($input, dropdown)
            })
            .on("blur change", (e) => {
                let $input = $(e.target);
                search.dropdown.fadeOut(200)
                config.body.find(".tippy-bg").fadeOut(200, function() {
                    $input.closest('.search').removeClass("is-focus");
                })

            }).on("input", (e) => {
                let $input = $(e.target);
                search.deleteValue($input)
            })
    },

    changeValue: (elem, dropdown) => {
        const link = dropdown.find('.dropdown__link')
        link.on('click', function (e) {
            e.preventDefault()
            const $this = $(this)
            elem.val($this.text())
            link.parent().removeClass('is-active')
            $this.parent().addClass('is-active')
            search.deleteValue(elem)
        })
    },

    deleteValue: (elem) => {
        if (elem.val() != "") {
            search.delete.fadeIn(200)
        } else {
            search.delete.fadeOut(200)
        }

        search.delete.on('click', function (e) {
            e.preventDefault()
            $(this).fadeOut(200)
            elem.val('')
        })
    },
}

export { search };