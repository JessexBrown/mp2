import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
    return (
        <div className={styles.shell}>
            <header className={styles.header}>
            <Link to="/" className={styles.brand}>PokeDex</Link>
            <nav className={styles.nav}>
                <NavLink to="/" end>List</NavLink>
                <NavLink to="/gallery">Gallery</NavLink>
            </nav>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}
