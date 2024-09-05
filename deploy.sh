pnpm build
rsync -av --exclude='*.js.map' dist/ root@laizn.com:/www/aiweb/