/* eslint-disable no-restricted-exports */
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export default function robots() {
  return {
    host: baseUrl,
    rules: [
      {
        userAgent: '*',
      },
      // --- 新增：为 AI 搜索爬虫开放权限 ---
      {
        userAgent: 'OAI-SearchBot',
        allow: '/', // 允许 ChatGPT 搜索爬虫
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/', // 允许 Perplexity 搜索爬虫
      },
      // --- 保持原有对部分爬虫的屏蔽 ---
      {
        userAgent: 'GPTBot',
        disallow: '/', // 屏蔽训练爬虫
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/', // 屏蔽 Google 训练爬虫
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
