npm run clean
npm run build
mkdir deployments
cp -r dist deployments
mkdir deployments/static
mkdir deployments/static/public
cp -r static/public deployments/static/public
cp -r views deployments
cp -r package.json deployments
cp -r package-lock.json deployments
cp -r Procfile deployments
