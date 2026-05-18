import Link from "next/link";

const contactInfo = [
  { label: "电话", value: "+86 23 62 519 168" },
  { label: "邮箱", value: "contact@steadystream.cn" },
  { label: "地址", value: "中国重庆市南岸区南滨路22号长江国际B幢2304" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 px-6 py-12 md:flex-row md:justify-between md:py-16">
        {/* Left: brand */}
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-[0.3em] text-white/90 flex items-center"
          >
            <img src="/logo.png?v=2" alt="Steady Stream" className="h-8 w-auto" />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Steadystream 是一家专注于酒水供应链管理的专业公司
          </p>
          <p className="mt-1 text-sm text-white/40">
            &copy; {new Date().getFullYear()} Steady Stream. All rights
            reserved.
          </p>
        </div>

        {/* Right: contact */}
        <div className="space-y-2">
          {contactInfo.map((item) => (
            <p key={item.label} className="text-sm text-white/60">
              <span className="inline-block w-10 text-white/40">
                {item.label}
              </span>
              {item.value}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
