import "magnific-popup";
import { config } from "../config";
import { tooltip } from "./tooltip";

var modals = {

	close: (e) => {

		if(!e)
			return false;

		e.preventDefault();

		$.magnificPopup.close();

	},

	open: (e, modal) => {

		e = e || false;

		if(e) e.preventDefault();

		$.magnificPopup.close();

		modal = modal || (e != false ? ($(e.currentTarget).attr('href') ? $(e.currentTarget).attr('href') : $(e.currentTarget).data('modal')) : e);
		if(!modal)
			return false;

		if(e && $(e.currentTarget).attr('data-youtube')){
			$(modal + ' iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).data('youtube')+'?autoplay=1&showinfo=0&rel=0&controls=0')
		}

		if(e && $(e.currentTarget).attr('data-input')){
			$(modal + ' input[name="form"]').val($(e.currentTarget).data('input'))
		}

		function openPopup() {
			$.magnificPopup.open({
				tClose: 'Закрыть',
				removalDelay: 250,
				fixedContentPos: true,
				fixedBgPos: true,
				closeMarkup: '<div class="modal__close close js-close-modal"><svg class="icon icon-close" viewBox="0 0 15 15"><use xlink:href="app/icons/sprite.svg#close"></use></svg></div>',
				mainClass: 'mfp-fade',
				items: {
					src: modal,
					type: 'inline'
				},
				callbacks: {
					beforeOpen: (e) => {
						config.header.css('width', `calc(100% - ${config.scrollbarWidth()}px)`)
					},
					beforeClose: () => {
						setTimeout(function () {
							config.header.css('width', '')
						}, 250)
					},
					open: function() {
						$(modal).addClass('js-modal-show')
						if ($(modal).hasClass("js-select-show")) {
							$(modal).find('.js-select').select2('open')
						}
						if ($(modal).hasClass("js-tooltip-show")) {
							tooltip.instance.setProps({
								hideOnClick: false
							})
						}
					},
					close: function () {
						$(modal).removeClass('js-modal-show')
						if ($(modal).hasClass("js-tooltip-show")) {
							tooltip.instance.setProps({
								hideOnClick: true
							})
						}
					}
				}
			}, 0);
		}

		if ($('.js-modal-show').length > 0) {
			setTimeout(function () {
				openPopup()
			}, 250)
			return true;
		}

		openPopup()
	},


	init: (e) => {


		$(document).on('click', '.js-close-modal', modals.close);

		$(document).on('click', '.js-modal', modals.open);

	}

};


export { modals };