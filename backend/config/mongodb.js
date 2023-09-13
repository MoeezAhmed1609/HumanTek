const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((response) => {
      console.log(
        "MongoDB connection established with " + response.connection.host
      );
    });
};

module.exports = connectMongoDB;
