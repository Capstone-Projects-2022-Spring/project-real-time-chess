npm run clean
npm run build
mkdir deployments
cp -r dist deployments
mkdir deployments/static
mkdir deployments/static/public
cp -r static/public deployments/static
cp -r views deployments
cp -r package.prod.json deployments/package.json
cp -r package-lock.json deployments
cp -r Procfile deployments
