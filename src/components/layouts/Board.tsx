import { Box, Theme, Typography, useTheme } from "@mui/material";
import  { useEffect, useState } from "react";
import TaskCards from "./TaskCards";
import { TodoStore } from "../../store/slices/todo.slice";

type pattern = { variant: "TO-DO" | "IN-PROGRESS" | "COMPLETED" };
const Board = ({ variant }: pattern) => {
  const theme = useTheme<Theme>();

  const [taskData, setTaskData] = useState<TodoStore[]>([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("todos");
      if (!storedTasks) {
        setTaskData([]);
        return;
      }

      const parsedTasks: TodoStore[] = JSON.parse(storedTasks).map(
        (task: TodoStore) => ({
          ...task,
          due_on: new Date(task.due_on),
          activity: {
            ...task.activity,
            createdAt: new Date(task.activity.createdAt),
            updateAt: new Date(task.activity.updateAt),
            fileUpdateAt: new Date(task.activity.fileUpdateAt),
          },
        })
      );

      const statusMap: Record<string, "TODO" | "INCOMPLETE" | "COMPLETED"> = {
        "TO-DO": "TODO",
        "IN-PROGRESS": "INCOMPLETE",
        COMPLETED: "COMPLETED",
      };

      const filteredTasks = parsedTasks.filter(
        (task) => task.status === statusMap[variant]
      );
      setTaskData(filteredTasks);
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      setTaskData([]);
    }
  }, [variant]);

  const styles = {
    width: "336px",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: "12px",
    border: "1px solid #58575112",
    backgroundColor: "#F1F1F1",
    fontFamily: "Mulish",
    lineHeight: "140%",
  };
  useEffect(() => {}, []);
  return (
    <Box sx={styles}>
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "fit-content" }}
      >
        <Typography
          sx={{
            backgroundColor:
              variant === "TO-DO"
                ? `${theme.palette.custom.TODO}`
                : variant === "IN-PROGRESS"
                ? `${theme.palette.custom.INPROGRESS}`
                : `${theme.palette.custom.DONE}`,
            borderRadius: "4px",
            p: 1,
            m: 2,
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {variant}
        </Typography>
      </Box>
      {taskData.length > 0 ? (
        taskData.map((task) => <TaskCards task={task} />)
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{}}>
            {" "}
            No Tasks{" "}
            {variant === "TO-DO"
              ? `in To-Do`
              : variant === "IN-PROGRESS"
              ? `In Progress`
              : `No COmpleted Tasks`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Board;
