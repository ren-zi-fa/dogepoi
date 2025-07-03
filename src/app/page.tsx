

import AnimeHentai from "@/components/CardHentai";
import { AnimeResponse, AnimeResponseData } from "@/types";
const server_url = process.env.NEXT_PUBLIC_URL;
export default async function Home() {
  const res = await fetch(`${server_url}/api/home`, {
    next: { revalidate: 3600 },
  });
  const data: AnimeResponse<AnimeResponseData> = await res.json();
  return (
    <div className="mt-10">
      <AnimeHentai
        hentaiTerbaru={data.data.hentaiTerbaru}
        episodeTerbaru={data.data.episodeTerbaru}
      />
    </div>
  );
}
