export default async function AnimePage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Detail Anime</h1>
      <p className="text-xl">
        Parameter dari URL:{" "}
        <span className="font-mono text-blue-600">{num}</span>
      </p>

      {/* Kamu bisa fetch data berdasarkan 'name' di sini */}
      {/* Contoh: await fetch(`https://api.com/anime/${name}`) */}
    </main>
  );
}
