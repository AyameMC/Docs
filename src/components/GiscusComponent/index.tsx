import React, { useState, useEffect } from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  const [userLang, setUserLang] = useState("zh-CN");

  useEffect(() => {
    let browserLang = navigator.language || "zh-CN";

    if (browserLang.startsWith("zh")) {
      setUserLang(browserLang);
    } else if (browserLang.startsWith("en")) {
      setUserLang("en");
    } else {
      setUserLang("en");
    }
  }, []);

  return (
    <div>
      <p style={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
        发表评论，即代表您同意对其进行内容审查，未通过的评论将被自动删除。
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
        lang={userLang}
      />
    </div>
  );
}