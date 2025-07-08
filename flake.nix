{
  description = "owa";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system: with import nixpkgs { inherit system; }; {
        packages.default = pkgs.stdenv.mkDerivation rec {
          name = "owa";

          app = builtins.fetchTarball {
            url = "https://github.com/alvaro17f/${name}/releases/latest/download/owa-${system}.tar.gz";
            sha256 = "sha256:1jxmh5yja1zil5xpckb96y8636w4zy4w40wqnmp9zvvbwsk8jyh4";
          };

          src = ./.;

          installPhase = ''
            mkdir -p $out/bin
            cp ${app}/${name} $out/bin/${name}

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
