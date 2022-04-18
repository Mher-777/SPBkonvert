import { defaults } from "./modules/defaults";
import { sliders } from "./modules/sliders";
import { select } from "./modules/select";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { config } from "./config";
import "./vendor/dynamicAdapt"

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	modals.init();
	sliders.init();
	select.init();

	config.log('app init')
	
};

export { App };