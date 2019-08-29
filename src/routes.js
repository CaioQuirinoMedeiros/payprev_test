import { Router } from "express";

import auth from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import GithubController from "./app/controllers/GithubController";

import validateUserStore from "./app/validators/UserStore";
import validateUserUpdate from "./app/validators/UserUpdate";
import validateSessionStore from "./app/validators/SessionStore";

const routes = new Router();

routes.post("/users", validateUserStore, UserController.store);
routes.post("/sessions", validateSessionStore, SessionController.store);

routes.put("/users", auth, validateUserUpdate, UserController.update);

routes.get("/admin/github/users", GithubController.index);

export default routes;
