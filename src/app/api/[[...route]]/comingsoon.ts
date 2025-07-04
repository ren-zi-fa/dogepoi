/*  eslint-disable @typescript-eslint/no-explicit-any */

import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";
import { AnimeResponse, ComingSoonItem } from "@/types";

const url_target = process.env.BASE_URL as string;
const proxy = process.env.PROXY as string;

const comingSoonRoute = new Hono();

comingSoonRoute.get("/", async (c) => {
  const fullTargetUrl = `${url_target.replace(/\/$/, "")}/jadwal-new-hentai`;

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
    const items: ComingSoonItem[] = [];

    // Extract items from .coming_soon divs
    $(".coming_soon").each((_, el) => {
      const $el = $(el);

      // Initialize variables for each item
      let title = "";
      let episode = "";
      let url = "";
      let thumbnail = "";
      let producer = "";
      let releaseDate = "";

      // Extract title and episode
      const titleEl = $el.find("h2 a.title");
      if (titleEl.length) {
        title = titleEl.text().trim();
        url = titleEl.attr("href") || "";
      }

      const episodeEl = $el.find(".episode");
      if (episodeEl.length) {
        episode = episodeEl.text().trim().replace(/[()]/g, ""); // Remove parentheses
      }

      // Extract thumbnail
      const imgEl = $el.find("img");
      if (imgEl.length) {
        thumbnail = imgEl.attr("src") || "";
      }

      // Extract producer/label and release date from the second h2
      const infoEl = $el.find("h2").eq(1);
      if (infoEl.length) {
        const infoText = infoEl.text();

        // Extract producer
        const producerMatch = infoText.match(
          /Producer\s*\/\s*Label\s*:\s*([^T]+?)(?=Tanggal|$)/i
        );
        if (producerMatch && producerMatch[1]) {
          producer = producerMatch[1].trim();
        }

        // Extract release date
        const releaseDateMatch = infoText.match(
          /Tanggal\s*Release\s*:\s*([^S]+?)(?=Sub|$)/i
        );
        if (releaseDateMatch && releaseDateMatch[1]) {
          releaseDate = releaseDateMatch[1].trim();
        }
      }

      // Alternative extraction using specific selectors
      const releaseDateEl = $el.find(".release_date");
      if (releaseDateEl.length && !releaseDate) {
        releaseDate = releaseDateEl.text().trim();
      }

      // Create the item object
      const item = {
        title,
        episode,
        url,
        thumbnail,
        producer,
        releaseDate,
      };

      // Only add if we have at least a title
      if (title) {
        items.push(item);
      }
    });

    // If no items found, try alternative parsing
    if (items.length === 0) {
      $(".spoiler-body .coming_soon, .spoiler-body > div").each((_, el) => {
        const $el = $(el);

        // Skip if not a coming soon item
        if (!$el.find("h2").length) return;

        let title = "";
        let episode = "";
        let url = "";
        let thumbnail = "";
        let producer = "";
        let releaseDate = "";
        let subIndo = "";

        // Extract from any h2 with title
        $el.find("h2").each((_, h2) => {
          const $h2 = $(h2);
          const titleLink = $h2.find("a");

          if (titleLink.length && !title) {
            title = titleLink.text().trim();
            url = titleLink.attr("href") || "";
          }

          const episodeSpan = $h2.find(".episode, span").filter(function () {
            return $(this).text().includes("Episode");
          });

          if (episodeSpan.length && !episode) {
            episode = episodeSpan.text().trim().replace(/[()]/g, "");
          }

          // Extract other info from h2 text
          const h2Text = $h2.text();

          if (h2Text.includes("Producer") && !producer) {
            const producerMatch = h2Text.match(
              /Producer[^:]*:\s*([^T\n]+?)(?=Tanggal|$)/i
            );
            if (producerMatch && producerMatch[1]) {
              producer = producerMatch[1].trim();
            }
          }

          if (h2Text.includes("Tanggal") && !releaseDate) {
            const dateMatch = h2Text.match(
              /Tanggal[^:]*:\s*([^S\n]+?)(?=Sub|$)/i
            );
            if (dateMatch && dateMatch[1]) {
              releaseDate = dateMatch[1].trim();
            }
          }
        });

        // Extract thumbnail
        const imgEl = $el.find("img");
        if (imgEl.length) {
          thumbnail = imgEl.attr("src") || "";
        }

        // Extract from release_date class
        const releaseDateEl = $el.find(".release_date");
        if (releaseDateEl.length && !releaseDate) {
          releaseDate = releaseDateEl.text().trim();
        }

        if (title) {
          items.push({
            title,
            episode,
            url,
            thumbnail,
            producer,
            releaseDate,
          });
        }
      });
    }

    const response: AnimeResponse<ComingSoonItem[]> = {
      success: true,
      data: items,
      pagination: {
        currentPage: 1,
        hasNextPage: false,
        nextPageUrl: null,
        totalPages: 1,
      },
    };

    return c.json(response);
  } catch (err) {
    console.error("❌ Coming Soon scraping failed:", err);
    return c.json(
      { success: false, message: "Failed to fetch or parse coming soon page" },
      500
    );
  }
});

export default comingSoonRoute;
