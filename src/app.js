import express from "express";

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
