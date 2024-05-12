const mongoose = require("mongoose");
const { DB_PASSWORD } = require("./serverconfig");
const DB_URI = `mongodb+srv://imsandeep721:${DB_PASSWORD}@task.cjoa866.mongodb.net/`;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;