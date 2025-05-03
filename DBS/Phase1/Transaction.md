Great! Here's the content for `transaction.md`, covering:

* What a transaction is
* Key properties and examples
* Why transactions matter in real-world applications

---

**`transaction.md`**

````markdown
# What is a Transaction?

A **transaction** in a database is a sequence of operations performed as a single logical unit of work. A transaction must be either **fully completed** or **fully failed**—there is no in-between. This ensures that the database remains in a consistent state.

## Characteristics of a Transaction

- **Atomicity**: All steps must complete successfully; if one fails, the entire transaction fails.
- **Consistency**: The database must remain in a valid state before and after the transaction.
- **Isolation**: Transactions should not interfere with each other.
- **Durability**: Once a transaction is committed, its changes persist even in the event of a crash.

> These four properties are collectively known as **ACID** (covered in the next section).

## Example: Bank Money Transfer

Suppose Alice wants to send ₹1000 to Bob. The transaction would involve:
1. Deducting ₹1000 from Alice's account
2. Adding ₹1000 to Bob's account

**If any step fails**, both steps must be rolled back to prevent inconsistency.

```sql
BEGIN;

UPDATE accounts SET balance = balance - 1000 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 1000 WHERE name = 'Bob';

COMMIT;
````

If, for example, Bob’s update fails (say his account doesn’t exist), the entire transaction should be rolled back:

```sql
ROLLBACK;
```

## Why Transactions Matter

* Prevent data corruption during failures
* Ensure accurate results in concurrent environments
* Provide a safety net for critical operations like payments, inventory updates, or flight bookings
