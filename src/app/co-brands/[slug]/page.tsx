import Link from "next/link";
import { notFound } from "next/navigation";
import { getCoBrand, getStrapiMedia } from "@/lib/strapi";
import { ArrowLeft } from "lucide-react";

export default async function CoBrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getCoBrand(slug);

  if (!brand) notFound();

  const skus = brand.skus ?? [];

  return (
    <>
      {/* Back link */}
      <div className="mx-auto max-w-[1100px] px-6 pt-20">
        <Link
          href="/co-brands"
          className="inline-flex items-center gap-1 text-xs tracking-wider text-gray-400 transition-colors hover:text-primary-dark"
        >
          <ArrowLeft className="h-3 w-3" />
          返回合作品牌
        </Link>
      </div>

      {/* Brand header — logo + name side by side with cover as background */}
      <section className="relative mx-auto mt-6 max-w-[1100px] overflow-hidden rounded-sm px-6">
        <div
          className={`relative flex items-end gap-6 rounded-sm ${
            brand.cover_image
              ? "min-h-[240px] md:min-h-[300px]"
              : "min-h-[160px]"
          } bg-gradient-to-br from-primary-dark to-accent-blue p-8 md:items-center`}
        >
          {brand.cover_image && (
            <img
              src={getStrapiMedia(brand.cover_image.url) ?? ""}
              alt={brand.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center">
            {brand.logo && (
              <img
                src={getStrapiMedia(brand.logo.url) ?? ""}
                alt={brand.name}
                className="h-14 w-auto md:h-20"
              />
            )}
            <div>
              <h1 className="text-2xl font-light tracking-wider text-white md:text-3xl">
                {brand.name}
              </h1>
              {brand.origin && (
                <p className="mt-1 text-sm tracking-wider text-white/60">
                  {brand.origin}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brand description */}
      {brand.description && (
        <section className="mx-auto max-w-[1100px] px-6 py-12">
          <div
            className="mx-auto leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: brand.description }}
          />
        </section>
      )}

      {/* SKU list */}
      {skus.length > 0 && (
        <section className="border-t border-primary-dark/10 bg-bg-light py-12">
          <div className="mx-auto max-w-[1100px] px-6">
            <h2 className="section-title mb-8 text-xl">产品规格</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skus.map((sku: any) => (
                <div
                  key={sku.id}
                  className="flex flex-col overflow-hidden rounded-sm border border-primary-dark/10 bg-white"
                >
                  {sku.images && sku.images.length > 0 && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={getStrapiMedia(sku.images[0].url) ?? ""}
                        alt={sku.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-3 text-sm font-normal tracking-wide">
                      {sku.name}
                    </h3>
                    <div className="space-y-1.5 text-xs text-gray-500">
                      {sku.barcode && (
                        <p>
                          <span className="text-gray-400">国际条码 </span>
                          <span>{sku.barcode}</span>
                        </p>
                      )}
                      {sku.volume && (
                        <p>
                          <span className="text-gray-400">容量 </span>
                          <span>{sku.volume} ml</span>
                        </p>
                      )}
                      {sku.weight && (
                        <p>
                          <span className="text-gray-400">重量 </span>
                          <span>
                            {sku.weight >= 1000
                              ? `${(sku.weight / 1000).toFixed(1)} kg`
                              : `${sku.weight} g`}
                          </span>
                        </p>
                      )}
                      {sku.length && sku.width && sku.height && (
                        <p>
                          <span className="text-gray-400">尺寸 </span>
                          <span>
                            {sku.length}×{sku.width}×{sku.height} cm
                          </span>
                        </p>
                      )}
                      {sku.box_spec && (
                        <p>
                          <span className="text-gray-400">箱规 </span>
                          <span>{sku.box_spec}</span>
                        </p>
                      )}
                    </div>
                    {sku.description && (
                      <p className="mt-3 text-sm leading-relaxed text-gray-500">
                        {sku.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
