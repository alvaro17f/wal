import { useEffect, useState } from "react";

export type Config = {
  commands: string[];
  paths: string[];
};

export const useConfig = () => {
  const [config, setConfig] = useState<Config>();
  const [initialState, setInitialState] = useState<Config>();

  const getConfig = async () => {
    // @ts-expect-error webui
    const result = await webui.get_config();
    const cfg = JSON.parse(result);
    setConfig(cfg);
    setInitialState(cfg);
  };

  useEffect(() => {
    setTimeout(() => {
      getConfig();
    }, 100);
  }, []);

  //TODO: remove
  useEffect(() => {
    const mockConfig: Config = {
      commands: config?.commands ?? [
        "hello",
        "world -i {}",
        "moon",
        "my -i {}",
      ],
      paths: config?.paths ?? [
        "/path/to/wallpaper2/catppuccin/hello/world",
        "/path/to/wallpaper",
        "/path/to/wallpaper3",
        "/path/to/wallpaper4",
      ],
    };
    setConfig(mockConfig);
    setInitialState(mockConfig);
  }, []);

  return { config, setConfig, initialState };
};
