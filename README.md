# 🐶 Dogepoi — Hentai Streaming Search UI

Link: https://dogepoi.netlify.app

Dogepoi adalah aplikasi pencarian konten video hentai streaming dari situs [nekopoi.care](https://nekopoi.care), dibuat menggunakan **Next.js**, **Hono**, dan **Cheerio** untuk scraping data secara dinamis. UI dibuat ringan dan responsif menggunakan **Tailwind CSS** dan **ShadCN UI**.

> ⚠️ **Disclaimer**: Aplikasi ini hanya untuk tujuan pembelajaran. Semua konten milik situs asli. Harap gunakan dengan bijak.

---

## ✨ Fitur

- 🔍 **Pencarian real-time** dengan debounce (minimalkan permintaan API)
- 📦 **Pagination** untuk hasil pencarian
- 🎥 Detail video lengkap: judul, genre, artist, producer, dll.
- ⚙️ Server API ringan dengan Hono + Cheerio untuk scraping
- 📱 Responsif & cepat dengan Next.js App Router dan SWR

---

## 🔧 Tech Stack

### 🧠 Frontend
| Library | Fungsi |
|--------|--------|
| [`next@15`](https://nextjs.org/) | Framework utama React |
| [`react@19`](https://reactjs.org/) | UI Library |
| [`tailwindcss`](https://tailwindcss.com/) | Styling utility-first |
| [`shadcn/ui`](https://ui.shadcn.com/) | Komponen UI modular |
| [`react-select`](https://react-select.com/) | Dropdown searchable |
| [`lucide-react`](https://lucide.dev/) | Ikon SVG |
| [`swr`](https://swr.vercel.app/) | Data fetching & caching |
| [`lodash.debounce`](https://lodash.com/docs/4.17.15#debounce) | Debounce input search |
| [`clsx`, `tailwind-merge`, `class-variance-authority`] | Manajemen kelas Tailwind dinamis |

### ⚙️ Backend (API)
| Library | Fungsi |
|--------|--------|
| [`hono`](https://hono.dev/) | Server API ringan berbasis Web Standard |
| [`@hono/node-server`](https://hono.dev/getting-started/nodejs) | Integrasi Hono di lingkungan Node |
| [`cheerio`](https://cheerio.js.org/) | Scraping konten HTML dari situs eksternal |
| [`axios`](https://axios-http.com/) | HTTP client untuk scraping |

---

## 🛠️ Cara Menjalankan Lokal

###  Clone Repo
```bash
git clone https://github.com/username/dogepoi.git
cd dogepoi

pnpm install atau npm install

pnpm build atau npm build

pnpm start atau npm start

