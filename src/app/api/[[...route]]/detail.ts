import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

const url_target = process.env.BASE_URL as string; // contoh: https://nekopoi.care/hentai
const proxy = process.env.PROXY as string;

const detailRoute = new Hono();

detailRoute.get("/:slug", async (c) => {
  const { slug } = c.req.param();

  if (!slug) {
    return c.json({ success: false, message: "Missing slug parameter" }, 400);
  }

  // Gabungkan URL target
  const fullTargetUrl = `${url_target.replace(/\/$/, "")}/hentai/${slug}`;
  try {
    const { data: html } = await axios.get(proxy, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "x-target-url": fullTargetUrl, // pastikan ini target akhir
      },
      timeout: 60000,
    });

    const $ = cheerio.load(html);
    const container = $(".animeinfos");

    const title = container.find("h2").first().text().trim();
    const image = container.find(".imgdesc img").attr("src") || "";
    const sinopsis = container.find(".desc p").text().trim();

    const latestEpisode = {
      title: container.find(".latestepisode").text().trim(),
      link: container.find(".latestnow a").attr("href") || "",
    };

    const infoItems: Record<string, string> = {};
    container.find(".listinfo li").each((_, li) => {
      const key = $(li).find("b").text().replace(":", "").trim();
      const val = $(li)
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(":", "")
        .trim();
      infoItems[key] = val;
    });

    const genres = container
      .find('.listinfo li:has(b:contains("Genres")) a')
      .map((_, el) => $(el).text().trim())
      .get();

    const episodes = container
      .find(".episodelist li")
      .map((_, li) => {
        const epTitle = $(li).find(".leftoff a").text().trim();
        const epLink = $(li).find(".leftoff a").attr("href") || "";
        const epDate = $(li).find(".rightoff").text().trim();
        return { title: epTitle, link: epLink, date: epDate };
      })
      .get();

    return c.json({
      success: true,
      data: {
        title,
        image,
        sinopsis,
        latestEpisode,
        info: infoItems,
        genres,
        episodes,
      },
    });
  } catch (err) {
    console.error("❌ Scraping failed:", err);
    return c.json(
      { success: false, message: "Failed to fetch or parse page" },
      500
    );
  }
});

export default detailRoute;
