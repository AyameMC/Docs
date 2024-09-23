import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ayame Docs',
  tagline: 'GeckoLib 驱动的自定义玩家模型模组',
  favicon: 'img/logo.png',

  url: 'https://docs.ayame.cneko.org',
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
        searchBarShortcutHint: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Ayame Docs',
      logo: {
        alt: 'Ayame Logo',
        src: 'img/logo.svg',
      },
      items: [
        { type: 'localeDropdown', position: 'right' },
        { type: 'docSidebar', sidebarId: 'userDocSidebar', position: 'left', label: '用户文档' },
        { type: 'docSidebar', sidebarId: 'devDocSidebar', position: 'left', label: '开发文档' },
        { to: '/blog', label: '更新日志', position: 'right' },
        { href: 'https://github.com/AyameMC/Ayame', label: 'GitHub', position: 'right' },
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
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ayame Docs. Docs licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/deed/" target="_blank">CC BY SA 4.0</a>. Built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>.<br>NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['java', 'groovy', 'gradle'],
    },
  },
};

export default config;
