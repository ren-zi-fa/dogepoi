import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

const proxy = process.env.PROXY as string;
const target_url = process.env.BASE_URL as string;

const animeRoute = new Hono();

animeRoute.get("/", async (c) => {
  try {
    const response = await axios.get(proxy, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "x-target-url": target_url,
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 60000,
    });

    const $ = cheerio.load(response.data);

    const hentaiTerbaru = $(".animeseries li")
      .map((_, li) => {
        const anchor = $(li).find("a.series");
        const title = anchor.find(".title").text().trim();
        const image = anchor.find("img").attr("src") || "";
        const link = anchor.attr("href") || "";
        return { title, image, link };
      })
      .get();

    const episodeTerbaru = $(".eropost")
      .map((_, post) => {
        const title = $(post).find("h2 a").text().trim();
        const link = $(post).find("h2 a").attr("href") || "";
        const image = $(post).find("img").attr("src") || "";
        const date = $(post).find("span").first().text().trim();
        return { title, image, link, date };
      })
      .get();

    return c.json({ success: true, data: { hentaiTerbaru, episodeTerbaru } });
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

export default animeRoute;
