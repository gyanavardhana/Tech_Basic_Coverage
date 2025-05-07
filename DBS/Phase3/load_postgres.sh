#!/bin/bash

# Create table inside the postgres container
docker exec -i pg-container psql -U user -d testdb <<EOF
CREATE TABLE IF NOT EXISTS load_test (
  id SERIAL PRIMARY KEY,
  data TEXT
);
EOF

echo "Generating load on PostgreSQL..."

# Run inserts in parallel inside the container
for i in {1..200}; do
  docker exec -i pg-container psql -U user -d testdb -c "INSERT INTO load_test (data) VALUES ('Random text $i');" &
done

wait
echo "Load generation complete."
