package utils

import os "core:os/os2"
import "core:time"

process_start :: proc(
	command: string,
	print_stdout: bool = true,
	print_stderr: bool = true,
	timeout: time.Duration = os.TIMEOUT_INFINITE,
) -> (
	process_state: os.Process_State,
	error: os.Error,
) {
	process := os.process_start(
		{
			command = []string{"sh", "-c", command},
			stdin = os.stdin,
			stdout = print_stdout ? os.stdout : nil,
			stderr = print_stderr ? os.stderr : nil,
		},
	) or_return

	state := os.process_wait(process, timeout) or_return

	os.process_close(process) or_return

	return state, nil
}

process_exec :: proc(
	command: string,
) -> (
	process_state: os.Process_State,
	process_stdout: []byte,
	process_stderr: []byte,
	process_error: os.Error,
) {

	state, stdout, stderr := os.process_exec(
		os.Process_Desc{command = []string{"sh", "-c", command}},
		context.temp_allocator,
	) or_return

	return state, stdout, stderr, nil
}
