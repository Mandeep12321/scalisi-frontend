import React from "react";
import classes from "./contactFormMap.module.css";

export default function ContactFormMap() {
  return (
    <div className={classes.mapContainer}>
      <iframe
        className={classes.map}
        src="https://maps.google.com/maps?q=Jack+Scalisi+Wholesale+Fruit+%26+Produce,+963+Stinson+Way,+West+Palm+Beach,+FL+33411&t=&z=15&ie=UTF8&iwloc=&output=embed"
        height={"267px"}
        width={"100%"}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
