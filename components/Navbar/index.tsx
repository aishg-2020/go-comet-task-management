"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <h2 className={styles.logo}>Go Comet</h2>
      <ul className={styles.links}>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname === "/table" ? styles.active : ""}>
          <Link href="/table">Table</Link>
        </li>
        <li className={pathname === "/dashboard" ? styles.active : ""}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}
