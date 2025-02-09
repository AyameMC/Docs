import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';
import { useLocationChange } from '@docusaurus/theme-common/internal';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  return (
    <Giscus    
      repo="AyameMC/Docs"
      repoId="R_kgDOMtMeoA"
      category="Announcements"
      categoryId="DIC_kwDOMtMeoM4Cmycg"  // E.g. id of "General"
      mapping="url"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      // lang="en"
      loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
}