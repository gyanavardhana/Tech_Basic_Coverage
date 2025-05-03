1. Schema to create a simple `accounts` table
2. Sample data for two users
3. A transaction that transfers money from one account to another
4. A failing case to test rollback and atomicity

---

### ✅ Step 1: Create the Table

```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL CHECK (balance >= 0)
);
```

---

### ✅ Step 2: Insert Sample Data

```sql
INSERT INTO accounts (name, balance) VALUES
('Alice', 5000.00),
('Bob', 3000.00);
```

---

### ✅ Step 3: View Initial Balances

```sql
SELECT * FROM accounts;
```

---

### ✅ Step 4: Simulate a Transaction – Transfer ₹1000 from Alice to Bob

```sql
BEGIN;

-- Deduct from Alice
UPDATE accounts SET balance = balance - 1000 WHERE name = 'Alice';

-- Add to Bob
UPDATE accounts SET balance = balance + 1000 WHERE name = 'Bob';

COMMIT;
```

> ✅ After this, Alice will have ₹4000, and Bob will have ₹4000.

---

### ❌ Step 5: Simulate a Failure – Rollback Example

Let’s try to transfer ₹6000 from Bob to Charlie (who doesn’t exist):

```sql
BEGIN;

-- Deduct from Bob
UPDATE accounts SET balance = balance - 6000 WHERE name = 'Bob';

-- Add to Charlie (this will fail)
UPDATE accounts SET balance = balance + 6000 WHERE name = 'Charlie';  -- Error: no such user

COMMIT;
```

> ❌ This entire transaction will be rolled back, and Bob's balance will remain unchanged.

---

### 🧪 Step 6: Confirm Final Balances

```sql
SELECT * FROM accounts;
```
