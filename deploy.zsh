npm run clean
npm run build
mkdir deployments
cp -r dist deployments
mkdir deployments/static
mkdir deployments/static/public
cp -r static/public deployments/static
cp -r views deployments
cp package.prod.json deployments/package.json
cp -r Procfile deployments
