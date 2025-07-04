/*  eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";
import { AnimeResponse, GenreItem } from "@/types";

const url_target = process.env.BASE_URL as string;
const proxy = process.env.PROXY as string;

const categoryRoute = new Hono();

categoryRoute.get("/:category", async (c) => {
  const { category } = c.req.param();
  const page = c.req.query("page");
  const baseUrl = `${url_target.replace(/\/$/, "")}/category/${category}`;
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
    const items: any[] = [];

    $("div.result ul > li").each((_, el) => {
      const $el = $(el);

      const title = $el.find("h2 a").text().trim();
      const url = $el.find("h2 a").attr("href") || "";
      const thumbnail = $el.find(".limitnjg img").attr("src") || "";

      // Initialize variables for each item
      const genres: string[] = [];
      let synopsis = "";

      let producers = "";

      // Get the description element
      const descEl = $el.find(".desc");

      // Extract data from description paragraphs
      descEl.find("p").each((_, p) => {
        const $p = $(p);
        const text = $p.text().trim();
        const textLower = text.toLowerCase();

        // Extract synopsis
        if (textLower.startsWith("sinopsis")) {
          // Check if this paragraph contains the synopsis content
          const synopsisContent = text.replace(/^sinopsis\s*:?\s*/i, "").trim();
          if (synopsisContent) {
            synopsis = synopsisContent;
          } else {
            // Check next paragraph for synopsis content
            const nextP = $p.next("p");
            if (nextP.length) {
              synopsis = nextP.text().trim();
            }
          }
        }

        // Extract genre from paragraph with "Genre :" label
        if (textLower.includes("genre") && text.includes(":")) {
          const genreMatch = text.match(/genre\s*:\s*(.+)/i);
          if (genreMatch && genreMatch[1]) {
            const genreItems = genreMatch[1].split(",").map((g) => g.trim());
            genreItems.forEach((g) => {
              if (g && !genres.includes(g)) {
                genres.push(g);
              }
            });
          }
        }

        // Extract producers
        if (textLower.includes("producers") && text.includes(":")) {
          const producersMatch = text.match(/producers\s*:\s*(.+)/i);
          if (producersMatch && producersMatch[1]) {
            producers = producersMatch[1].trim();
          }
        }
      });

      // Also check for genres in separate .genre elements (if any)
      $el.find(".genre").each((_, genreEl) => {
        const genreText = $(genreEl).text().trim();
        if (genreText && !genres.includes(genreText)) {
          genres.push(genreText);
        }
      });

      // Create the item object
      const item = {
        title,
        url,
        thumbnail,
        genres,
        synopsis,
        producers,
      };

      items.push(item);
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

export default categoryRoute;
