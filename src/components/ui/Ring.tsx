import { useTheme, Theme } from "@mui/material/styles";
import React from "react";

type RingProps = {
  width: string;
  position?: "absolute" | "relative";
};

const Ring: React.FC<RingProps> = ({ width, position = "absolute" }) => {
  const theme = useTheme() as Theme;

  return (
    <div
      style={{
        width,
        height: width,
        border: `0.73px solid ${theme?.palette?.primary?.main}`,
        borderRadius: "50%",
        position,
      }}
    ></div>
  );
};

interface RingsContainerProps {
  position?: "relative" | "absolute";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
  ringSizes?: string[]; 
  transform?: string;
}

const RingsContainer: React.FC<RingsContainerProps> = ({
  position,
  transform, 
  top,
  right,
  bottom,
  left,
  zIndex,
  ringSizes = ["177px", "149px", "120px"], 
}) => {

  const containerSize = ringSizes[0] || "177px";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: containerSize,
        width: containerSize,
        position,
        top,
        right,
        bottom,
        left,
        margin: 4,
        zIndex,
        transform
      }}
    >
      {ringSizes.map((size, index) => (
        <Ring key={index} width={size} />
      ))}
    </div>
  );
};

export default RingsContainer;
