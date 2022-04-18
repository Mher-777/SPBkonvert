import "magnific-popup";
import { config } from "../config";

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
		if($(e.currentTarget).closest('.mfp-content').length) {
			$.magnificPopup.close();
			setTimeout(function () {
				openPopup()
			}, 300)
			return false
		}

		function openPopup() {
			$.magnificPopup.open({
				tClose: 'Закрыть',
				removalDelay: 300,
				fixedContentPos: true,
				fixedBgPos: true,
				closeMarkup: '<div class="modal__close close js-close-modal"><svg class="icon icon-close" viewBox="0 0 15 15"><use xlink:href="app/icons/sprite.svg#close"></use></svg></div>',
				mainClass: 'mfp-fade',
				items: {
					src: modal,
					type: 'inline'
				},
				callbacks: {
					beforeOpen: () => {
						config.header.css('width', `calc(100% - ${config.scrollbarWidth()}px)`)
					},

					beforeClose: () => {
						setTimeout(function () {
							config.header.css('width', '')
						}, 300)
					}
				}
			}, 0);
		}
		openPopup()
	},


	init: (e) => {


		$(document).on('click', '.js-close-modal', modals.close);

		$(document).on('click', '.js-modal', modals.open);

	}

};


export { modals };