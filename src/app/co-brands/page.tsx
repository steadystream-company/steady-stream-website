import Link from "next/link";
import { getCoBrands, getStrapiMedia } from "@/lib/strapi";

export default async function CoBrandsPage() {
  const brands = await getCoBrands();

  return (
    <>
      {/* PageHeader */}
      <section className="bg-primary-dark px-6 py-24 text-center">
        <h1 className="section-title section-title-light text-4xl text-white">
          合作品牌
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          与全球优质酒水品牌建立深度合作，共同开拓中国市场
        </p>
      </section>

      {/* Logo Wall */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        {brands.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {brands
              .filter((brand: any) => brand.slug)
              .map((brand: any) => (
                <Link
                  key={brand.id}
                  href={`/co-brands/${brand.slug}`}
                  className="group flex h-28 w-28 flex-col items-center justify-center gap-3 transition-all duration-400 hover:-translate-y-1 md:h-32 md:w-32"
                >
                  {brand.logo ? (
                    <div className="flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
                      <img
                        src={getStrapiMedia(brand.logo.url) ?? ""}
                        alt={brand.name}
                        className="h-full w-full object-contain transition-transform duration-400 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-xs tracking-wider text-gray-400">
                      {brand.name}
                    </div>
                  )}
                  <span className="text-center text-xs tracking-wider text-gray-500 transition-colors duration-400 group-hover:text-primary-dark">
                    {brand.name}
                  </span>
                </Link>
              ))}
            {brands.filter((b: any) => !b.slug).length > 0 && (
              <p className="w-full text-center text-xs text-gray-300">
                部分品牌暂未开放详情页
              </p>
            )}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">正在接入合作品牌…</p>
          </div>
        )}
      </section>
    </>
  );
}
