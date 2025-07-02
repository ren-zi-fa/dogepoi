import { HentaiDetailCard } from "@/components/DetailCard";
export default async function AnimeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const res = await fetch(`${process.env.MY_URL}/api/detail/${slug}`);

  if (!res.ok) return <div>Gagal memuat data</div>;

  const json = await res.json();
  const data = json.data;

  return (
    <div className="p-6">
      <HentaiDetailCard data={data} />
    </div>
  );
}
