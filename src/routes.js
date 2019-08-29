import { Router } from "express";

import auth from "./app/middlewares/auth";
import admin from "./app/middlewares/admin";
import user from "./app/middlewares/user";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import GithubController from "./app/controllers/GithubController";
import GithubUserController from "./app/controllers/GithubUserController";
import FolderController from "./app/controllers/FolderController";

import validateUserStore from "./app/validators/UserStore";
import validateUserUpdate from "./app/validators/UserUpdate";
import validateSessionStore from "./app/validators/SessionStore";
import validateSearchGithubUsers from "./app/validators/SearchGithubUsers";

const routes = new Router();

routes.post("/users", validateUserStore, UserController.store);
routes.post("/sessions", validateSessionStore, SessionController.store);

routes.use(auth);

routes.put("/users", validateUserUpdate, UserController.update);

routes.get(
  "/github/users",
  admin,
  validateSearchGithubUsers,
  GithubController.index
);

routes.get("/githubusers", GithubUserController.index);
routes.post("/githubusers", GithubUserController.store);
routes.delete("/githubusers/:id", admin, GithubUserController.destroy);

routes.get("/folders", FolderController.index);
routes.post("/folders", user, FolderController.store);
routes.put("/folders/:id", user, FolderController.update);
routes.delete("/folders/:id", user, FolderController.destroy);

export default routes;
