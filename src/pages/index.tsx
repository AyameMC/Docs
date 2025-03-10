import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import LogoSvg from '/static/img/logo.svg';
import Translate from '@docusaurus/Translate';
import { JSX } from 'react';
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <LogoSvg className={styles.logo} />
        <Heading as="h1" className="hero__title" style={{ color: 'var(--ifm-hero-text-color)' }}>
          Ayame
        </Heading>
        <p className="hero__subtitle">
          <Translate>
            GeckoLib 驱动的自定义玩家模型模组
          </Translate>
        </p>
        <div className={styles.buttonUserDoc}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/user-doc/intro">
            <Translate>用户文档</Translate>
          </Link>
        </div>
        <div style={{ height: '16px' }} /> {/* 空隙 */}
        <div className={styles.buttonDevDoc}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/dev-doc/intro">
            <Translate>开发文档</Translate>
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
      title={`Home Page`}
      description="Documentation for the Custom player model mod Ayame <head/>">
      <HomepageHeader />
      {/* <main>
          { <HomepageFeatures /> }
        </main> */}
    </Layout>
  );
}