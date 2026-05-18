import Link from "next/link";
import { getCompanyProducts, getStrapiMedia } from "@/lib/strapi";

const categoryLabels: Record<string, string> = {
  spirit: "烈酒",
  beer: "啤酒",
  fruit_wine: "果酒",
  other: "潮饮",
};

export default async function ProductsPage() {
  const products = await getCompanyProducts();

  return (
    <>
      {/* PageHeader */}
      <section className="bg-primary-dark px-6 py-24 text-center">
        <h1 className="section-title section-title-light text-4xl text-white font-medium tracking-wide">
          Koskenkorva
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 tracking-wide">
          源自芬兰的纯净伏特加，传承北纬 62° 的酿造匠心
        </p>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        {products.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-primary-dark/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* 1. 图片容器保持固定比例，增加轻微的悬浮放大过渡 */}
                {product.image ? (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
                    <img
                      src={getStrapiMedia(product.image.url) ?? ""}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-primary-dark/5 to-accent-blue/5" />
                )}

                {/* 卡片内容区域 */}
                <div className="flex flex-1 flex-col p-6">
                  {/* 2. 调整分类标签置于标题上方，规避横向拥挤，阅读更符合逻辑 */}
                  {product.category && (
                    <div className="mb-2">
                      <span className="inline-block rounded-sm bg-primary-dark/5 px-2 py-0.5 text-[11px] font-medium tracking-wider text-primary-dark/80">
                        {categoryLabels[product.category] ?? product.category}
                      </span>
                    </div>
                  )}

                  {/* 3. 标题强化：字号微调，并固定高度(两行)或确保后续区域对齐 */}
                  <h3 className="mb-4 text-base font-medium tracking-wide text-gray-800 line-clamp-2 min-h-[3rem] leading-snug">
                    {product.name}
                  </h3>

                  {/* 4. 规格参数：改用更精致的虚线边框或微小间距分隔，提高可读性 */}
                  <div className="mb-4 space-y-1.5 border-t border-dashed border-gray-100 pt-3 text-xs text-gray-500">
                    {product.barcode && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">条码</span>
                        <span className="font-mono tracking-light">{product.barcode}</span>
                      </div>
                    )}
                    {product.volume && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">容量</span>
                        <span>{product.volume} ml</span>
                      </div>
                    )}
                    {product.box_spec && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">箱规</span>
                        <span>{product.box_spec}</span>
                      </div>
                    )}
                  </div>

                  {/* 5. 描述信息：顶部增加上边框，利用 mt-auto 永远沉底对齐 */}
                  {product.description && (
                    <div className="mt-auto border-t border-gray-50 pt-3">
                      <p className="text-xs leading-relaxed text-gray-400 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-sm tracking-wide text-gray-400">暂无产品数据</p>
          </div>
        )}
      </section>
    </>
  );
}
