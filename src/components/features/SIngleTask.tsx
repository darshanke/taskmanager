import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TodoStore } from "../../store/slices/todo.slice";

type singleTask = {
  task: TodoStore;
  index?: number | undefined;
};

const SingleTask = ({ task, index }: singleTask) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
 
    <Box
      sx={{
        width: "100%",
        display: "flex",
        // flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: "flex-start",
      }}
      key={index}
    >
      <Typography
        sx={{
          width: isMobile ? "100%" : "30%",
          textDecoration: task.status === "COMPLETED" ? "line-through" : "none",
        }}
      >
        {task.title}
      </Typography>
      {!isMobile && (
        <Typography sx={{ width: "30%" }}>
          {task.due_on.toDateString()}
        </Typography>
      )}
      {!isMobile && (
        <Typography sx={{ width: "30%" }}>{task.status}</Typography>
      )}
      {!isMobile && (
        <Typography sx={{ width: "30%" }}>{task.category}</Typography>
      )}
    </Box>
  );
};

export default SingleTask;
