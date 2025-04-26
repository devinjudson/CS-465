const db = require("./db");
const tripModel = require("./travlr");
const fs = require("fs");
const trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf-8"));

const seedDB = async () => {
  await tripModel.deleteMany({});
  await tripModel.insertMany(trips);
};

seedDB().then(async () => {
  await db.connection.close();
  process.exit(0);
});