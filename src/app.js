import "dotenv/config";
import express from "express";

import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {}

  exeptionHandler() {}
}

export default new App().server;
