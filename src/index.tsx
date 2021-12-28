import styles from './index.module.less';
import Nav from './components/layout/Nav/index';
import TitleBar from './components/layout/TitleBar/index';
import { hot } from 'react-hot-loader/root';
const app = () => {
  return (
    <div className={styles.app}>
      <TitleBar />
      <div className={styles.content}>
        <Nav />
      </div>
    </div>
  );
};
export default hot(app);
