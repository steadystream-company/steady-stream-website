import Link from "next/link";
import { getBrands, getCases, getStrapiMedia } from "@/lib/strapi";

const steps = [
  {
    icon: "🔍",
    title: "选品采购",
    desc: "甄选优质酒水品牌，建立从酒庄到消费者全链路采购体系。",
  },
  {
    icon: "📦",
    title: "仓储配送",
    desc: "全生态仓储网络，覆盖中国绝大部分城市，实现从入境到终端的全程追踪。",
  },
  {
    icon: "📡",
    title: "渠道分销",
    desc: "线上线下全渠道覆盖，携手优质零售与电商平台，高效触达终端。",
  },
  {
    icon: "📈",
    title: "营销支持",
    desc: "品牌本土化运营、品鉴会策划、数字化营销工具，助力合作伙伴快速打开市场。",
  },
] as const;

export default async function SupplyChainPage() {
  const brands = await getBrands();
  const cases = await getCases();

  return (
    <div className="bg-neutral-50 text-gray-800 antialiased">
      {/* PageHeader - 增加渐变与微弱网格质感（可选，这里用渐变提气） */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark to-[#1a2433] px-6 py-28 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <h1 className="text-4xl font-light tracking-wider text-white md:text-5xl">
            供应链业务
          </h1>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-white/30" /> {/* 装饰线条 */}
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-white/70">
            从产地到中国消费端，端到端的酒水供应链管理服务
          </p>
        </div>
      </section>

      {/* 业务概述 - 提升排版呼吸感与文字易读性 */}
      <section className="mx-auto max-w-[1100px] px-6 py-24 text-center">
        <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-primary-dark/60 uppercase">Overview</h2>
        <h3 className="mb-8 text-2xl font-normal tracking-wide md:text-3xl text-gray-900">业务概述</h3>
        <p className="mx-auto max-w-3xl text-base leading-loose tracking-wide text-gray-600 md:text-lg">
          Steady Stream
          拥有深耕酒水行业多年的采购团队与完善的供应链基础设施。我们与国内外多个头部酒厂建立直采合作，覆盖烈酒、啤酒、果酒以及潮流饮品等全品类。结合自主研发的供应链管理系统，为合作伙伴提供采购、清关、仓储、配送、营销的一站式解决方案。
        </p>
      </section>

      {/* 服务模块 - 增强卡片悬浮动效，打磨数字标识 */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary-dark/60 uppercase">Services</h2>
            <h3 className="text-2xl font-normal tracking-wide md:text-3xl text-gray-900">服务模块</h3>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group relative rounded-xl border border-gray-100 bg-neutral-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-white hover:shadow-xl"
              >
                {/* 悬浮时的顶部亮色装饰条 */}
                <div className="absolute top-0 left-0 h-[3px] w-0 bg-primary-dark transition-all duration-300 group-hover:w-full rounded-t-xl" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
                <span className="mb-2 block text-xs font-mono font-bold tracking-widest text-primary-dark/40">
                  0{i + 1}
                </span>
                <h4 className="mb-3 text-lg font-medium text-gray-900">
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作品牌 - 规范网格，加入灰色滤镜互动的现代感 */}
      <section className="mx-auto max-w-[1100px] px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary-dark/60 uppercase">Brands</h2>
          <h3 className="text-2xl font-normal tracking-wide md:text-3xl text-gray-900">合作品牌</h3>
        </div>

        {brands.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {brands.map((brand: any) => (
              <div
                key={brand.id}
                className="flex h-24 items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200"
              >
                {brand.logo ? (
                  <img
                    src={getStrapiMedia(brand.logo.url) ?? ""}
                    alt={brand.name}
                    className="h-full w-full object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <div className="text-center text-xs font-medium tracking-wide text-gray-400">
                    {brand.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-400">暂无品牌数据</p>
        )}
      </section>

      {/* 合作案例 - 规范长宽比，加入优雅的图片放大动效 */}
      <section id="cases" className="bg-white py-24 border-t border-gray-100">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary-dark/60 uppercase">Case Studies</h2>
            <h3 className="text-2xl font-normal tracking-wide md:text-3xl text-gray-900">合作案例</h3>
          </div>

          {cases.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {cases.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/cases/${item.documentId}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-neutral-50 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-white"
                >
                  {/* 图片容器添加 hover 放大效果 */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    {item.cover ? (
                      <img
                        src={getStrapiMedia(item.cover.url) ?? ""}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* 文字内容区包裹 */}
                  <div className="flex flex-1 flex-col p-6">
                    {item.client_name && (
                      <span className="mb-2 text-xs font-medium tracking-wider text-primary-dark/60">
                        {item.client_name}
                      </span>
                    )}
                    <h4 className="mb-3 text-base font-medium leading-snug text-gray-900 group-hover:text-primary-dark transition-colors">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="mt-auto text-sm leading-relaxed text-gray-500 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400">暂无案例数据</p>
          )}
        </div>
      </section>
    </div>
  );
}
