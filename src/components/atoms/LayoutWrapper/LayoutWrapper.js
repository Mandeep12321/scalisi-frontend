"use client";

import { useSelector } from "react-redux";

const LayoutWrapper = ({ children }) => {
  const { isDrawerOpen } = useSelector((state) => state?.commonReducer);
  return (
    <div
      className="body"
      style={{
        transform: isDrawerOpen ? `translateX(-284px)` : `translateX(0)`,
        transition: "transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;
