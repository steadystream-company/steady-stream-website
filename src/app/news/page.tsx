import Link from "next/link";
import { getArticles, getStrapiMedia } from "@/lib/strapi";

const categoryLabels: Record<string, string> = {
  company_news: "公司新闻",
  industry_news: "行业资讯",
  product_news: "产品动态",
};

// 辅助函数：让日期显示更友好（例如：2026-05-18）
function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* PageHeader - 引入渐变与更优雅的字间距 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark to-[#1a2b3c] px-6 py-28 text-center">
        {/* 背景装饰微光，增加层次感 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-wider text-white md:text-5xl">
            新闻动态
          </h1>
          <div className="mt-4 h-1 w-12 bg-white/40 mx-auto rounded-full" /> {/* 精致的分隔线 */}
          <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-white/70 font-light tracking-wide">
            了解 Steady Stream 的最新资讯、技术干货与行业洞察
          </p>
        </div>
      </section>

      {/* Article list */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        {articles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: any) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              >
                {/* 图片区域：优化比例与骨架屏感 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  {article.cover ? (
                    <img
                      src={getStrapiMedia(article.cover.url) ?? ""}
                      alt={article.title}
                      className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-95"
                      loading="lazy"
                    />
                  ) : (
                    // 无图时的优雅占位图：带一点极简的几何感或文字
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-300 font-light text-xs tracking-widest">
                      STEADY STREAM
                    </div>
                  )}
                </div>

                {/* 文字内容区域 */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  {/* 元数据：分类与时间 */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    {article.category && (
                      <span className="inline-flex items-center rounded-md bg-primary-dark/[0.06] px-2.5 py-1 text-xs font-medium tracking-wide text-primary-dark">
                        {categoryLabels[article.category] ?? article.category}
                      </span>
                    )}
                    <span className="text-xs tracking-wide text-gray-400">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  {/* 标题：加深颜色，优化行高 */}
                  <h3 className="mb-3 text-lg font-medium leading-snug tracking-wide text-gray-900 transition-colors duration-300 group-hover:text-primary-dark line-clamp-2">
                    {article.title}
                  </h3>

                  {/* 摘要：行高加疏，颜色放轻，保持呼吸感 */}
                  <p className="mt-2 text-sm leading-relaxed text-gray-400 font-light line-clamp-3">
                    {article.summary}
                  </p>

                  {/* 底部阅读更多指引（隐藏，hover时显现或图标微动，增加互动感） */}
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs font-medium text-primary-dark opacity-0 transform translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    阅读全文
                    <svg className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* 空状态：更精致的排版 */
          <div className="py-24 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300 font-light mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-sm tracking-wide text-gray-400">暂无相关文章</p>
          </div>
        )}
      </section>
    </div>
  );
}
