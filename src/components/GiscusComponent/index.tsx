import React, { useState, useEffect } from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import { parseLanguage } from '@docusaurus/theme-common/internal';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

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
        theme={colorMode}
        lang="zh-CN"
      />
    </div>
  );
}