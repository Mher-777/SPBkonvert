import validate from "jquery-validation";
import "jquery-validation/dist/localization/messages_ru.min";
import "inputmask/dist/jquery.inputmask.min";
import "../modules/modals"
import "./defaults";
import {modals} from "./modals";

var forms = {
	mask: () => {
		$("[data-inputmask]").inputmask({
			showMaskOnHover: false,
		});
	},
	validate: () => {
		$.extend($.validator.messages, {
			required: "Поле не заполнено",
		})

		$.validator.addMethod(
			"oneNumber",
			function(value, element, regexp) {
				var re = new RegExp(regexp);
				return this.optional(element) || re.test(value);
			},
			"Поле должно содержать хотя бы одно число"
		);

		$.validator.addMethod(
			"oneSpecialCharacter",
			function(value, element, regexp) {
				var re = new RegExp(regexp);
				return this.optional(element) || re.test(value);
			},
			"Поле должно содержать хотя бы один спецсимвол"
		);

		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				lang: 'ru',
				errorPlacement: function (error, element) {
					if (element.attr("type") !== "checkbox") {
						element.parent().after(error);
					}
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				submitHandler: (form) => {
					const stepModal = $(form).closest('.modal').attr('data-step-modal')
					if (stepModal) {
						modals.open(false, stepModal)
					}
					// const btnModal = $(form).find('button[data-modal]')
					// if (!btnModal.hasClass('js-modal')) {
					//
					// 	btnModal.addClass('js-modal')
					// } else {
					// 	btnModal.removeClass('js-modal')
					// }

					if ($(form).hasClass('is-submit')) {
						form.submit()
					}
				},
				errorElement: 'span',
				ignore: "input.is-deactive",
				debug: false,
				rules: {
					password : {
						minlength: 8,
						oneNumber: "(?=^.{6,}$)",
						oneSpecialCharacter: "(?=.*[!@#$%^&*])",
					},
					password_repeat: {
						minlength: 8,
						equalTo : "#password_repeat"
					},
					email: {
						email: true
					}
				},
				messages: {
					month: {
						required: ''
					},
					year: {
						required: ''
					},
					cvv: {
						required: ''
					},
				}
			});
		});
	},

	events: () => {
		$(".input__field, .textarea__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
	},

	init: () => {
		forms.mask();
		forms.validate();
		forms.events();
	},
};

export { forms };
