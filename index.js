import app from "./app.js";
import { connection } from "./db/connection.js";
import { PORT } from "./config/config.js";

async function main() {
  try {
    connection();
    await app.listen(PORT);
    console.log(`Server on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

main();
