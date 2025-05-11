#!/bin/bash

TIMESTAMP=$(date +"%F_%H-%M-%S")
BACKUP_DIR="/home/ubuntu/backups/mongo/$TIMESTAMP"
mkdir -p "$BACKUP_DIR"

docker exec mongo_container mongodump --username root --password password --authenticationDatabase admin --out /data/db/dump
docker cp mongo_container:/data/db/dump "$BACKUP_DIR"
docker exec mongo_container rm -rf /data/db/dump

echo "MongoDB backup saved to $BACKUP_DIR"
