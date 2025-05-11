# Backup Strategy Essentials

This document explains essential concepts in data backup planning: backup schedules, types of backups (full vs incremental), and key recovery metrics (RPO vs RTO).

---

## 📅 Backup Schedules

A **backup schedule** defines how often backups are performed and what type is used at each interval.

### Common Strategies

| Frequency       | Description                                           | Example                       |
|----------------|-------------------------------------------------------|-------------------------------|
| Daily          | Backup every 24 hours                                 | 2 AM every day                |
| Weekly         | Full backup once a week, incrementals in-between      | Full on Sunday, incrementals Mon–Sat |
| Monthly        | Full backup at the end/start of each month            | 1st of every month            |
| Hourly         | Often used for mission-critical systems               | Every hour from 9 AM to 6 PM  |
| Custom         | Based on business requirements and system usage       | E.g., every 4 hours on weekdays |

---

## 💾 Full vs Incremental Backups

| Backup Type     | Description                                                                 | Pros                                       | Cons                                       |
|-----------------|-----------------------------------------------------------------------------|--------------------------------------------|--------------------------------------------|
| Full Backup     | Captures **all data** at a point in time                                    | Easiest to restore; complete snapshot      | Time-consuming; storage-intensive          |
| Differential    | Backs up **all data changed** since the last full backup                    | Faster recovery than incremental (only full + latest differential needed) | Larger storage than incremental; slower backups as time passes from full |
| Incremental     | Backs up **only the data changed** since the last backup (full or incremental) | Fast; storage-efficient                    | Slower recovery (must restore full + all increments) |

### Example Workflows

#### Incremental Backup Strategy
1. **Sunday:** Full Backup  
2. **Monday–Saturday:** Incremental Backups  
3. **Restore:** Use Sunday's full + each day's incremental to restore to any day

#### Differential Backup Strategy
1. **Sunday:** Full Backup
2. **Monday–Saturday:** Differential Backups (each contains all changes since Sunday)
3. **Restore:** Use Sunday's full + only the latest differential backup to restore

---

## 🧠 RPO vs RTO

Understanding **Recovery Point Objective (RPO)** and **Recovery Time Objective (RTO)** is key to planning disaster recovery.

| Metric | Meaning | Example | Goal |
|--------|---------|---------|------|
| **RPO** (Recovery Point Objective) | Max acceptable **data loss** in case of failure | RPO = 1 hour → backups every hour | Minimize data loss |
| **RTO** (Recovery Time Objective) | Max acceptable **downtime** before service must be restored | RTO = 2 hours → restore within 2 hours | Minimize downtime |

### Visual Example

```
[ Data written ]----[ Failure occurs ]
^                   ^
|                   |
Last backup         Recovery needed

* RPO = Time between last backup and failure
* RTO = Time from failure to full restoration
```

---

## ✅ Best Practices

- Use a **combination** of full and incremental backups for efficiency.
- Automate backups and **monitor them regularly**.
- Store backups in **multiple locations** (e.g., local + cloud).
- Periodically **test restore procedures** to ensure reliability.
- Align backup plans with your **RPO and RTO** requirements.

---

## 📦 Recommended Tools
- **PostgreSQL:** `pg_dump`, `pg_basebackup`, `wal-g`
- **MongoDB:** `mongodump`, `mongorestore`, `MongoDB Ops Manager`
- **Docker volumes:** Use `docker cp`, `rsync`, or bind mounts with cron jobs

---

📚 *A well-designed backup plan balances speed, cost, and risk. Tailor your approach based on business needs and system criticality.*