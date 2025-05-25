// Define schema conceptually
/*
users: {
  _id: ObjectId,
  name: String,
  email: String
}

products: {
  _id: ObjectId,
  name: String,
  price: Number,
  stock: Number
}

orders: {
  _id: ObjectId,
  user_id: ObjectId,
  order_date: Date,
  items: [
    {
      product_id: ObjectId,
      quantity: Number,
      price: Number
    }
  ]
}
*/

// MongoDB is document-based
// Denormalization: Store order items inside orders
// Normalization: Keep separate collections and use references
