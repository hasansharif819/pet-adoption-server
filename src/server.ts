import { Server } from "http";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    const server: Server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
