import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ayame Docs',
  tagline: 'GeckoLib 驱动的自定义玩家模型模组',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://docs.ayame.cneko.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AyameMC', // Usually your GitHub org/user name.
  projectName: 'Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/AyameMC/Docs/tree/main',
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/AyameMC/Docs/tree/main',
          // Useful options to enforce blogging best practices
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

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Ayame Docs',
      logo: {
        alt: 'Ayame Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right'
        },
        {
          type: 'docSidebar',
          sidebarId: 'userDocSidebar',
          position: 'left',
          label: '用户文档',
        },
        {
          type: 'docSidebar',
          sidebarId: 'devDocSidebar',
          position: 'left',
          label: '开发文档',
        },
        { to: '/blog', label: '更新日志', position: 'right' },
        {
          href: 'https://github.com/AyameMC/Ayame',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '页面',
          items: [
            {
              label: '用户文档',
              to: '/docs/user-doc/intro',
            },
            {
              label: '开发文档',
              to: '/docs/dev-doc/intro',
            },
            {
              label: '更新日志',
              to: '/blog',
            },
          ],
        },
        {
          title: '社群',
          items: [
            {
              label: 'MC 百科',
              href: 'https://www.mcmod.cn',
            },
            {
              label: 'Modrinth',
              href: 'https://modrinth.com',
            },
            {
              label: 'CurseForge',
              href: 'https://curseforge.com',
            },
          ],
        },
        {
          title: '相关链接',
          items: [
            {
              label: '文档 GitHub',
              href: 'https://github.com/AyameMC/Docs',
            },
            {
              label: 'Ayame GitHub',
              href: 'https://github.com/AyameMC/Ayame',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ayame Docs. Docs licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/deed/">CC BY SA 4.0</a>. Built with <a href="https://docusaurus.io/">Docusauru</a>s.<br>Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
