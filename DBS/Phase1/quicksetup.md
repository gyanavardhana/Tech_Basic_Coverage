### ✅ 1. **Run PostgreSQL Container**

```bash
docker run --name my-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  -d postgres
```

* `--name my-postgres`: container name
* `-e POSTGRES_USER`: sets the username
* `-e POSTGRES_PASSWORD`: sets the password
* `-e POSTGRES_DB`: creates a default database
* `-p 5432:5432`: maps container port to host
* `-d postgres`: runs the official `postgres` image in detached mode

---

### ✅ 2. **Connect to PostgreSQL Using `psql`**

If you have `psql` installed on your host:

```bash
psql -h localhost -U myuser -d mydatabase
```

Then enter the password when prompted: `mypassword`

---

### ✅ 3. **Alternatively, Connect Inside the Container**

```bash
docker exec -it my-postgres psql -U myuser -d mydatabase
```

This directly drops you into the `psql` shell inside the container.
