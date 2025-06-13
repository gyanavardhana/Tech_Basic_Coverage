#!/bin/bash

# PostgreSQL restore config
PG_CONTAINER="postgres_container"
PG_USER="postgres"
PG_DB="library_db"

# MongoDB restore config
MONGO_CONTAINER="mongo_container"
MONGO_USER="root"
MONGO_PASS="password"
MONGO_DB="analytics_db"
MONGO_AUTH_DB="admin"

# --- PostgreSQL Restore ---
echo "🔄 Searching for latest PostgreSQL backup..."
LATEST_PG_BACKUP=$(ls -t backups/postgres/library_db_*.sql 2>/dev/null | head -n 1)

if [ -z "$LATEST_PG_BACKUP" ]; then
  echo "❌ No PostgreSQL backup file found"
else
  echo "📦 Found: $LATEST_PG_BACKUP"
  echo "🔄 Restoring PostgreSQL backup..."

  docker run --rm \
    --network container:$PG_CONTAINER \
    -v "$(pwd)/backups/postgres:/backups" \
    postgres:15 \
    bash -c "psql -U $PG_USER -h localhost -d $PG_DB < /backups/$(basename "$LATEST_PG_BACKUP")"

  if [ $? -eq 0 ]; then
    echo "✅ PostgreSQL restore completed"
  else
    echo "❌ PostgreSQL restore failed"
  fi
fi

# --- MongoDB Restore ---
echo "🔄 Searching for latest MongoDB backup..."
LATEST_MONGO_BACKUP=$(ls -td backups/mongodb/analytics_db_* 2>/dev/null | head -n 1)

if [ -z "$LATEST_MONGO_BACKUP" ]; then
  echo "❌ No MongoDB backup directory found"
else
  echo "📦 Found: $LATEST_MONGO_BACKUP"
  echo "🔄 Restoring MongoDB backup..."

  docker run --rm \
    --network container:$MONGO_CONTAINER \
    -v "$(pwd)/$LATEST_MONGO_BACKUP:/backup" \
    mongo \
    bash -c "mongorestore --drop --host localhost --port 27017 -u $MONGO_USER -p $MONGO_PASS --authenticationDatabase $MONGO_AUTH_DB /backup"

  if [ $? -eq 0 ]; then
    echo "✅ MongoDB restore completed"
  else
    echo "❌ MongoDB restore failed"
  fi
fi

echo "✅ Restore process completed"
