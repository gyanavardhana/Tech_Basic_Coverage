docker cp /home/ubuntu/backups/mongo/<timestamp>/dump mongo_container:/data/db/dump
docker exec mongo_container mongorestore --username root --password password --authenticationDatabase admin /data/db/dump
