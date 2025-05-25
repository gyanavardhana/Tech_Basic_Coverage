
# Database Core Features: PostgreSQL vs MongoDB

---

## 📘 PostgreSQL Core Features

### ✅ ACID Transactions

PostgreSQL ensures **ACID compliance**, which guarantees:

- **Atomicity**: All operations in a transaction succeed or none do.
- **Consistency**: The database remains in a valid state before and after the transaction.
- **Isolation**: Transactions do not interfere with each other.
- **Durability**: Once a transaction is committed, it remains in the database even after a crash.

**Example:**
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
````

---

### 🔗 Joins

PostgreSQL supports complex joins for querying across multiple tables:

* **INNER JOIN**: Returns records with matching values in both tables.
* **LEFT JOIN**: Returns all records from the left table, and matched records from the right.
* **RIGHT JOIN**: Vice versa of LEFT JOIN.
* **FULL JOIN**: Combines LEFT and RIGHT joins.

**Example:**

```sql
SELECT users.name, orders.id
FROM users
JOIN orders ON users.id = orders.user_id;
```

---

### 👁️ Views

A **view** is a virtual table based on a SQL query. It simplifies complex queries and enhances security by exposing only specific data.

**Example:**

```sql
CREATE VIEW active_users AS
SELECT id, name FROM users WHERE is_active = true;
```

---

### ⚡ Indexing

Indexes speed up data retrieval by minimizing disk reads.

* **B-tree** (default)
* **Hash**
* **GIN** (for arrays, full-text search)
* **GiST** (for geometric data types)

**Example:**

```sql
CREATE INDEX idx_user_email ON users(email);
```

---

### 🚨 Triggers

Triggers are automatic procedures executed when certain database events occur (e.g., INSERT, UPDATE, DELETE).

**Example:**

```sql
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
```

---

## 📗 MongoDB Core Features

### 📄 Document-Based Storage

MongoDB stores data in **BSON documents** (Binary JSON), offering:

* Flexible schemas
* Embedded documents and arrays
* JSON-like syntax

**Example Document:**

```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "orders": [
    { "id": 1, "amount": 200 },
    { "id": 2, "amount": 150 }
  ]
}
```

---

### 🌐 Sharding and Replication

#### Sharding

Distributes data across multiple machines to support horizontal scaling.

* **Shard key** determines how data is partitioned.
* Enables high write throughput and large datasets.

#### Replication

Provides data redundancy and high availability.

* **Replica Set**: Primary + one or more secondaries
* Automatic failover and recovery

**Command:**

```js
rs.initiate();
```

---

### 🔍 Indexing

MongoDB supports various index types to optimize queries:

* **Single field**
* **Compound index**
* **Multikey index** (for arrays)
* **Text index** (for full-text search)
* **Geospatial index**

**Example:**

```js
db.users.createIndex({ email: 1 });
```

---

### 🧮 Aggregation Framework

Used for data processing and analytics, similar to SQL GROUP BY.

* Uses **pipeline** of stages (`$match`, `$group`, `$project`, `$sort`, etc.)
* Efficient for real-time analytics

**Example:**

```js
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
]);
```
