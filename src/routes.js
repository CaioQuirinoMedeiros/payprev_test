import { Router } from "express";

import auth from "./app/middlewares/auth";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

import validateUserStore from "./app/validators/UserStore";
import validateUserUpdate from "./app/validators/UserUpdate";

const routes = new Router();

routes.post("/users", validateUserStore, UserController.store);
routes.post("/sessions", SessionController.store);

routes.put("/users", auth, validateUserUpdate, UserController.update);

export default routes;
