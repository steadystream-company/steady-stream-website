import { getCustomers } from "@/lib/strapi";

// 定义客户数据的类型接口
interface Customer {
  id: string | number;
  name: string;
}

const ADVANTAGES = [
  {
    icon: "🌍",
    title: "直采网络",
    desc: "与多国头部酒厂建立长期直采合作，砍掉中间环节，将成本优势与品质保障直达合作伙伴。",
  },
  {
    icon: "🏭",
    title: "自有仓储",
    desc: "在中国多城市建立多模态物流运营网络，覆盖全国配送网络。", // 修正了原本"物多模态流"的语病
  },
  {
    icon: "🛡️",
    title: "合规保障",
    desc: "专业团队保障各国酒类进出口法规，确保每一批次酒水合法合规。",
  },
  {
    icon: "📊",
    title: "数据驱动",
    desc: "自主研发供应链管理系统，实时追踪库存、物流、销售数据，为决策提供精准洞察。",
  },
] as const;

const MILESTONES = [
  { year: "2017", title: "公司成立", desc: "Steady Stream 成立，启动精品酒水经销业务" },
  { year: "2021", title: "渠道拓展", desc: "进入全国 50+ 城市，覆盖高端餐饮、精品零售、电商平台" },
  { year: "2023", title: "蔻斯科瓦", desc: "重庆温控仓储中心启用，服务西南市场" },
  { year: "2024", title: "战略升级", desc: "全面覆盖即时零售履约体系" },
  { year: "2025", title: "未来展望", desc: "持续深耕酒水赛道，连接全球与中国的酒水桥梁" },
] as const;

export default async function AboutPage() {
  const customers: Customer[] = (await getCustomers()) || [];

  return (
    <div className="bg-gray-50 text-gray-800 antialiased">
      {/* 1. 页面横幅 (Page Header) */}
      <section className="bg-primary-dark px-6 py-28 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-light tracking-wide text-white md:text-5xl">
            关于我们
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
            连接全球与中国的酒水桥梁
          </p>
        </div>
      </section>

      {/* 2. 公司介绍 */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title mb-10 text-3xl font-medium tracking-wider">公司介绍</h2>
          <div className="space-y-6 text-base leading-8 text-gray-600">
            <p>
              Steady Stream 成立于 2018 年，是一家专注于优质酒水供应链管理的专业公司。我们致力于将全球优秀的葡萄酒与烈酒、啤酒、果酒引入中国市场，为进口商、餐饮集团、零售渠道提供从选品采购到终端配送的一站式服务。
            </p>
            <p>
              公司总部位重庆，与多国头部酒厂建立了长期稳定的合作关系，拥有丰富的品牌运营经验和成熟的渠道网络。
            </p>
            <p className="font-medium text-primary-dark/90">
              我们相信，好的酒水能够跨越地理的界限，连接不同的文化与人群。Steady Stream 将持续深耕酒水赛道，将更多优质产品带给中国消费者。
            </p>
          </div>
        </div>
      </section>

      {/* 3. 核心优势 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title mb-16 text-center text-3xl font-medium tracking-wider">核心优势</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-gray-100 bg-gray-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-dark/5 text-3xl transition-colors group-hover:bg-primary-dark/10">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium tracking-wide text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 发展历程 */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="section-title mb-20 text-center text-3xl font-medium tracking-wider">发展历程</h2>
        <div className="relative mx-auto max-w-3xl">
          {/* 中间/左侧的中轴线 */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {MILESTONES.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 时间轴圆点 */}
                  <div className="absolute left-4 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary-dark bg-white md:left-1/2" />

                  {/* 内容卡片 */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <span className="inline-block text-sm font-bold tracking-wider text-primary-dark bg-primary-dark/5 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      {item.desc}
                    </p>
                  </div>

                  {/* 桌面端占位平衡块 */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 合作伙伴 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title mb-16 text-center text-3xl font-medium tracking-wider">合作伙伴</h2>
          {customers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex h-20 items-center justify-center rounded-xl border border-gray-100 bg-white px-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200"
                >
                  <span className="text-sm font-medium tracking-wide text-gray-600">
                    {customer.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400 tracking-wide">暂无客户数据</p>
          )}
        </div>
      </section>
    </div>
  );
}
