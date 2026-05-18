const API_URL = process.env.STRAPI_URL || "http://localhost:1337";
const MEDIA_URL = process.env.STRAPI_PUBLIC_URL || API_URL;

export async function fetchAPI(path: string) {
  const res = await fetch(`${API_URL}/api${path}`, { next: { revalidate: 5 } });
  const data = await res.json();
  return data;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${MEDIA_URL}${url}`;
}

/* ── Articles ── */
export async function getArticles() {
  const data = await fetchAPI("/articles?populate=cover&sort=publishedAt:desc");
  return data.data || [];
}

export async function getArticle(slug: string) {
  const data = await fetchAPI(
    "/articles?populate=cover"
  );
  return data.data?.find((a: any) => a.slug === slug) || null;
}

export async function getFeaturedArticles() {
  const data = await fetchAPI(
    "/articles?populate=cover&sort=publishedAt:desc&pagination[pageSize]=3"
  );
  return (data.data || []).filter((a: any) => a.featured === true);
}

/* ── Co-brands ── */
export async function getCoBrands() {
  const data = await fetchAPI("/brands?populate=logo&populate=cover_image");
  return data.data || [];
}

export async function getCoBrand(slug: string) {
  const data = await fetchAPI(
    "/brands?populate=logo&populate=cover_image&populate=skus.images"
  );
  return data.data?.find((b: any) => b.slug === slug) || null;
}

/* ── Company products (Koskenkorva) ── */
export async function getCompanyProducts() {
  const data = await fetchAPI("/products?populate=image&populate=detail_images");
  return data.data || [];
}

export async function getCompanyProduct(slug: string) {
  const data = await fetchAPI(
    "/products?populate=image&populate=detail_images"
  );
  return data.data?.find((p: any) => p.slug === slug) || null;
}

/* ── Cases ── */
export async function getCases() {
  const data = await fetchAPI("/cases?populate=cover");
  return data.data || [];
}

export async function getCase(documentId: string) {
  const res = await fetch(`${API_URL}/api/cases/${encodeURIComponent(documentId)}?populate=cover`, {
    next: { revalidate: 5 },
  });
  const data = await res.json();
  return data.data || null;
}

/* ── Customers (下游合作客户) ── */
export async function getCustomers() {
  const data = await fetchAPI("/customers?sort=sort_order:asc");
  return data.data || [];
}

/* ── Legacy (kept for backward compat) ── */
export async function getBrands() {
  return getCoBrands();
}

export async function getBrand(slug: string) {
  return getCoBrand(slug);
}

export async function getProducts() {
  return getCompanyProducts();
}
