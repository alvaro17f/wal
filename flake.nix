# https://github.com/NixOS/nixpkgs/issues/255890#issuecomment-2308881422
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
      self,
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        name = "owa";

        src = self;

        pkgs = import nixpkgs { inherit system; };

        version = pkgs.lib.fileContents ./VERSION;

        nativeBuildInputs = with pkgs; [
          bash
          nodejs
          bun
          odin
          ols
        ];

        buildInputs = with pkgs; [
          bun
          curl
          glibc.static
          nodejs
          odin
          ols
          openssl
          typescript
        ];
      in
      {
        packages.default =
          let
            packageJson = pkgs.lib.importJSON "${src}/app/front/package.json";

            front_name = packageJson.name;
            front_version = packageJson.version;

            node_modules = pkgs.stdenv.mkDerivation {
              inherit src;

              name = "${front_name}_node-modules";
              version = front_version;

              nativeBuildInputs = with pkgs; [ bun ];
              buildInputs = with pkgs; [ nodejs-slim_latest ];

              dontConfigure = true;
              dontFixup = true; # patchShebangs produces illegal path references in FODs

              buildPhase = ''
                runHook preBuild

                cd ./app/front

                export HOME=$TMPDIR

                bun install --no-progress --frozen-lockfile

                runHook postBuild
              '';

              installPhase = ''
                runHook preInstall

                mkdir -p $out/node_modules

                mv node_modules $out/

                runHook postInstall
              '';

              outputHash =
                if pkgs.stdenv.isLinux then "sha256-Z/k/lNMg3tzfH/ay2dXCSqMWLBORuYR4sskUtpYFVbc=" else "";
              outputHashAlgo = "sha256";
              outputHashMode = "recursive";
            };
          in
          pkgs.stdenv.mkDerivation {
            inherit src name version;

            nativeBuildInputs = [ node_modules ] ++ nativeBuildInputs;
            buildInputs = buildInputs;

            dontConfigure = true;
            dontFixup = true;

            preBuild = ''
              cd ./app/front

              cp -a ${node_modules}/node_modules ./node_modules
              chmod -R u+rw node_modules
              chmod -R u+x node_modules/.bin
              patchShebangs node_modules

              export HOME=$TMPDIR
              export PATH="$PWD/node_modules/.bin:$PATH"

              bun run build
            '';

            postBuild = '''';

            buildPhase = ''
              runHook preBuild

              cd ../../

              odin build . -define="VERSION=${version}" -o:speed --collection:lib=lib -out:${name}

              runHook postBuild
            '';

            preInstall = '''';

            postInstall = '''';

            installPhase = ''
              runHook preInstall

              ls
              mkdir -p $out/bin
              cp ${name} $out/bin/${name}
              chmod +x $out/bin/${name}

              runHook postInstall
            '';
          };

        devShells.default = pkgs.mkShell {
          nativeBuildInputs = nativeBuildInputs;
          buildInputs = buildInputs;
        };
      }
    );
}
