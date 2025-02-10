import React, {type ReactNode} from 'react';
import BlogPostPaginator from '@theme-original/BlogPostPaginator';
import type BlogPostPaginatorType from '@theme/BlogPostPaginator';
import type {WrapperProps} from '@docusaurus/types';
import GiscusComponent from '@site/src/components/GiscusComponent';

type Props = WrapperProps<typeof BlogPostPaginatorType>;

export default function BlogPostPaginatorWrapper(props: Props): ReactNode {
  return (
    <>
      <BlogPostPaginator {...props} />
      <div style={{ marginTop: '20px' }} />
      <GiscusComponent/>
    </>
  );
}
