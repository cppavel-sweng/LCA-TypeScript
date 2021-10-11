docker build -t "lca:ts" .
docker run -it --rm --name "lca-ts" lca:ts npx jest --collectCoverage