import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getStrapiMedia } from "@/lib/strapi";

const categoryLabels: Record<string, string> = {
  company_news: "公司新闻",
  industry_news: "行业资讯",
  product_news: "产品动态",
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  // 格式化日期，使其更精致（例如：2026年05月18日）
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : "";

  return (
    <main className="min-h-screen bg-neutral-50/50 pb-24 dark:bg-neutral-950">
      {/* PageHeader - 引入渐变与网格微纹理感 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 px-6 py-24 text-center md:py-32">
        {/* 背景微装饰：高端感往往来自不易察觉的细节 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute -bottom-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[800px]">
          {article.category && (
            <span className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium tracking-wider text-neutral-300 backdrop-blur-md">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {categoryLabels[article.category] ?? article.category}
            </span>
          )}

          <h1 className="text-balance text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.15]">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium tracking-widest text-neutral-400 uppercase">
            <span>{formattedDate}</span>
            {formattedDate && <span className="h-3 w-px bg-neutral-700" />}
            <span>Read Time</span>
          </div>
        </div>
      </section>

      {/* Cover image - 悬浮层叠感与精致阴影 */}
      {article.cover && (
        <div className="relative z-20 mx-auto -mt-16 max-w-[1000px] px-4 sm:px-6">
          <div className="group overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-700 hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] dark:border-neutral-800 dark:bg-neutral-900">
            <div className="overflow-hidden rounded-lg aspect-[16/9]">
              <img
                src={getStrapiMedia(article.cover.url) ?? ""}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <article className="mx-auto max-w-[800px] px-6 pt-16">
        {/* 使用 prose-base / prose-lg 提升长文阅读体验，增强排版高级感 */}
        <div
          className="prose prose-neutral prose-base max-w-none leading-relaxed dark:prose-invert
            prose-headings:font-normal prose-headings:tracking-tight
            prose-p:text-neutral-600 dark:prose-p:text-neutral-400
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:font-semibold prose-strong:text-neutral-900 dark:prose-strong:text-white
            prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Divider */}
        <div className="mt-20 border-t border-neutral-200/60 dark:border-neutral-800" />

        {/* Back button - 极简高质感按钮 */}
        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回新闻列表
          </Link>
        </div>
      </article>
    </main>
  );
}
