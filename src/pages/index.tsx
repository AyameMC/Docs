import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import LogoSvg from '/static/img/logo.svg';
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <LogoSvg className={styles.logo} />
        <Heading as="h1" className="hero__title" style={{ color: 'var(--ifm-hero-text-color)' }}>
          Ayame
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttonUserDoc}>
  <Link
    className="button button--secondary button--lg"
    to="/docs/user-doc/intro">
    用户文档
  </Link>
</div>
<div style={{ height: '16px' }} /> {/* 空隙 */}
<div className={styles.buttonDevDoc}>
  <Link
    className="button button--secondary button--lg"
    to="/docs/dev-doc/intro">
    开发文档
  </Link>
</div>

      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`主页`}
      description="Description will go into a meta tag in <head />">
        <HomepageHeader />
        {/* <main>
          { <HomepageFeatures /> }
        </main> */}
    </Layout>
  );
}