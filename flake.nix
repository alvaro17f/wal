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
            sha256 = "sha256:1njjg9h68wz9j79n3mgimmrr83q4zl4vap029l1rmdi74ma7jz81";
          };

          src = ./.;

          installPhase = ''
            mkdir -p $out/bin
            cp ${app}/${name} $out/bin/${name}
          '';

          desktopItems = [
            (pkgs.makeDesktopItem {
              name = name;
              exec = name;
              terminal = true;
              icon = "${src}/app/front/public/owa.svg";
              comment = "OWA wallpapers";
              desktopName = name;
              genericName = "wallappers";
              categories = [ "Development" ];
            })
          ];
        };
      }
    );
}
