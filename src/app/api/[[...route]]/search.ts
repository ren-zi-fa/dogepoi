import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";
import { SearchResult } from "@/types";

const url_target = process.env.BASE_URL as string;
const proxy = process.env.PROXY as string;

const searchRoute = new Hono();

searchRoute.get("/", async (c) => {
  const slug = c.req.query("q");

  if (!slug) {
    return c.json({ success: false, message: "Missing search parameter" }, 400);
  }

  const fullTargetUrl = `${url_target.replace(/\/$/, "")}/search/${slug}`;

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
    const results: SearchResult[] = [];

    $(".result ul li").each((_, el) => {
      const $item = $(el);

      const title = $item.find("h2 a").text().trim();
      const link = $item.find("h2 a").attr("href") || "";
      const image = $item.find(".limitnjg img").attr("src") || "";

      const desc = $item.find(".desc");

      const getFieldText = (label: string) => {
        const p = desc
          .find("p")
          .filter((_, p) =>
            $(p).text().toLowerCase().includes(`${label.toLowerCase()} :`)
          );
        return p.text().split(":").slice(1).join(":").trim();
      };

      const sinopsis = desc.find("p").first().text().trim(); // fallback awal
      const producers = getFieldText("producers");
      const genreText = getFieldText("genre");

      const duration = getFieldText("duration");
      const size = getFieldText("size");

      // Pisahkan genre jadi array jika pakai koma
      const genres = genreText
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);

      if (title && link) {
        results.push({
          title,
          link,
          image,
          sinopsis,
          genre: genreText,

          producers,
          duration,
          size,
          genres,
        });
      }
    });

    const pagination = {
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPageUrl: null as string | null,
      previousPageUrl: null as string | null,
    };

    const paginationContainer = $(".navigation.pagination .nav-links");
    if (paginationContainer.length > 0) {
      const currentPageElement = paginationContainer.find(
        ".page-numbers.current"
      );
      pagination.currentPage = parseInt(currentPageElement.text().trim()) || 1;

      const pageNumbers: number[] = [];
      paginationContainer.find("a.page-numbers").each((_, el) => {
        const pageText = $(el).text().trim();
        const pageNumber = parseInt(pageText);
        if (!isNaN(pageNumber)) {
          pageNumbers.push(pageNumber);
        }
      });

      pagination.totalPages = Math.max(...pageNumbers, pagination.currentPage);

      const nextPageElement = paginationContainer.find("a.next.page-numbers");
      if (nextPageElement.length > 0) {
        pagination.hasNextPage = true;
        pagination.nextPageUrl = nextPageElement.attr("href") || null;
      }

      pagination.hasPreviousPage = pagination.currentPage > 1;
      if (pagination.hasPreviousPage) {
        const prevPage = pagination.currentPage - 1;
        pagination.previousPageUrl = `${url_target.replace(
          /\/$/,
          ""
        )}/search/${slug}/page/${prevPage}/`;
      }
    }

    return c.json({
      success: true,
      query: slug,
      totalResults: results.length,
      pagination,
      data: results,
    });
  } catch (err) {
    console.error("❌ Scraping failed:", err);
    return c.json(
      {
        success: false,
        message: "Failed to fetch or parse page",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      500
    );
  }
});

export default searchRoute;
