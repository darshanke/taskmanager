import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SingleTask from "./SIngleTask";
import { TodoStore } from "../../store/slices/todo.slice";

type Styles = {
  variant: "Todo" | "InProgress" | "Completed";
};

function TaskList({ variant }: Styles) {
  const theme = useTheme<Theme>();
  const [openTodo, setOpenTodo] = useState(
    variant == "Todo" || variant == "InProgress" ? true : false
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const variantColors: Record<Styles["variant"], string> = {
    Todo: theme.palette.custom.TODO,
    InProgress: theme.palette.custom.INPROGRESS,
    Completed: theme.palette.custom.DONE,
  };
  const [taskData, setTaskData] = useState<TodoStore[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("todos");

    if (storedTasks) {
      try {
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

        // Status mapping
        const statusMap: Record<
          Styles["variant"],
          "TODO" | "INCOMPLETE" | "COMPLETED"
        > = {
          Todo: "TODO",
          InProgress: "INCOMPLETE",
          Completed: "COMPLETED",
        };

        // Filter tasks based on the variant prop
        const filteredTasks = parsedTasks.filter(
          (task) => task.status === statusMap[variant]
        );

        setTaskData(filteredTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        setTaskData([]);
      }
    }
  }, [variant]);

  const styles = {
    width: "100%",
    height: "56px",
    border: `1px solid ${variantColors[variant]}`,
    backgroundColor: `${variantColors[variant]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Mulish",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "140%",
    letterSpacing: "0%",
    color: "#000000",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  };

  const openAddModal=()=>{

  }
  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      <Box sx={styles} onClick={() => setOpenTodo(!openTodo)}>
        <Typography sx={{ marginX: 1 }}> {variant}</Typography>
        <IconButton>{openTodo ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>

      <Collapse in={openTodo}>
        <Box
          sx={{
            backgroundColor: "#F1F1F1",
            border: "1px solid #FFFAEA",
            minHeight:
              variant === "Todo"
                ? "30vh"
                : variant === "InProgress"
                ? "20vh"
                : "0vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {variant == "Todo" && (
            <Box
              sx={{
                width: "100%",
                marginX: 2,
                height: "41px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                border: "0px solid #0000001A",
              }}
            >
              <Typography
                sx={{
                  marginX: 2,
                  fontFamily: "Mulish",
                  fontWeight: 700,
                  color: "#000000CC",
                  cursor: "pointer",
                }}
                onClick={() => openAddModal()}
              >
                + ADD TASK
              </Typography>
            </Box>
          )}
          {/* Add templete box*/}
          {variant == "Todo" && (
            <Box
              sx={{
                width: "100%",
                //   marginX: 2,
                height: "41px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                border: "0px solid #0000001A",
              }}
            ></Box>
          )}
          {/* drag and drop  */}
          {
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                // justifyContent: "center",
                flexDirection: "column",
                // alignItems: "center",
                flexGrow: 1,
              }}
            >
              {taskData.length > 0 ? (
                taskData.map((task, index) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "48px",
                        gap: 5,
                      }}
                    >
                      <input
                        type="checkbox"
                        height={20}
                        width={20}
                        value={index}
                      />
                      {isMobile && (
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color:
                                variant === "Completed" ? "#1B8D17" : "gray",
                            }}
                          />
                        </Box>
                      )}
                      <SingleTask task={task} index={index ?? 0} />
                    </div>
                  );
                })
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {variant === "Todo"
                    ? "No Task in To-Do"
                    : variant === "InProgress"
                    ? "No Task in In Progress"
                    : ""}
                </Typography>
              )}
            </Box>
          }
        </Box>
      </Collapse>
    </Box>
  );
}

export default TaskList;
