var defaults = {

	events: () => {
		let resizeTimer;
		window.addEventListener("resize", () => {
			document.body.classList.add("resize-animation-stopper");
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				document.body.classList.remove("resize-animation-stopper");
			}, 400);
		});
	},

	polyfill: () => {
		if (typeof Object.assign != 'function') {
			Object.assign = function(target) {
				'use strict';
				if (target == null) {
					throw new TypeError('Cannot convert undefined or null to object');
				}

				target = Object(target);
				for (var index = 1; index < arguments.length; index++) {
					var source = arguments[index];
					if (source != null) {
						for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}
				}
				return target;
			};
		}
		if (!String.prototype.padStart) {
			String.prototype.padStart = function padStart(targetLength, padString) {
				targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
				padString = String(typeof padString !== 'undefined' ? padString : ' ');
				if (this.length >= targetLength) {
					return String(this);
				} else {
					targetLength = targetLength - this.length;
					if (targetLength > padString.length) {
						padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
					}
					return padString.slice(0, targetLength) + String(this);
				}
			};
		}
	},
	numberWithCommas: (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	},

	init: () => {
		defaults.polyfill()
		defaults.events();

	}
}

export { defaults }