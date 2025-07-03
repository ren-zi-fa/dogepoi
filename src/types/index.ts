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

export interface DetailResponse {
  success: boolean;
  data: AnimeDetail;
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

export interface AnimeResponse<T> {
  success: boolean;
  data: T;
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
}
export type WatchAnimeResponse<T> = {
  success: boolean;
  data: T;
};

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
