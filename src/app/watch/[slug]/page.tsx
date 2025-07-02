import WatchAnime from "@/components/WatchingHentai";
import { WatchAnimeResponse, WatchinAnime } from "@/types";

export default async function AnimePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`${process.env.MY_URL}/api/watch/${slug}`);
  if (!res.ok) return <div>Gagal memuat data</div>;

  const json = await res.json();
  const data = json.data as WatchinAnime;

  return (
    <div className="">
      <WatchAnime {...data} />
    </div>
  );
}
