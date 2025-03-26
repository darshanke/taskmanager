import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  InputAdornment,
  TextField,
  IconButton,
  useTheme,
  Theme,
  useMediaQuery,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import { FormatBold, FormatItalic, FormatListBulleted } from "@mui/icons-material";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskIcon from "../../assets/taskDecription.svg";
import CategoryButtonGroup from "../ui/CategoryButton";
import BasicDatePicker from "./DatePicker";
import BasicSelect from "./DropDownSelection";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTodo, TodoStore } from "../../store/slices/todo.slice";
// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFFFFF",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: "Mulish",
  lineHeight: "140%",
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  // left: 0,
  whiteSpace: "nowrap",
  // width: 1,
  // p: 0,
  // mt: 2,
});

type Actions = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BasicModal({ open, setOpen }: Actions) {
  const handleClose = () => setOpen(false);
  const [text, setText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({
    bold: false,
    italic: false,
    strikethrough: false,
  });
  type VariantType = "Work" | "Personal";
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState<{
    title: string;
    category: VariantType | null;
    due_on: Dayjs | null;
    status: "TODO" | "INCOMPLETE" | "COMPLETED";
  }>({
    title: "",
    category: null,
    due_on: null,
    status: "TODO",
  });
  const dispatch = useDispatch();

  const maxLength = 300;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
    }
  };
  type StyleType = "bold" | "italic" | "strikethrough";
  const applyStyle = (style:StyleType) => {
    setSelectedStyle((prev) => ({ ...prev, [style]: !prev[style] }));
  };

  const inputChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setTasks((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const submitTask = () => {
    if (tasks.category === null || tasks.due_on === null || tasks.title == "") {
      window.alert("check the input field");
      return;
    }
    type Status = "TODO" | "INCOMPLETE" | "COMPLETED";
    type Category = "WORK" | "PERSONAL";
    type TaskActivity = {
      createdAt: Date;
      updateAt: Date;
      fileUpdateAt: Date;
    };
    const activity = {
      createdAt: new Date(),
      updateAt: new Date(),
      fileUpdateAt: new Date(),
    };
    const newTask: TodoStore = {
      id: uuidv4(),
      title: tasks.title,
      due_on: tasks.due_on.toDate(),
      status: tasks.status as Status,
      category: tasks.category as Category,
      activity: activity as TaskActivity,
    };
    dispatch(addTodo(newTask));
    setTasks({
      title: "",
      category: null,
      due_on: null,
      status: "TODO",
    });
    setText("");
    handleClose();
    // window.location.reload()
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "todos" && event.newValue) {
        const updatedTasks = JSON.parse(event.newValue);
        updatedTasks.forEach((task:TodoStore) => {
          dispatch(addTodo(task)); 
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ margin: 0, padding: 0 }}
    >
      <Box
        sx={{
          ...style,
          width: isMobile ? "90%" : "674px",
          minHeight: isMobile ? "100%" : "698px",
          // position: isMobile?"absolute": "",
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Create Task</Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>

        {/* Task Title */}
        <Box sx={{ width: "100%", mt: 2 }}>
          <TextField
            fullWidth
            placeholder="Task title"
            value={tasks.title}
            onChange={(e) => inputChanges(e, "title")}
          />
        </Box>

        {/* Task Description with Toolbar and Counter */}

        <Box
          sx={{
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
            minHeight: "123px",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            // flex: 1, 
          }}
        >
          {/* Task Input Field */}
          <TextField
            multiline
            maxRows={14}
            value={text}
            onChange={handleChange}
            placeholder="Task description"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={TaskIcon}
                    alt="Task Icon"
                    width={20}
                    height={20}
                    style={{ marginRight: "8px", alignSelf: "flex-start" }}
                  />
                </InputAdornment>
              ),
              sx: {
                alignItems: "flex-start",
                paddingTop: "10px",
                paddingBottom: "40px",
                fontWeight: selectedStyle.bold ? "bold" : "normal",
                fontStyle: selectedStyle.italic ? "italic" : "normal",
                textDecoration: selectedStyle.strikethrough
                  ? "line-through"
                  : "none",
              },
            }}
            sx={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "1rem",
              // flex: 1,
              paddingBottom: "40px",
            }}
          />

          {/* Toolbar Inside TextField */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // width: "98%",
              padding: "8px",
              // position: "absolute",
              bottom: "0",
              left: "0",
              background: "#f9f9f9",
              borderTop: "1px solid #ccc",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            {/* Formatting Icons */}
            <Box sx={{ display: "flex",  flex: 1, gap: 1, marginLeft: "10px" , border: 'none'}}>
              <IconButton
                size="small"
                onClick={() => applyStyle("bold")}
                color={selectedStyle.bold ? "primary" : "default"}
              >
                <FormatBoldIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => applyStyle("italic")}
                color={selectedStyle.italic ? "primary" : "default"}
              >
                <FormatItalicIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => applyStyle("strikethrough")}
                color={selectedStyle.strikethrough ? "primary" : "default"}
              >
                <FormatStrikethroughIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <FormatListBulletedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <FormatListNumberedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Character Counter */}
            <Typography
              variant="body2"
              color="gray"
              sx={{ marginRight: "20px" }}
            >
              {`${text.length}/${maxLength} characters`}
            </Typography>
          </Box>
        </Box>

        {/* Category, Date Picker, Status */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: "stretch", // Ensures all children stretch to full height
            gap: isMobile ? 2 : 3, // Adds spacing between items
          }}
        >
          {/* Task Category */}
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography sx={{ mb: 1 }}>Task Category*</Typography>
            <CategoryButtonGroup
              selectedCategory={tasks.category}
              onSelectCategory={(category) =>
                setTasks((prev) => ({ ...prev, category }))
              }
            />
          </Box>

          {/* Due Date Picker */}
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography sx={{ mb: 1 }}>Due on*</Typography>
            <BasicDatePicker
              selectedDate={tasks.due_on}
              onDateChange={(date) =>
                setTasks((prev) => ({
                  ...prev,
                  due_on: date,
                }))
              }
            />
          </Box>

          {/* Task Status */}
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography sx={{ mb: 1 }}>Task Status*</Typography>
            <BasicSelect
              selectedStatus={tasks.status || "TODO"}
              onStatusChange={(status: "TODO" | "INCOMPLETE" | "COMPLETED") =>
                setTasks((prev) => ({ ...prev, status }))
              }
            />
          </Box>
        </Box>

        {/* Attachment Upload */}
        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography>Attachment</Typography>
          <Button
            sx={{
              height: "43px",
              backgroundColor: "#F1F1F15C",
              border: "1px solid #00000021",
              color: "#1E212A",
              borderRadius: "8px",
              textTransform: "none",
            }}
            // component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Drop your files here or &nbsp;
            <span style={{ color: "#2956DD" }}>Update</span>
            <VisuallyHiddenInput type="file" multiple />
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexGrow: "1" }} />
        {/* Action Buttons */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 16,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 3,
            pX: 3,
            // mb: 3,
            height: "73px",
            backgroundColor: "#00000021",
            width: "100%",
          }}
        >
          <Button onClick={handleClose}>CANCEL</Button>
          <Button
            onClick={submitTask}
            variant="contained"
            color="primary"
            sx={{ m: 3 }}
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
