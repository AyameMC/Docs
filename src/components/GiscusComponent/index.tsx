import React, { useState, useEffect } from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  const [userLang, setUserLang] = useState("zh-CN");

  useEffect(() => {
    setUserLang(navigator.language || "zh-CN");
  }, []);

  return (
    <Giscus
      repo="AyameMC/Docs"
      repoId="R_kgDOMtMeoA"
      category="Comments"
      categoryId="DIC_kwDOMtMeoM4Cmycg"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang={userLang}
    />
  );
}