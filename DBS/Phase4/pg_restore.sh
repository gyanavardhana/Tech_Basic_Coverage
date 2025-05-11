cat /home/ubuntu/backups/postgres/backup_<timestamp>.sql | docker exec -i postgres_container psql -U myuser -d mydb
