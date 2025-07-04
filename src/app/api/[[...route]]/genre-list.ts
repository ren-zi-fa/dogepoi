import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

const proxy = process.env.PROXY as string;
const target_url = process.env.BASE_URL as string;

const genreList = new Hono();

genreList.get("/", async (c) => {
  try {
    const response = await axios.get(proxy, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "x-target-url": `${target_url}/genre-list`,
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 60000,
    });

    const $ = cheerio.load(response.data);

    const genres: { name: string; slug: string; url: string }[] = [];

    $("div.genres a").each((_, el) => {
      const name = $(el).text().trim();
      const url = $(el).attr("href") || "";
      const slug = url.split("/").filter(Boolean).pop() || "";
      genres.push({ name, slug, url });
    });

    return c.json({ success: true, data: genres });
  } catch (error) {
    console.error("❌ Error scraping:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      500
    );
  }
});

export default genreList;
