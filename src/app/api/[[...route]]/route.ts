import { Hono } from "hono";
import { handle } from "hono/vercel";
import home from "./home";
import detail from "./detail";
import watch from "./watch";
import page from "./pages";
import search from "./search";
import genre from "./genre";
import genreList from "./genre-list";
import hentai from "./hentai";

const app = new Hono().basePath("/api");

app.get("/", (c) => c.json({ message: "api omke" }));

export const routes = app
  .route("/home", home)
  .route("/detail", detail)
  .route("/watch", watch)
  .route("/page", page)
  .route("/search", search)
  .route("/genre", genre)
  .route("/genre-list", genreList)
  .route("/hentai", hentai);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
