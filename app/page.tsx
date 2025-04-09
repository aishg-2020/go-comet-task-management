import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <h1 className={styles.title}>Go Comet Task Management</h1>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/table" className={styles.link}>
                Table
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={styles.link}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
