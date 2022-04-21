import validate from "jquery-validation";
import "inputmask/dist/jquery.inputmask.min";
import { config } from "../config";
import "./defaults";

var forms = {
	mask: () => {
		$("[data-inputmask]").inputmask();
	},
	validate: () => {
		$.extend($.validator.messages, {
			required: "Поле не заполнено",
		})

		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
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
					if ($(form).hasClass('is-submit')) {
						form.submit()
					}
				},
				errorElement: 'span',
				ignore: "input.is-deactive",
				debug: false,
				rules: {

				},
				messages: {

				}

			});
		});
	},

	events: () => {
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				console.log($input)
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
