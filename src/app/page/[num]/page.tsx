import AnimeHentai from "@/components/CardHentai";
import { AnimeResponse, AnimeResponseData } from "@/types";

const server_url = process.env.NEXT_PUBLIC_URL;
export default async function AnimePage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;

  const resHome = await fetch(`${server_url}/api/home`, {
    next: { revalidate: 3600 },
  });
  const hentai: AnimeResponse<AnimeResponseData> = await resHome.json();

  const resPage = await fetch(`${process.env.MY_URL}/api/page/${num}`);
  if (!resPage.ok) {
    return <div>Gagal memuat data</div>;
  }

  const pageJson = await resPage.json();
  const episodeTerbaru = pageJson?.data?.episodeTerbaru ?? [];

  return (
    <div className="mt-10">
      <AnimeHentai
        hentaiTerbaru={hentai.data.hentaiTerbaru}
        episodeTerbaru={episodeTerbaru}
      />
    </div>
  );
}
