import React, { useState, useEffect } from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  const [userLang, setUserLang] = useState("en");

  useEffect(() => {
    let browserLang = navigator.language || "en";

    if (browserLang.startsWith("zh")) {
      setUserLang(browserLang);
    } else if (browserLang.startsWith("en")) {
      setUserLang("en");
    } else {
      setUserLang("en");
    }
  }, []);

  return (
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
      loding="lazy"
      theme={colorMode}
      lang={userLang}
    />
  );
}