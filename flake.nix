{
  description = "owa";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    self = {
      submodules = true;
    };
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        name = "owa";

        pkgs = import nixpkgs { inherit system; };

        version = pkgs.lib.fileContents ./VERSION;

        nativeBuildInputs = with pkgs; [
          bash
          odin
          ols
        ];

        buildInputs = with pkgs; [
          gdb
          libGL
          libschrift
          libxkbcommon
          openssl
          raylib
          resvg
          seer
          valgrind
          wayland
          wayland-protocols
          wayland-scanner
          xorg.libX11
        ];

        LD_LIBRARY_PATH =
          with pkgs;
          "$LD_LIBRARY_PATH:${
            lib.makeLibraryPath [
              libGL
              xorg.libX11
              openssl
            ]
          }";

      in
      {
        packages.default = pkgs.stdenv.mkDerivation {
          name = name;

          nativeBuildInputs = nativeBuildInputs;
          buildInputs = buildInputs;

          src = ./.;

          preBuild = '''';

          postBuild = '''';

          buildPhase = ''
            runHook preBuild

            runHook postBuild
          '';

          preInstall = '''';

          postInstall = '''';

          installPhase = ''
            runHook preInstall

            mkdir -p $out/bin
            cp ${name} $out/bin/${name}
            chmod +x $out

            runHook postInstall
          '';
        };

        devShells.default = pkgs.mkShell {
          nativeBuildInputs = nativeBuildInputs;
          buildInputs = buildInputs;
          LD_LIBRARY_PATH = LD_LIBRARY_PATH;
        };
      }
    );
}
