const { MongoClient } = require("mongodb");

async function run() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient("mongodb://localhost:27017");

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("testdb");
    const col = db.collection("load_test");

    console.log("Generating load on MongoDB...");
    const promises = [];
    for (let i = 0; i < 20000; i++) {
      promises.push(col.insertOne({ data: `Random text ${i}` }));
    }

    await Promise.all(promises);
    console.log("All documents inserted successfully.");

  } catch (error) {
    console.error("Error during MongoDB operations:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
    console.log("Script execution completed.");
  }
}

run().catch((e) => {
  console.error("Unhandled error:", e);
});
