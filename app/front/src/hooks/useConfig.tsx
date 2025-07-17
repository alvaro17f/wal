import { useEffect, useRef, useState } from "react";

type Config = {
  commands: string[];
  paths: string[];
};

const isDevelopment = import.meta.env.MODE === "development";

const mockConfig: Config = {
  commands: [
    "swaybg -i {} -m stretch",
    "gsettings set org.gnome.desktop.background picture-uri {}",
    "gsettings set org.gnome.desktop.background picture-uri-dark {}",
  ],
  paths: [
    "/path/to/wallpaper1",
    "/path/to/wallpaper2/folder",
    "/path/to/wallpaper3/folder/demo",
    "/path/to/wallpaper4/folder/demo/library",
  ],
};

export const useConfig = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [initialConfig, setInitialConfig] = useState<Config | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const isConfigFetched = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const paths: string[] = [];
    const commands: string[] = [];

    data.forEach((value, key) => {
      if (typeof value === "string") {
        if (key === "path") paths.push(value.trim());
        if (key === "command") commands.push(value.trim());
      }
    });

    setConfig({ paths, commands });

    // const dlg = document.getElementById("settings") as HTMLDialogElement | null;
    // dlg?.close();

    await webui.save_config(JSON.stringify(config));
  };

  const fetchConfig = () =>
    (async () => {
      try {
        const cfg = isDevelopment
          ? mockConfig
          : (JSON.parse(await webui.get_config()) as Config);
        setConfig(cfg);
        setInitialConfig(cfg);
        isConfigFetched.current = true;
      } catch (e) {
        setError(e);
      }
    })();

  useEffect(() => {
    if (!isConfigFetched.current) {
      setTimeout(() => {
        fetchConfig();
      }, 100);
    }
  }, []);

  return { config, setConfig, handleSubmit, initialConfig, error };
};
