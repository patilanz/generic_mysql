docker-compose down -v
docker build . --no-cache
docker-compose up --build
