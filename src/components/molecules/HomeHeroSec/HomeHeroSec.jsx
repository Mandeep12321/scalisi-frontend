"use client";

import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../atoms/Button";
import classes from "./HomeHeroSec.module.css";
import { useRouter } from "next/navigation";

export default function HomeHeroSec({ item }) {
  const [is375, setIs375] = useState(false);
  const router = useRouter();
  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);

  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  return (
    <div className={classes.homeHeroMain}>
      <div className={classes.homeHeroImg}>
        {is375 ? (
          <Image
            src={mediaUrl(item?.image375)}
            alt="Slide 1"
            fill
            draggable={false}
          />
        ) : (
          <Image
            src={mediaUrl(item?.image)}
            alt="Slide 1"
            fill
            draggable={false}
          />
        )}
      </div>
      <div className={mergeClass(classes.homeHeroContent)}>
        <h1 className={isSpanish ? "fs-43 fw-700" : "fs-45 fw-700"}>
          {item?.title}
        </h1>

        <p className="fs-15 fw-500">{item?.description}</p>
        <Button
          className={"fs-15 fw-700"}
          label={"Browse Collection"}
          style={{ padding: "14px 45px ", width: "fit-content" }}
          variant="white"
          onClick={() => {
            router.push("/catalogs");
          }}
        />
      </div>
    </div>
  );
}
