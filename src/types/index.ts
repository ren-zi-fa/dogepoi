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
