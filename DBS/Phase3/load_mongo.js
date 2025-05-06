const { MongoClient } = require("mongodb");

async function run() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("testdb");
  const col = db.collection("load_test");

  console.log("Generating load on MongoDB...");
  const promises = [];
  for (let i = 0; i < 10000; i++) {
    promises.push(col.insertOne({ data: `Random text ${i}` }));
  }
  await Promise.all(promises);
  await client.close();
}

run().catch(console.error);
