import React from "react";
import "./style.css";

interface LoaderProps {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  fill?: string;
  color?: string;
  foregroundColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size,
  color,
  foregroundColor,
}) => {
  const sizes = {
    size: {
      xs: "18px",
      sm: "32px",
      md: "48px",
      lg: "56px",
      xl: "64px",
    },
    width: {
      xs: "1.5px",
      sm: "2px",
      md: "4px",
      lg: "6px",
      xl: "8px",
    },
  };
  let loaderSize = sizes.size.sm;
  let loaderWidth = sizes.width.sm;

  switch (size) {
    case "xs":
      loaderSize = sizes.size.xs;
      loaderWidth = sizes.width.xs;
      break;
    case "sm":
      loaderSize = sizes.size.sm;
      loaderWidth = sizes.width.sm;
      break;
    case "md":
      loaderSize = sizes.size.md;
      loaderWidth = sizes.width.md;
      break;
    case "lg":
      loaderSize = sizes.size.lg;
      loaderWidth = sizes.width.lg;
      break;
    case "xl":
      loaderSize = sizes.size.xl;
      loaderWidth = sizes.width.xl;
      break;
    default:
      break;
  }

  const borderStyle = {
    border: `${loaderWidth} solid ${foregroundColor}`,
    borderTop: `${loaderWidth} solid ${color}`,
    borderRight: `${loaderWidth} solid ${color}`,
    borderBottom: `${loaderWidth} solid ${color}`,
    width: loaderSize,
    height: loaderSize,
  };

  return (
    <div className="loader-container">
      <div style={borderStyle} className="loader"></div>
    </div>
  );
};

export default Loader;
