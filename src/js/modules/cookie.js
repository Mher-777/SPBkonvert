import {config} from "../config";

const cookie = {

    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    getCookie: (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    // Добавление куки
    setCookie: (name, value, options = {}) => {
         options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    },

    deleteCookie: (name) => {
        cookie.setCookie(name, "", {
            'max-age': -1
        })
    },

    init: () => {
        $('.js-cookie').on('click', function (e) {
            e.preventDefault()
            $(this).closest('.js-cookie-hide').slideUp(400, function () {
                $(this).remove()
                config.body.css('paddingTop', config.header.outerHeight());
                config.menu.css({
                    top: config.header.outerHeight(),
                    height: `calc(100vh - ${config.header.outerHeight()}px)`
                })
            })
        })
    }
}

export { cookie }