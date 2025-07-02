import { useEffect, useState } from "react";

type Config = {
  paths: string[];
};

export const useSettings = () => {
  const [config, setConfig] = useState<Config>();

  const getConfig = async () => {
    // @ts-expect-error webui
    const result = await webui.get_config();
    const cfg = JSON.parse(result);
    setConfig(cfg);
  };

  useEffect(() => {
    setTimeout(() => {
      getConfig();
    }, 100);
  }, []);

  return { config };
};
