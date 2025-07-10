package utils

import "core:encoding/json"
import "core:fmt"
import os "core:os/os2"

Config :: struct {
	commands: []string,
	paths:    []string,
}

@(private = "file")
generate_config :: proc(config_file: string, config_dir: string) {
	init_config := Config {
		commands = {},
		paths    = {},
	}

	if mkdir_err := os.make_directory_all(config_dir); mkdir_err != nil {
		fmt.panicf("Failed to create directory: %v", mkdir_err)
	}

	json_data, json_err := json.marshal(init_config)
	if json_err != nil {
		fmt.panicf("Failed to marshal JSON: %v", json_err)
	}

	write_err := os.write_entire_file(config_file, json_data)
	if write_err != nil {
		fmt.panicf("Failed to write file: %v", write_err)
	}
}

get_config :: proc(config_file: string, config_dir: string) -> Config {
	config: Config

	if (!os.exists(config_file)) {
		generate_config(config_file, config_dir)
	}

	data, read_err := os.read_entire_file_from_path(config_file, context.temp_allocator)
	if read_err != nil {
		fmt.panicf("Failed to read file: %v", read_err)
	}

	if json_err := json.unmarshal(data, &config, allocator = context.temp_allocator);
	   json_err != nil {
		fmt.panicf("Error unmarshaling json: %v", json_err)
	}


	return config
}

