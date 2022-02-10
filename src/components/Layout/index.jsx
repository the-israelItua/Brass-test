import styles from "./layout.module.scss";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <nav>
        <Link to="/">Payout Merchant</Link>
      </nav>
      {children}
    </main>
  );
};

export default Layout;
