{
  description = "owa";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    owa = {
      url = "https://github.com/alvaro17f/owa/releases/latest/download/owa-x86_64-linux.tar.gz";
      flake = false;
    };
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }@inputs:
    flake-utils.lib.eachDefaultSystem (
      system: with import nixpkgs { inherit system; }; {
        packages.default = pkgs.stdenv.mkDerivation rec {
          name = "owa";

          src = ./.;

          installPhase = ''
            mkdir -p $out/bin
            cp ${inputs.owa}/${name} $out/bin/${name}

            for RES in 16 24 32 48 64 128 256; do
              mkdir -p $out/share/icons/hicolor/"$RES"x"$RES"/apps
              ${pkgs.imagemagick}/bin/magick assets/logo.png -resize "$RES"x"$RES" $out/share/icons/hicolor/"$RES"x"$RES"/apps/${name}.png
            done

            mkdir -p $out/share/applications
            install -m644 assets/${name}.desktop $out/share/applications/


          '';

          desktopItems = [
            (pkgs.makeDesktopItem {
              name = name;
              exec = name;
              terminal = true;
              icon = name;
              comment = "OWA wallpapers";
              desktopName = name;
              genericName = "wallappers";
              categories = [ "Utility" ];
            })
          ];
        };
      }
    );
}
