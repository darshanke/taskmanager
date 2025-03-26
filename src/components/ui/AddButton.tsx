import { Button, Typography } from "@mui/material";
import React from "react";

type Styles = {
  variant?: "small" | "large"; 
  openModalWindow: ()=> void
};

const AddButton: React.FC<Styles> = ({ variant = "large" , openModalWindow }) => {
  const buttonStyles = {
    small: {
      width: "86px",
      height: "32px",
      borderRadius: "41px",
    },
    large: {
      width: "158px",
      height: "48px",
      borderRadius: "41px",
    },
  };

  const textStyles = {
    small: {
      fontFamily: "Mulish",
      fontWeight: 700,
      fontSize: "10px",
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "right",
    },
    large: {
      fontFamily: "Mulish",
      fontWeight: 700,
      fontSize: "14px",
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "center",
      textTransform: "uppercase",
    },
  };

  return (
    <Button
      sx={{
        ...buttonStyles[variant],
        color: "#FFFFFF",
        backgroundColor: "#7B1984",
      }}
      onClick={()=>openModalWindow()}
    >
      <Typography sx={textStyles[variant]}>ADD TASK</Typography>
    </Button>
  );
};

export default AddButton;
