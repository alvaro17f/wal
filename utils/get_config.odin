package utils

import "core:encoding/json"
import "core:fmt"
import os "core:os/os2"

Config :: struct {
	commands: []string,
	paths:    []string,
}

@(private = "file")
generate_config :: proc(path: string) {
	init_config := Config {
		commands = {},
		paths    = {},
	}

	json_data, err := json.marshal(init_config)
	if err != nil {
		fmt.panicf("Failed to marshal JSON: %v", err)
	}

	write_err := os.write_entire_file(path, json_data)
	if write_err != nil {
		fmt.panicf("Failed to write file: %v", err)
	}
}

get_config :: proc(path: string) -> Config {
	config: Config

	if (!os.exists(path)) {
		generate_config(path)
	}

	data, err := os.read_entire_file_from_path(path, context.temp_allocator)
	if err != nil {
		fmt.panicf("Failed to read file: %v", err)
	}

	if json_err := json.unmarshal(data, &config, allocator = context.temp_allocator);
	   json_err != nil {
		fmt.panicf("Error unmarshaling json: %v", json_err)
	}

	return config
}

