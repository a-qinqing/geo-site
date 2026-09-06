/**
 * 全站 Schema.org 实体唯一来源（Single Source of Truth）
 *
 * 第二阶段改造（2026-09-06 用户确认版）：
 * - Organization 是唯一根实体，name = "GEOVA"，所有页面通过 @id 引用，不再内联复制孤立副本
 * - alternateName = ["GEO 咨询", "GEOVA.CN"]（不人为制造额外品牌变体）
 * - 真实 Person（秦丽芳 Lifang Qin）只在 /about/ 建立（@id .../about/#person），
 *   博客 author / Person.worksFor 统一引用该实体
 * - WebSite 无 SearchAction（站点无搜索功能，原为死链）
 * - sameAs 仅保留已验证存在的 LinkedIn；X/Twitter 未验证，只留模板位
 */
export const SITE_URL = "https://www.geova.cn";
export const HOME_URL = `${SITE_URL}/`;
export const ABOUT_URL = `${SITE_URL}/about/`;

/** 唯一实体 @id（全部基于真实 URL + # 片段，全站唯一） */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFESSIONAL_SERVICE_ID = `${SITE_URL}/#professional-service`;
export const PERSON_ID = `${ABOUT_URL}#person`;

/** 已验证存在的社交媒体链接（Footer / About / Contact 站内多处自证） */
export const LINKEDIN_URL = "https://www.linkedin.com/in/geova-qin/";

// TODO: 待用户手动填入验证有效的 X/Twitter 统一社交账号 URL 后启用；
// 切勿放入未经证实的链接（审计确认 twitter.com/q1404929834 无法验证存在）
export const sameAs = [LINKEDIN_URL];

/** 实体引用（跨页统一通过 @id 引用根实体，避免孤立副本） */
export const organizationRef = { "@id": ORG_ID };

/** 全站唯一的 Organization 根实体 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@id": ORG_ID,
  "@type": "Organization",
  name: "GEOVA",
  alternateName: ["GEO 咨询", "GEOVA.CN"],
  url: HOME_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: "contact@geova.cn",
  description: "专注 SEO 与 GEO（生成式引擎优化）策略的知识分享与咨询服务",
  sameAs,
};

/** 站点实体（无 SearchAction——站点不存在 /search 搜索页） */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@id": WEBSITE_ID,
  "@type": "WebSite",
  name: "GEOVA",
  url: HOME_URL,
  description:
    "专注 SEO & GEO 优化，帮企业与个人重构搜索流量。提供搜索策略知识分享与专业咨询服务。",
  inLanguage: "zh-CN",
};

/** 真实 Person（只在 /about 页输出；姓名与 LinkedIn 显示格式一致） */
export const personSchema = {
  "@context": "https://schema.org",
  "@id": PERSON_ID,
  "@type": "Person",
  name: "Lifang Qin (秦丽芳)",
  alternateName: "秦丽芳",
  url: ABOUT_URL,
  jobTitle: "SEO & GEO 策略顾问",
  description:
    "专注于 SEO 与 GEO（生成式引擎优化）策略，10+ 年搜索优化经验，帮助企业与个人在 AI 时代重构搜索流量。",
  worksFor: organizationRef,
  sameAs,
  knowsAbout: [
    "SEO",
    "GEO",
    "AI Search Visibility",
    "Structured Data",
    "Content Strategy",
  ],
};

/** 首页 ProfessionalService（provider → #organization，offer 目录指向真实服务页） */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@id": PROFESSIONAL_SERVICE_ID,
  "@type": "ProfessionalService",
  name: "SEO & GEO 搜索优化服务",
  url: `${SITE_URL}/services/`,
  description:
    "提供 SEO 全站诊断、GEO/AI 搜索可见度优化、团队顾问与培训三大核心服务。从诊断到执行，覆盖搜索流量全链路。",
  provider: organizationRef,
  areaServed: {
    "@type": "Continent",
    name: "全球（线上服务）",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/contact`,
    availableLanguage: ["zh-CN", "en"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "核心服务",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO 全站诊断",
          url: `${SITE_URL}/services/seo-audit/`,
          description:
            "系统诊断网站技术健康度、内容质量和外链状况，交付可落地的优化路线图。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GEO 优化服务",
          url: `${SITE_URL}/services/geo-optimization/`,
          description:
            "提升品牌在 ChatGPT、Perplexity、Gemini 等 AI 引擎中的被引用率与可见度。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GEO 审计与 AI 搜索诊断",
          url: `${SITE_URL}/services/geo-audit/`,
          description:
            "在 ChatGPT、Perplexity、Gemini 等 AI 引擎中实测品牌被提及、被引用、被推荐的真实情况，交付可见度基线报告与执行路线图。",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO/GEO 培训与团队顾问",
          url: `${SITE_URL}/services/training/`,
          description:
            "为企业市场团队提供 SEO + GEO 能力建设，从认知培训到策略陪跑。",
        },
      },
    ],
  },
};

export interface ServicePageSchemaParams {
  /** 以 / 结尾的页面路径，如 "/services/geo-optimization/" */
  path: string;
  name: string;
  serviceType: string;
  description: string;
}

/** 服务页 Service 工厂：每页独立 @id（...#service）、provider 统一引用 #organization */
export function serviceSchema({
  path,
  name,
  serviceType,
  description,
}: ServicePageSchemaParams) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@id": `${url}#service`,
    "@type": "Service",
    name,
    url,
    serviceType,
    description,
    provider: organizationRef,
    areaServed: {
      "@type": "Continent",
      name: "全球（线上服务）",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
      availableLanguage: ["zh-CN", "en"],
    },
  };
}

export interface Crumb {
  name: string;
  url: string;
}

/** BreadcrumbList 工厂：与页面可见面包屑共用同一数据源（schema 与可见一一对应） */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
