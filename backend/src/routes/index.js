const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

console.log("PORT from .env:", process.env.PORT);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`GasNet Backend Server is running on port ${PORT}`);
});
