import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";
import { AnimeResponse, GenreItem } from "@/types";

const url_target = process.env.BASE_URL as string;
const proxy = process.env.PROXY as string;

const genreRoute = new Hono();

genreRoute.get("/:genre", async (c) => {
  const { genre } = c.req.param();
  const page = c.req.query("page");

  if (!genre) {
    return c.json({ success: false, message: "Missing genre parameter" }, 400);
  }

  // 💡 Validasi page: hanya tambahkan jika ada dan bukan kosong
  const baseUrl = `${url_target.replace(/\/$/, "")}/genres/${genre}`;
  const fullTargetUrl =
    typeof page === "string" && page.trim() !== ""
      ? `${baseUrl}/page/${page.trim()}`
      : baseUrl;

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
    const items: GenreItem[] = [];

    $("div.result ul > li").each((_, el) => {
      const $el = $(el);

      const title = $el.find("h2 a").text().trim();
      const url = $el.find("h2 a").attr("href") || "";
      const thumbnail = $el.find(".limitnjg img").attr("src") || "";

      const genres: string[] = [];
      $el.find(".genre a").each((_, genreEl) => {
        const genreText = $(genreEl).text().trim();
        if (genreText) genres.push(genreText);
      });

      const description = $el.find(".desc p").first().text().trim();

      items.push({
        title,
        url,
        thumbnail,
        genres,
        description,
      });
    });

    // === Pagination Handling ===
    const paginationEl = $(".navigation.pagination");

    let currentPage = 1;
    let hasNextPage = false;
    let nextPageUrl: string | null = null;
    let totalPages = 1;

    if (paginationEl.length > 0) {
      const currentPageText = paginationEl.find(".page-numbers.current").text();
      currentPage = parseInt(currentPageText, 10) || 1;

      const pageLinks = paginationEl.find(".page-numbers");
      const pageNumbers = pageLinks
        .map((_, el) => parseInt($(el).text(), 10))
        .get()
        .filter((n) => !isNaN(n));
      if (pageNumbers.length > 0) {
        totalPages = Math.max(...pageNumbers);
      }

      const nextLink = paginationEl.find("a.next").attr("href");
      if (nextLink) {
        hasNextPage = true;
        nextPageUrl = nextLink;
      }
    }

    const response: AnimeResponse<GenreItem[]> = {
      success: true,
      data: items,
      pagination: {
        currentPage,
        hasNextPage,
        nextPageUrl,
        totalPages,
      },
    };

    return c.json(response);
  } catch (err) {
    console.error("❌ Scraping failed:", err);
    return c.json(
      { success: false, message: "Failed to fetch or parse page" },
      500
    );
  }
});

export default genreRoute;
