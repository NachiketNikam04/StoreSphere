require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed");
    console.error(err);
  });