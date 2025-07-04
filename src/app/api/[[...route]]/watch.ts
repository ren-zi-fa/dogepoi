import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

const url_target = process.env.BASE_URL as string;
const proxy = process.env.PROXY as string;

const watchRoute = new Hono();

watchRoute.get("/:slug", async (c) => {
  const { slug } = c.req.param();

  if (!slug) {
    return c.json({ success: false, message: "Missing slug parameter" }, 400);
  }

  const fullTargetUrl = `${url_target.replace(/\/$/, "")}/${slug}`;


  try {
    const { data: html } = await axios.get(proxy, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "x-target-url": fullTargetUrl,
      },
      timeout: 60000,
    });

    const $ = cheerio.load(html);

    const container = $(".contentpost");
    const image = container.find(".thm img").attr("src") || "";

    const streamIframes = $("#show-stream iframe")
      .map((i, el) => $(el).attr("src"))
      .get()
      .filter(Boolean);

    const title =
      container
        .find(".thm img")
        .attr("title")
        ?.trim()
        ?.replace(/\[.*?\]/, "")
        .trim() || "";

    const sinopsis = container.find(".konten p").eq(1).text().trim();

    const genreText = container
      .find("p:contains('Genre')")
      .text()
      .replace(/Genre\s*:/i, "")
      .trim();
    const genres = genreText.split(",").map((g) => g.trim());

    const producer = container
      .find("p:contains('Producers')")
      .text()
      .replace(/Producers\s*:/i, "")
      .trim();

    const duration = container
      .find("p:contains('Duration')")
      .text()
      .replace(/Duration\s*:/i, "")
      .trim();

    const sizeText = container
      .find("p:contains('Size')")
      .text()
      .replace(/Size\s*:/i, "")
      .trim();

    const note = container.find("h3:contains('Catatan')").text().trim();
    const downloadSections = $(".arealinker .boxdownload .liner")
      .map((_, el) => {
        const resolution = $(el).find(".name").text().trim();
        const links = $(el)
          .find(".listlink p a")
          .map((_, a) => {
            const name = $(a).text().trim();
            const url = $(a).attr("href") || "";
            return { name, url };
          })
          .get();
        return { resolution, links };
      })
      .get();

    return c.json({
      success: true,
      data: {
        title,
        image,
        sources_video: streamIframes,
        sinopsis,
        genres,
        producer,
        duration,
        size: sizeText,
        note,
        download_links: downloadSections,
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

export default watchRoute;
