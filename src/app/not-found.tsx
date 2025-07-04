import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">
        Maaf, halaman yang kamu cari tidak ditemukan.
      </p>
      <p className="text-muted-foreground mb-6">
        Mungkin URL salah atau halaman sudah tidak tersedia.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Kembali ke Home
      </Link>
    </div>
  );
}
