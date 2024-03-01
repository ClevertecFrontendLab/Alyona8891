import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './mainLayout.module.scss';
import { Layout } from 'antd';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { SiderComponent } from '@pages/mainPage/components/siderComponent';

export const MainLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 1);
  }, []);

  return (
      <>
          <div className={styles[cn('wrapper')]}>
              <Layout
                  className={styles[cn('main_layout')]}
                  style={{ backgroundColor: 'inherit' }}
              >
                  <SiderComponent />
                  <Layout
                      className={styles[cn('main')]}
                      style={{ backgroundColor: 'inherit', height: '100%' }}
                  >
                      {children}
                  </Layout>
              </Layout>
          </div>
          {isLoading && <Loader />}
      </>
  );
};
