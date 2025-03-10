import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ayame Docs',
  tagline: 'GeckoLib 驱动的自定义玩家模型模组',
  favicon: 'img/logo.png',

  url: 'https://ayamemc.org',
  baseUrl: '/',

  organizationName: 'AyameMC',
  projectName: 'Docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/AyameMC/Docs/tree/main',
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/AyameMC/Docs/tree/main',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
      title: 'Ayame Docs',
      logo: {
        alt: 'Ayame Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: '文档',
          position: 'left',
          items: [
            {
              type: 'doc',
              label: '用户文档',
              docId: 'user-doc/intro',
            },
            {
              type: 'doc',
              label: '开发文档',
              docId: 'dev-doc/intro',
            },
            // ... more items
          ],
        },
       {
          type: 'dropdown',
          label: '工具',
          position: 'left',
          items: [
            {
              href: 'https://ayamemc.org/encrypter',
              label: '模型解析器'
            }
          ],
        },
        { to: '/blog', label: '更新日志', position: 'right' },
        { type: 'localeDropdown', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '页面',
          items: [
            { label: '用户文档', to: '/docs/user-doc/intro' },
            { label: '开发文档', to: '/docs/dev-doc/intro' },
            { label: '更新日志', to: '/blog' },
          ],
        },
        {
          title: '社群',
          items: [
            { label: 'MC 百科', href: 'https://www.mcmod.cn' },
            { label: 'Modrinth', href: 'https://modrinth.com' },
            { label: 'CurseForge', href: 'https://curseforge.com' },
          ],
        },
        {
          title: '相关链接',
          items: [
            { label: '文档 GitHub', href: 'https://github.com/AyameMC/Docs' },
            { label: 'Ayame GitHub', href: 'https://github.com/AyameMC/Ayame' },
          ],
        },
        {
          title: '友情链接',
          items: [
            { label: 'YSM 文档', href: 'http://ysm.cfpa.team/' },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AyameMC. Docs licensed under <a href="https://creativecommons.org/publicdomain/zero/1.0/deed" target="_blank">CC0 1.0</a>. Built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>.`,
    },
    prism: {
      defaultLanguage: 'java',
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['java', 'groovy', 'gradle'],
    },
  },
};

export default config;
