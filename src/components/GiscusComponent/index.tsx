import React, { useState, useEffect } from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  const [userLang, setUserLang] = useState("zh-CN"); // 默认值

  useEffect(() => {
    setUserLang(navigator.language || "zh-CN"); // 直接使用浏览器语言
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
      lang={userLang} // 直接传递用户语言
    />
  );
}