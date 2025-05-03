# What is ACID?

ACID is an acronym that represents the four key properties that guarantee reliable processing of database transactions. These properties ensure that databases remain accurate, consistent, and fault-tolerant—even during errors or system failures.

## 1. Atomicity

**Definition:**  
Ensures that a transaction is all-or-nothing. If any part of the transaction fails, the entire transaction is rolled back.

**Example:**  
In a funds transfer, if money is debited from one account but not credited to another due to a system crash, atomicity ensures that the debit is undone.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
-- Suppose the next line fails
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
ROLLBACK;
````

**Why It Matters:**
Prevents partial updates that can leave the database in an inconsistent state.

---

## 2. Consistency

**Definition:**
A transaction must bring the database from one valid state to another, maintaining all predefined rules (constraints, triggers, cascades, etc.).

**Example:**
If a user cannot have a negative account balance, a transaction that tries to withdraw more than the current balance must be rejected.

```sql
-- Enforced by CHECK constraint
ALTER TABLE accounts ADD CONSTRAINT positive_balance CHECK (balance >= 0);
```

**Why It Matters:**
Ensures business rules and data integrity are never violated.

---

## 3. Isolation

**Definition:**
Concurrent transactions must not interfere with each other. Intermediate states of one transaction must not be visible to others.

**Example:**
If two users are booking the last available seat simultaneously, isolation ensures only one transaction succeeds.

Absolutely! Here's the updated version with clear definitions of the read anomalies:

---

### **Levels of Isolation (SQL Standard)**

* **READ UNCOMMITTED**
  → *Allows reading uncommitted changes (dirty reads).*
  ⚠️ Least safe — can see changes from other transactions that might still be rolled back.

* **READ COMMITTED**
  → *Reads only committed data; avoids dirty reads.*
  ⚠️ Can still get **non-repeatable reads** — values might change if re-read during the same transaction.

* **REPEATABLE READ**
  → *Ensures the same rows return the same data if read again.*
  ✅ Prevents **dirty reads** and **non-repeatable reads**.
  ⚠️ Allows **phantom reads** — new rows might show up if the same query is run again.

* **SERIALIZABLE**
  → *Fully isolates each transaction — behaves as if transactions run one at a time.*
  ✅ Prevents **dirty reads**, **non-repeatable reads**, and **phantom reads**.

---

### **Read Anomalies Explained**

* **Dirty Read**
  → Reading data written by another transaction that hasn’t committed yet.
  → If that transaction rolls back, you’ve read invalid data.

* **Non-Repeatable Read**
  → Reading the same row twice and getting different values because another transaction modified it in between.

* **Phantom Read**
  → A repeated query returns additional rows because another transaction inserted (or deleted) matching data in the meantime.

---

## 4. Durability

**Definition:**
Once a transaction is committed, it is permanent—even if the system crashes afterward.

**Example:**
If a transaction updates inventory levels and is committed, the change persists across power failures.

**Why It Matters:**
Gives confidence that committed data is safe and won’t be lost.

---

## Real-World Examples Where ACID is Crucial ✅

* **Banking Systems**: Transfers, deposits, withdrawals
* **E-Commerce**: Order placement, inventory updates
* **Flight/Train Booking**: Seat reservations
* **Healthcare**: Patient record updates
* **Stock Trading**: Buy/sell order placements

