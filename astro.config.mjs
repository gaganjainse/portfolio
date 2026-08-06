import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import partytown from '@astrojs/partytown'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://gaganjain.vercel.app',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://gaganjain.vercel.app/') {
          item.priority = 1.0
          item.changefreq = 'daily'
        }
        return item
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  adapter: vercel({
    isr: {
      expiration: 60 * 60 * 24,
    },
  }),
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
