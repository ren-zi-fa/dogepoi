import { Hono } from "hono";
import { handle } from "hono/vercel";
import home from "./home";
import detail from "./detail";
import watch from "./watch";
import page from "./pages";

const app = new Hono().basePath("/api");

app.get("/", (c) => c.json({ message: "this works" }));

export const routes = app
  .route("/home", home)
  .route("/detail", detail)
  .route("/watch", watch)
  .route("/page", page);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
