import { Box, Typography, useMediaQuery } from "@mui/material";
import task from "./assets/task_icon.svg";
import { useTheme, Theme } from "@mui/material/styles";

interface styles {
  size?: string;
  color?: string;
}

const Title = ({ size, color }: styles) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        fontSize: size,
        color: color,
        display: "flex",
        alignItems: "center",
        fontFamily: "Mulish",
        fontWeight: 600,
        lineHeight: "140%",
        letterSpacing: "0%",
      }}
    >
      {!isMobile && (
        <Box
          component="img"
          src={task}
          alt="Task Icon"
          height={25}
          width={25}
          mr={1}
        />
      )}
      <Typography>TaskBuddy</Typography>
    </Box>
  );
};

export default Title;
