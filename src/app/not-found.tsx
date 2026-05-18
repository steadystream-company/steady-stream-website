import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 text-7xl font-light text-gray-200">404</span>
      <h1 className="mb-4 text-2xl font-light tracking-wider">页面未找到</h1>
      <p className="mb-10 text-sm leading-relaxed text-gray-500">
        您访问的页面不存在，可能已被移除或链接有误。
      </p>
      <Link href="/" className="btn-elegant">
        返回首页
      </Link>
    </section>
  );
}
