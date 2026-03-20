"use client";

import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 540px)",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          animation: "pulse 2s infinite",
        }}
      >
        <Image
          alt="logo"
          src="/assets/images/app-images/logo.png"
          fill
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
