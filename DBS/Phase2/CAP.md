# The CAP Theorem in Distributed Systems

## Core Concept

The **CAP Theorem** (proposed by Eric Brewer in 2000) states that any distributed data store can provide only **two out of three** guarantees simultaneously:

| Property | Definition |
|----------|------------|
| **C**onsistency | All nodes see the same data at the same time |
| **A**vailability | Every request receives a response (success or failure) |
| **P**artition Tolerance | System continues to operate despite network failures |

## Visual Representation

```
        Consistency (C)
           /\
          /  \
         /    \
        /      \
       /        \
Availability (A)------Partition Tolerance (P)
```

## Key Insights

- In practical distributed systems, network partitions **will** occur
- Therefore, you must choose between consistency and availability
- No distributed system can provide all three guarantees simultaneously

## System Classifications

### CP Systems (Consistency + Partition Tolerance)
- **Prioritize:** Consistent data over availability
- **Behavior during partition:** May refuse operations until consistency can be guaranteed
- **Examples:** 
  - MongoDB (with majority write concern)
  - HBase
  - Redis (in certain configurations)
  - Google BigTable

### AP Systems (Availability + Partition Tolerance)
- **Prioritize:** System availability over immediate consistency
- **Behavior during partition:** Accept operations but may return stale data
- **Examples:**
  - Cassandra (with tunable consistency)
  - Amazon DynamoDB
  - Couchbase
  - Riak

### CA Systems (Consistency + Availability)
- **Important note:** Not practically achievable in distributed environments
- Only possible in single-node systems or perfect networks (which don't exist at scale)
- Traditional RDBMS systems like PostgreSQL and MySQL are often described as "CA" but can't maintain both during network partitions

## Consistency Models

The "C" in CAP represents strict consistency, but distributed systems often implement different consistency models:

| Consistency Model | Description |
|-------------------|-------------|
| **Strong Consistency** | All reads reflect the latest write |
| **Eventual Consistency** | Given enough time, all replicas will converge |
| **Causal Consistency** | Operations that are causally related appear in same order to all nodes |
| **Read-your-writes Consistency** | A user always sees their own updates |
| **Session Consistency** | Guarantees within a session, but not across sessions |

## Design Considerations

When designing distributed systems, consider:

1. **Business requirements:** What matters more for your use case?
2. **Failure modes:** How should your system behave during partitions?
3. **Data characteristics:** Is your data read-heavy or write-heavy?
4. **Latency requirements:** What response times are acceptable?

## Real-World Applications

| System Type | Common Choice | Reasoning |
|-------------|--------------|-----------|
| Banking systems | CP | Financial data requires consistency |
| Social media | AP | Better user experience with high availability |
| E-commerce inventory | CP | Stock levels need accuracy |
| Content delivery | AP | Availability prioritized over perfect consistency |

## Beyond CAP: PACELC Theorem

The PACELC theorem extends CAP by considering latency:
- During a **P**artition, choose between **A**vailability and **C**onsistency
- **E**lse (normal operation), choose between **L**atency and **C**onsistency

## Conclusion

The CAP Theorem isn't about limitations but about making informed trade-offs. Understanding these constraints helps architects design systems that align with business requirements while acknowledging the fundamental constraints of distributed computing.