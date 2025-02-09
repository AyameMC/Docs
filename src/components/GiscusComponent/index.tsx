import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import { useLocationChange } from '@docusaurus/theme-common/internal';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  // const userLanguage = navigator.language;
  return (
    <Giscus
      repo="AyameMC/Docs"
      repoId="R_kgDOMtMeoA"
      category="Comments"
      categoryId="DIC_kwDOMtMeoM4Cmycg"  // E.g. id of "General"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="zh-CN"
    />
  );
}