import { Router } from "express";

import auth from "./app/middlewares/auth";
import admin from "./app/middlewares/admin";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import GithubController from "./app/controllers/GithubController";

import validateUserStore from "./app/validators/UserStore";
import validateUserUpdate from "./app/validators/UserUpdate";
import validateSessionStore from "./app/validators/SessionStore";

const routes = new Router();

routes.post("/users", validateUserStore, UserController.store);
routes.post("/sessions", validateSessionStore, SessionController.store);

routes.use(auth);

routes.put("/users", validateUserUpdate, UserController.update);

routes.get("/github/users", admin, GithubController.index);

export default routes;
