#!/bin/bash

# Backup directories
mkdir -p backups/postgres
mkdir -p backups/mongodb

# Timestamp
DATE=$(date +%Y%m%d_%H%M%S)

# PostgreSQL Backup using Docker
echo "🔄 Creating PostgreSQL backup using Docker..."
docker run --rm \
  --network container:postgres_container \
  -v "$(pwd)/backups/postgres:/backups" \
  postgres:15 \
  bash -c "pg_dump -U postgres -h localhost library_db > /backups/library_db_${DATE}.sql"

if [ $? -eq 0 ]; then
    echo "✅ PostgreSQL backup completed: library_db_${DATE}.sql"
else
    echo "❌ PostgreSQL backup failed"
fi

# MongoDB Backup using Docker
echo "🔄 Creating MongoDB backup using Docker..."
docker run --rm \
  --network container:mongo_container \
  -v "$(pwd)/backups/mongodb:/backups" \
  mongo \
  bash -c "mongodump --host localhost --port 27017 -u root -p password --authenticationDatabase admin --out /backups/analytics_db_${DATE}"

if [ $? -eq 0 ]; then
    echo "✅ MongoDB backup completed: analytics_db_${DATE}"
else
    echo "❌ MongoDB backup failed"
fi

# Clean up old backups
find backups/postgres -name "*.sql" -mtime +7 -delete
find backups/mongodb -mindepth 1 -maxdepth 1 -type d -mtime +7 -exec rm -rf {} +

echo "🧹 Old backups cleaned up"
echo "✅ Backup process completed"
