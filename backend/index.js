const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./src/config/db");
(async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`✅ Listenting to port ${PORT}!`));
})();
