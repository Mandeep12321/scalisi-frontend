import Link from "next/link";
import { MdOutlineHome, MdOutlineChevronLeft } from "react-icons/md";
import classes from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.errorCode}>404</h1>
        <h2 className={classes.errorTitle}>This Page Rolled Off the Cart!</h2>
        <p className={classes.errorDescription}>
          The page you are looking for might have been harvested, had its name
          changed, or is temporarily out of stock. Let&apos;s get you back to the fresh produce!
        </p>
        
        <div className={classes.buttonGroup}>
          <Link href="/" className={classes.primaryBtn}>
            <MdOutlineHome size={22} />
            Back to Home
          </Link>
          <Link href="/products" className={classes.secondaryBtn}>
            <MdOutlineChevronLeft size={22} />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
