#!/bin/bash

TIMESTAMP=$(date +"%F_%H-%M-%S")
BACKUP_DIR="/home/ubuntu/backups/postgres"
mkdir -p "$BACKUP_DIR"

docker exec -t postgres_container pg_dump -U myuser mydb > "$BACKUP_DIR/backup_$TIMESTAMP.sql"
echo "PostgreSQL backup saved to $BACKUP_DIR"



