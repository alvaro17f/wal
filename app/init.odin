package app

import "../utils"

config: utils.Config

init :: proc() {
	config = utils.get_config("/home/alvaro17f/.config/owa/config.json")
	gui()
	free_all(context.temp_allocator)
}

