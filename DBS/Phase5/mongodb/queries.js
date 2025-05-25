// Insert sample data
db.users.insertOne({ name: "Alice", email: "alice@example.com" });

db.products.insertOne({ name: "Phone", price: 599.99, stock: 10 });

const user = db.users.findOne({ email: "alice@example.com" });
const product = db.products.findOne({ name: "Phone" });

db.orders.insertOne({
  user_id: user._id,
  order_date: new Date(),
  items: [
    { product_id: product._id, quantity: 2, price: 599.99 }
  ]
});

// Update
db.products.updateOne(
  { _id: product._id },
  { $inc: { stock: -2 } }
);

// Delete
db.orders.deleteOne({ _id: ObjectId("...") });

// Find
db.orders.find({ user_id: user._id });

// Aggregation (total sales per product)
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product_id",
      total_sales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
    }
  }
]);

// Index
db.products.createIndex({ name: 1 });

// Sharding/Replication (notes only)
// - Sharding: Split data by key (e.g., user_id)
// - Replication: Automatic failover with replica set
