"use client";

import { useState, FormEvent, ChangeEvent } from "react";

// 联系信息数据抽离
const CONTACT_INFO = [
  { label: "电话", value: "+86 23 62 519 168" },
  { label: "邮箱", value: "contact@steadystream.cn" },
  { label: "地址", value: "中国重庆市南岸区南滨路22号长江国际B幢2304" },
];

// 表单初始状态
const INITIAL_FORM_STATE = {
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // 统一处理输入框变化，减少冗余代码
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("http://localhost:1337/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });

      if (!res.ok) throw new Error("提交失败，请稍后重试");

      setDone(true);
      setForm(INITIAL_FORM_STATE); // 提交成功后重置表单
    } catch (err: any) {
      setError(err.message || "网络错误，请稍后再试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased">
      {/* 头部横幅 (PageHeader) */}
      <section className="bg-primary-dark px-6 py-28 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            联系我们
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            期待与您携手将品质生活方式带给更多消费者
          </p>
        </div>
      </section>

      {/* 主体内容区 */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-16 md:grid-cols-5 lg:gap-24">

          {/* 左侧：联系方式 */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold tracking-wide text-gray-900">
              联系方式
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              如有任何疑问或合作意向，欢迎通过以下方式与我们取得联系。
            </p>

            <div className="mt-10 space-y-8">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="group border-l-2 border-gray-200 pl-4 transition-colors duration-300 hover:border-primary-dark">
                  <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">
                    {item.label}
                  </span>
                  <p className="mt-1.5 text-base font-medium text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：表单 / 成功提示 */}
          <div className="md:col-span-3">
            {done ? (
              /* 成功状态 */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-xl shadow-gray-100/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-500">
                  ✓
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  提交成功
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  感谢您的留言，我们将在 24 小时内与您联系。
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="mt-8 text-sm font-medium text-primary-dark underline underline-offset-4 hover:text-opacity-80"
                >
                  再次留言
                </button>
              </div>
            ) : (
              /* 表单状态 */
              <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/40 sm:p-10">

                {/* 姓名 & 公司 */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-600">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none shadow-sm transition-all placeholder:text-gray-400 focus:border-primary-dark focus:bg-white focus:ring-2 focus:ring-primary-dark/10"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-600">
                      公司
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none shadow-sm transition-all placeholder:text-gray-400 focus:border-primary-dark focus:bg-white focus:ring-2 focus:ring-primary-dark/10"
                      placeholder="公司名称"
                    />
                  </div>
                </div>

                {/* 电话 & 邮箱 */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-600">
                      电话
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none shadow-sm transition-all placeholder:text-gray-400 focus:border-primary-dark focus:bg-white focus:ring-2 focus:ring-primary-dark/10"
                      placeholder="您的电话"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-600">
                      邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none shadow-sm transition-all placeholder:text-gray-400 focus:border-primary-dark focus:bg-white focus:ring-2 focus:ring-primary-dark/10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* 留言 */}
                <div>
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-600">
                    留言内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none shadow-sm transition-all placeholder:text-gray-400 focus:border-primary-dark focus:bg-white focus:ring-2 focus:ring-primary-dark/10"
                    placeholder="请描述您的需求或合作意向..."
                  />
                </div>

                {/* 错误信息提示 */}
                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    ⚠️ {error}
                  </div>
                )}

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-primary-dark py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
                >
                  {submitting ? "正在提交..." : "发送留言"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
