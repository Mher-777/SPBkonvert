import { defaults } from "./modules/defaults";
import { sliders } from "./modules/sliders";
import { select } from "./modules/select";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { tooltip } from "./modules/tooltip";
import { menu } from "./modules/menu";
import { search } from "./modules/search";
import { cookie } from "./modules/cookie";
import { config } from "./config";
import "./vendor/dynamicAdapt"

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	modals.init();
	sliders.init();
	select.init();
	tooltip.init();
	menu.init();
	cookie.init();
	search.init();

	config.log('app init')
	
};

export { App };