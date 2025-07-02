import AnimeHentai from "@/components/CardHentai";
import { AnimeResponse, AnimeResponseData } from "@/types";


export default async function Home() {
  const res = await fetch("http://localhost:3000/api/home", {
    next: { revalidate: 3600 },
  });
  const data: AnimeResponse<AnimeResponseData> = await res.json();
  return (
    <AnimeHentai
      hentaiTerbaru={data.data.hentaiTerbaru}
      episodeTerbaru={data.data.episodeTerbaru}
    />
  );
}
