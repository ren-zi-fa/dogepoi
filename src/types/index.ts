export interface HentaiItem {
  title: string;
  image: string;
  link: string;
}

export interface EpisodeItem {
  title: string;
  image: string;
  link: string;
  date: string;
}
export interface EpisodeInfo {
  title: string;
  link: string;
}

export interface Episode {
  title: string;
  link: string;
  date: string;
}

export interface AnimeResponseData {
  hentaiTerbaru: HentaiItem[];
  episodeTerbaru: EpisodeItem[];
}

export interface AnimeDetail {
  title: string;
  image: string;
  sinopsis: string;
  latestEpisode: EpisodeInfo;
  info: Record<string, string>;
  genres: string[];
  episodes: Episode[];
}

interface DownloadLink {
  name: string;
  url: string;
}

interface DownloadSection {
  resolution: string;
  links: DownloadLink[];
}

export interface WatchinAnime {
  duration?: string;
  genres?: string[];
  image?: string;
  note?: string;
  producer?: string;
  sinopsis?: string;
  size?: string;
  sources_video?: string[];
  title?: string;
  download_links: DownloadSection[];
}

export interface SearchResult {
  title: string;
  link: string;
  image: string;
  sinopsis: string;
  genre: string;
  producers: string;
  duration: string;
  size: string;
  genres: string[];
}

export type SearchResponse = {
  success: boolean;
  query: string;
  totalResults: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  };
  data: SearchResult[];
};
export type GenreItem = {
  title: string;
  url: string;
  thumbnail: string;
  genres: string[];
  description: string;
};

export interface AnimeResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    currentPage: number;
    hasNextPage: boolean;
    nextPageUrl: string | null;
    totalPages: number;
  };
}

export interface Category2DAnimation {
  title: string;
  url: string;
  thumbnail: string;
  producers: string;
}
export interface CategoryHentai {
  title: string;
  url: string;
  thumbnail: string;
  synopsis: string;
  genres: string[];
  producers: string;
}
export interface Category3Dhentai {
  title: string;
  url: string;
  thumbnail: string;
  producers: string;
}

export interface ComingSoonItem {
  title: string;
  episode: string;
  url: string;
  thumbnail: string;
  producer: string;
  releaseDate: string;
}
