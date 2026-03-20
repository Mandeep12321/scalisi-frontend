import classes from "./VendorLocationCard.module.css";

export default function VendorLocationCard({ data }) {
  return (
    <div className={classes.mapCard}>
      <div className={classes.cardNumber}>
        <p className="fs-23 fw-700">{data?.id || "1"}</p>
      </div>
      <div className={classes.mapCardText}>
        <h1 className={`fw-700 text-green ${classes.locationName}`}>
          {data?.locationName || "Name"}
        </h1>
        <p className={`fw-500 ${classes?.locationDesc}`}>
          {data?.locationDesc || "Desc"}
        </p>
      </div>
    </div>
  );
}
