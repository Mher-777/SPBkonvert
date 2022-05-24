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
            if ($(this).attr('data-cookie')) {
                const set = JSON.parse($(this).attr('data-cookie'))

                if (cookie.getCookie(set.name) == undefined) {
                    cookie.setCookie(set.name, set.value)
                    $(this).closest('.js-cookie-hide').slideUp()
                }
            }
        })
    }
}

export { cookie }