import Link from "next/link";
import { notFound } from "next/navigation";
import { getCase, getStrapiMedia } from "@/lib/strapi";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const item = await getCase(documentId);

  if (!item) notFound();

  return (
    <main className="min-h-screen bg-neutral-50/50 pb-24">
      {/* PageHeader */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark to-[#1a2b3c] px-6 py-24 text-center md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-3xl">
          {item.client_name && (
            <span className="mb-4 inline-block text-xs font-medium tracking-widest text-white/50 uppercase">
              {item.client_name}
            </span>
          )}
          <h1 className="text-balance text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Cover */}
      {item.cover && (
        <div className="relative z-20 mx-auto -mt-16 max-w-4xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-2 shadow-lg">
            <div className="overflow-hidden rounded-lg aspect-[16/9]">
              <img
                src={getStrapiMedia(item.cover.url) ?? ""}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 pt-16">
        {item.description && (
          <p className="mb-10 text-lg leading-relaxed text-gray-600">
            {item.description}
          </p>
        )}
        {item.content && (
          <div
            className="prose prose-neutral prose-base max-w-none leading-relaxed
              prose-headings:font-normal prose-headings:tracking-tight
              prose-p:text-gray-600
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )}

        <div className="mt-20 border-t border-neutral-200/60" />

        <div className="mt-12 text-center">
          <Link
            href="/supply-chain#cases"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回案例列表
          </Link>
        </div>
      </article>
    </main>
  );
}
