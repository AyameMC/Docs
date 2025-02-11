import React, { use } from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import i18n from '@generated/i18n';

export default function GiscusComponent() {
  const isDarkTheme = useColorMode().colorMode === "dark";

  const language = () => {
    switch (i18n.currentLocale) {
      case 'zh-Hans':
        return 'zh-CN';
      default:
        return 'en';
    }
  };
  return (
    <div>
      <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
        <Translate>
          发表评论，即代表您同意对其进行内容审查，未通过的评论将被自动删除。
        </Translate>
      </p>
      <Giscus
        repo="AyameMC/Docs"
        repoId="R_kgDOMtMeoA"
        category="Comments"
        categoryId="DIC_kwDOMtMeoM4CmzMp"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        loading="lazy"
        theme={isDarkTheme ? "noborder_dark" : "noborder_light"}
        lang={language()}
      />
    </div>
  );
}
