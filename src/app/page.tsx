import Link from "next/link";
import { getBrands, getFeaturedArticles, getStrapiMedia } from "@/lib/strapi";

export default async function Home() {
  // 并行获取数据，提升首屏响应速度
  const [brands, articles] = await Promise.all([
    getBrands(),
    getFeaturedArticles()
  ]);

  // 修复：动态解析本地或生产环境的 Hero 背景图
  const heroBgUrl = getStrapiMedia("/uploads/Gemini_Generated_Image_7d0dtp7d0dtp7d0d_5f75de57cf.png") || "";

  return (
    <>
      {/* ===== Hero 核心视觉区 ===== */}
      <section
        className="relative flex h-[95vh] min-h-[650px] items-center justify-center overflow-hidden bg-[#1E293B]"
        style={{
          backgroundImage: `url('${heroBgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        {/* 强化遮罩：左侧深暗向右侧渐变显现，完美保证任何背景图下文字的绝对可读性 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent z-0" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center md:items-start md:text-left text-center">
          <p className="mb-4 text-xs font-bold tracking-[0.6em] text-emerald-400 uppercase animate-fade-in">
            STEADY STREAM
          </p>

          <h1 className="text-4xl font-extralight leading-tight tracking-[0.25em] text-white sm:text-5xl md:text-6xl md:leading-[1.2]">
            连接纯粹
            <span className="font-normal opacity-95 text-2xl sm:text-3xl md:text-4xl block mt-4 tracking-[0.15em] text-gray-100">
              重塑酒水供应链
            </span>
          </h1>

          <p className="mt-6 text-sm md:text-base text-gray-300 max-w-md font-light leading-relaxed tracking-wide hidden sm:block">
            从全球原产地到中国消费端，以极效链路与透明溯源，缔造高品质酒水生态圈。
          </p>

          <div className="mt-10">
            <Link
              href="/about"
              className="group relative inline-flex items-center justify-center px-10 py-3.5 overflow-hidden text-xs font-medium tracking-[0.2em] text-gray-900 bg-white hover:text-white transition-colors duration-500 rounded-none shadow-xl"
            >
              {/* 按钮优雅横向扫过动画 */}
              <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out transform translate-x-[-100%] bg-gray-900 group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center">
                探索 STEADY STREAM
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* 底部优雅下滑视觉提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block opacity-40 animate-bounce">
          <div className="w-[1px] h-12 bg-white" />
        </div>
      </section>

      {/* ===== 品牌理念（三板斧） ===== */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-3">OUR CORE</span>
          <h2 className="section-title text-3xl md:text-4xl font-extralight tracking-[0.2em] text-gray-900">源自全球</h2>
          <div className="mt-5 h-[2px] w-8 bg-gray-900 mx-auto" />
        </div>

        {/* 优化：响应式分栏，在 md (平板) 下呈 2 列，lg 下呈 3 列，避免挤压 */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "🏔️", title: "纯粹基因", desc: "从产地到中国消费端，每一瓶都承载着原产地的纯净风土与严苛品质标准。" },
            { icon: "⚡", title: "极效链路", desc: "自建供应链体系，从产地到终端全程追踪，交付效率大幅提升。" },
            { icon: "🔗", title: "透明溯源", desc: "AI赋能的溯源系统，每一批次均可追溯至源头，让信任无需多言。" },
          ].map((card) => (
            <div key={card.title} className="group border border-gray-100 bg-white p-10 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] rounded-none flex flex-col justify-between">
              <div>
                <div className="mb-8 flex h-14 w-14 items-center justify-center bg-gray-50 text-2xl border border-gray-100 transition-all duration-500 group-hover:bg-gray-900 group-hover:text-white">
                  {card.icon}
                </div>
                <h3 className="mb-4 text-lg font-normal tracking-widest text-gray-800">{card.title}</h3>
                <p className="leading-relaxed text-gray-400 text-sm font-light">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 业务入口 ===== */}
      <section className="bg-neutral-50 py-28 md:py-36 border-y border-gray-100/70">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { href: "/supply-chain", title: "供应链业务", desc: "为合作伙伴提供端到端的酒水供应链解决方案，涵盖采购、清关、仓储、配送全链路。" },
              { href: "/products", title: "品牌产品", desc: "运营芬兰国宝级伏特加 Koskenkorva 等精品品牌，将北欧匠心带入中国市场。" },
            ].map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="group block bg-white p-10 md:p-16 border border-gray-200/50 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative overflow-hidden"
              >
                {/* 悬停时的微妙左侧高亮线条 */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-900 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <h3 className="mb-5 text-2xl font-light tracking-widest text-gray-900 transition-colors">
                  {entry.title}
                </h3>
                <p className="leading-relaxed text-gray-400 text-sm font-light h-12 overflow-hidden">
                  {entry.desc}
                </p>
                <div className="mt-12 inline-flex items-center text-xs tracking-[0.2em] font-medium border-b border-gray-900 pb-1 group-hover:text-gray-500 group-hover:border-gray-300 transition-colors">
                  了解更多 <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 合作品牌 ===== */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-3">PARTNERS</span>
          <h2 className="section-title text-3xl font-extralight tracking-[0.2em] text-gray-900">合作品牌</h2>
          <div className="mt-5 h-[2px] w-8 bg-gray-900 mx-auto" />
        </div>

        {/* 优化：对 Logo 进行了更规范的 Flex Grid 容器约束 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.length > 0
            ? brands.map((brand: any) => (
                <div key={brand.id} className="flex h-20 w-full max-w-[140px] items-center justify-center p-2 filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-transparent hover:border-gray-100">
                  {brand.logo ? (
                    <img
                      src={getStrapiMedia(brand.logo.url) ?? ''}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs tracking-widest text-gray-400 font-light">{brand.name}</span>
                  )}
                </div>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 w-32 bg-gray-100 rounded-none animate-pulse" />
              ))}
        </div>
      </section>

      {/* ===== 最新动态 ===== */}
      <section className="bg-white py-28 md:py-36 border-t border-gray-100">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="text-center mb-24">
            <span className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-3">INSIGHTS</span>
            <h2 className="section-title text-3xl font-extralight tracking-[0.2em] text-gray-900">最新动态</h2>
            <div className="mt-5 h-[2px] w-8 bg-gray-900 mx-auto" />
          </div>

          {/* 优化：响应式网格断点避免平板端卡片变形 */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0
              ? articles.map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group flex flex-col bg-white transition-all duration-500 border border-transparent hover:border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-4 -m-4"
                  >
                    <div className="mb-6 aspect-[16/10] w-full overflow-hidden bg-neutral-50 relative">
                      {article.cover ? (
                        <img
                          src={getStrapiMedia(article.cover.url) ?? ''}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-300 text-xs tracking-widest">NO IMAGE</div>
                      )}
                    </div>
                    <span className="mb-3 text-xs tracking-widest text-gray-400 font-medium">
                      {article.publishedAt}
                    </span>
                    <h3 className="mb-3 text-lg font-normal leading-snug tracking-wide text-gray-800 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400 font-light line-clamp-2">
                      {article.summary}
                    </p>
                  </Link>
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col space-y-4 animate-pulse">
                    <div className="aspect-[16/10] bg-gray-100 w-full" />
                    <div className="h-3 bg-gray-100 w-1/4" />
                    <div className="h-5 bg-gray-100 w-3/4" />
                    <div className="h-4 bg-gray-100 w-full" />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 落地转化 ===== */}
      <section className="bg-[#0F172A] px-6 py-32 text-center relative overflow-hidden">
        {/* 背景光晕精细化：调暗透明度，形成高级微光感 */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="section-title text-3xl font-extralight tracking-[0.25em] text-white mb-6">
            开启合作
          </h2>
          <div className="mb-10 h-[1px] w-12 bg-white/20 mx-auto" />
          <p className="mx-auto mb-12 text-gray-400 text-sm font-light leading-loose tracking-widest">
            无论您是进口商、餐饮集团还是精品零售渠道，
            <br />
            我们都期待与您携手将北欧品质带给更多消费者。
          </p>
          <Link
            href="/contact"
            className="px-12 py-4 border border-white/20 text-white hover:bg-white hover:text-gray-950 transition-all duration-300 tracking-[0.25em] text-xs inline-block rounded-none backdrop-blur-sm"
          >
            联系我们
          </Link>
        </div>
      </section>
    </>
  );
}
