import { Box, Typography } from "@mui/material";


function TableTop() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        textAlign: "left",
        height: "21px",
        fontFamily: "Mulish",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "0%",
        color: "#00000099",
        // marginTop: "2rem", 
      }}
    >
      <Typography sx={{width: '30%'}}>Task name</Typography>
      <Typography sx={{width: '30%'}}>Due on</Typography>
      <Typography sx={{width: '30%'}}>Task Status</Typography>
      <Typography sx={{width: '30%'}}>Task Category</Typography>
    </Box>
  );
}

export default TableTop;
