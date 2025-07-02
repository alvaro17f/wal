package app

import "../utils"

config: utils.Config

init :: proc() {
	config_path := "/home/alvaro17f/.config/owa/config.json"
	config = utils.get_config(config_path)

	gui()
	free_all(context.temp_allocator)
}

