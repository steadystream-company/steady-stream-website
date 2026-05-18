import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompanyProduct, getStrapiMedia } from "@/lib/strapi";
import { ArrowLeft } from "lucide-react";

const categoryLabels: Record<string, string> = {
  spirit: "烈酒",
  beer: "啤酒",
  fruit_wine: "果酒",
  other: "潮饮",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getCompanyProduct(slug);

  if (!product) notFound();

  const images = product.detail_images ?? [];

  return (
    <div className="min-h-screen bg-bg-light pb-24">
      {/* 顶部留白与返回按钮 */}
      <div className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24 pb-8">
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-xs tracking-widest text-gray-400 transition-all hover:text-primary-dark"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          返回产品列表
        </Link>
      </div>

      {/* 核心产品区块：左右分栏，极致留白 */}
      <section className="mx-auto max-w-[1200px] px-6 mb-24">
        <div className="flex flex-col md:flex-row md:items-stretch gap-12 lg:gap-24">

          {/* 左侧：产品主图（带高级画框感） */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-white border border-primary-dark/5 p-12 lg:p-20 rounded-sm">
            {product.image ? (
              <img
                src={getStrapiMedia(product.image.url) ?? ""}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="aspect-[3/4] w-full rounded-sm bg-gradient-to-br from-primary-dark/5 to-accent-blue/5" />
            )}
          </div>

          {/* 右侧：产品信息 */}
          <div className="w-full md:w-1/2 flex flex-col justify-center py-6 md:py-12">
            {/* 分类标签：改为精致的线框样式 */}
            {product.category && (
              <span className="mb-6 inline-block w-fit rounded-sm border border-primary-dark/20 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-primary-dark">
                {categoryLabels[product.category] ?? product.category}
              </span>
            )}

            {/* 产品名称：放大字号，增加字距和轻盈感 */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-primary-dark leading-tight mb-8">
              {product.name}
            </h1>

            {/* 产品描述：增加行高，呼吸感拉满 */}
            {product.description && (
              <div className="leading-loose text-gray-500 font-light text-sm md:text-base">
                {product.description}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 规格区块：极简水平分割线设计 (包豪斯列表) */}
      <section className="mx-auto max-w-[1200px] px-6 mb-24">
        <h2 className="mb-10 text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
          Product Specifications / 产品规格
        </h2>

        <dl className="divide-y divide-primary-dark/10 border-t border-primary-dark/10">
          {[
            { label: "国际条码", value: product.barcode, unit: "" },
            { label: "容量", value: product.volume, unit: "ml" },
            {
              label: "重量",
              value: product.weight ? (product.weight >= 1000 ? (product.weight / 1000).toFixed(1) : product.weight) : null,
              unit: product.weight ? (product.weight >= 1000 ? "kg" : "g") : ""
            },
            {
              label: "尺寸 (L×W×H)",
              value: (product.length && product.width && product.height) ? `${product.length} × ${product.width} × ${product.height}` : null,
              unit: "cm"
            },
            { label: "箱规", value: product.box_spec, unit: "瓶/箱" },
          ].map((spec, index) => (
            spec.value && (
              <div key={index} className="flex items-center justify-between py-5">
                <dt className="text-xs tracking-wider text-gray-400">{spec.label}</dt>
                <dd className="text-sm tracking-wide text-primary-dark font-medium">
                  {spec.value} <span className="text-gray-400 font-light text-xs ml-1">{spec.unit}</span>
                </dd>
              </div>
            )
          ))}
        </dl>
      </section>

      {/* 详情图区块：大尺寸沉浸式展示 */}
      {images.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6">
          <h2 className="mb-10 text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
            Details / 视觉详情
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {images.map((img: any, i: number) => (
              <div key={i} className="group overflow-hidden rounded-sm bg-white border border-primary-dark/5">
                <img
                  src={getStrapiMedia(img.url) ?? ""}
                  alt={`${product.name} 详情 ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
