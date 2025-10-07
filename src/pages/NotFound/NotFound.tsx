import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"


export default function NotFound() {
    console.log("This is not a valid route")

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Oops! This page doesn’t exist.</p>
            <Link to="/" className={styles.link}>Go back home</Link>
        </div>
    );
}