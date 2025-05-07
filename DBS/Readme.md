
# **Phase 1: Fundamentals of Databases**
**Concepts to Cover**
- What is a Database? (Structured vs Unstructured) - Done
- What is a Transaction? - Done
- What is ACID (Atomicity, Consistency, Isolation, Durability)? - Done
- Why ensuring atomicity in writes is important? - Done

**Practice Tasks** 

✅ List real-world examples where ACID properties are crucial.  - Done

✅ Create a mini-transaction simulation using SQL (e.g., money transfer between two bank accounts).  - Done

---

# **Phase 2: CAP Theorem and NoSQL Basics** 
**Concepts to Cover**
- What is the CAP Theorem? - Done
- Understanding Consistency, Availability, and Partition Tolerance. - Done
- Where MongoDB and PostgreSQL stand in the CAP theorem. - Done

**Practice Tasks**
- Better to have after after phase 5( to dive deeper)
---

# **Phase 3: Database Metrics and Monitoring** 
**Concepts to Cover**
- Key Metrics to Monitor: - Done
  - IOPS (Input/Output Operations Per Second) - Done
  - CPU Usage - Done
  - Memory Usage - Done
  - Storage Usage - Done
  - Connection Count - Done
  - Slow Queries - Done

**Practice Tasks**
✅ Install PostgreSQL locally and use `pg_stat_activity` to monitor connections.  - Done
✅ Simulate a heavy read/write load and observe CPU and memory spikes.  - Done

---

# **Phase 4: Backup and Recovery Strategies**
**Concepts to Cover**
- Backup Schedules
- Full vs Incremental Backups
- Recovery Point Objective (RPO) vs Recovery Time Objective (RTO)
- Setting up Backup for PostgreSQL and MongoDB

**Practice Tasks**
✅ Set up an automatic backup script for PostgreSQL (using `pg_dump`).  
✅ Create a MongoDB backup using `mongodump` and restore using `mongorestore`.  
✅ Design a backup plan for a system that can't afford more than 5 minutes of data loss.

---

# **Phase 5: Deep Dive into PostgreSQL and MongoDB**
**Concepts to Cover**
- PostgreSQL Core Features:
  - ACID Transactions
  - Joins, Views, Indexing, Triggers
- MongoDB Core Features:
  - Document-based storage
  - Sharding and Replication
  - Indexing and Aggregation Framework

**Practice Tasks**
✅ Create a relational database schema in PostgreSQL (e.g., for a simple e-commerce site).  
✅ Create a MongoDB schema for the same e-commerce site (products, users, orders as collections).  
✅ Insert, update, delete, and query data in both PostgreSQL and MongoDB.  
✅ Implement basic aggregation queries in MongoDB (group by, sum).

---

# **Phase 6: Real-World Simulation Project**
**Mini Project: Library Management System**
- Users can borrow and return books.
- Keep track of books available, borrowed, and overdue.
- Store system metrics like number of active users.
- Ensure transaction atomicity for borrow/return operations.

**Tools/Stack**
- PostgreSQL for relational data (Books, Users, Loans)
- MongoDB for logs/analytics (e.g., user activity tracking)
- Backup schedules for both systems.

**Practice Tasks**
✅ Set up the PostgreSQL DB schema and tables.  
✅ Set up MongoDB for user activity tracking.  
✅ Write transaction logic ensuring consistency (e.g., a book cannot be borrowed if unavailable).  
✅ Set up backup jobs for both databases.

---

# 🌟 Bonus (Optional Advanced Concepts)
- Learn about Database Replication (Master-Slave, Master-Master).
- Understand Database Partitioning and Sharding.
- Explore Monitoring Tools: pgAdmin, Prometheus + Grafana for databases.
- Learn basic Database Security: User Roles, Privileges, Encryption.


https://dev.to/shreyvijayvargiya/list-of-45-databases-in-the-world-57e8
