declare global {
  var webui: {
    exit_app: () => void;
    get_config: () => Promise<string>;
    get_wallpapers: () => Promise<string>;
    save_config: (arg0: string) => Promise<void>;
    set_wallpaper: (arg0: string) => void;
  };
}

export {};
