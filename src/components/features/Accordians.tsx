import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { ExpandLess, ExpandMore, MoreVert } from "@mui/icons-material";

const tasks = {
  todo: [
    { title: "Interview with Design Team", due: "Today", status: "TO-DO", category: "Work" },
    { title: "Team Meeting", due: "30 Dec, 2024", status: "TO-DO", category: "Personal" },
    { title: "Design a Dashboard page along with wireframes", due: "31 Dec, 2024", status: "TO-DO", category: "Work" },
  ],
  inProgress: [
    { title: "Review PRs", due: "29 Mar, 2024", status: "IN-PROGRESS", category: "Work" },
    { title: "Update Documentation", due: "1 Apr, 2024", status: "IN-PROGRESS", category: "Personal" },
  ],
};

const TaskList = () => {
  const [openTodo, setOpenTodo] = useState(true);
  const [openProgress, setOpenProgress] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, task: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedTask(null);
  };
  useEffect(()=>{
    console.log(selectedTask);
  }, [])

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 3 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", fontWeight: 700, p: 1, borderBottom: "2px solid #ccc" }}>
        <Typography sx={{ width: "40%" }}>Task name</Typography>
        <Typography sx={{ width: "20%" }}>Due on</Typography>
        <Typography sx={{ width: "20%" }}>Task Status</Typography>
        <Typography sx={{ width: "20%" }}>Task Category</Typography>
      </Box>

      {/* TODO SECTION */}
      <Box sx={{ bgcolor: "#EAC3FC", borderRadius: 2, mt: 2 }}>
        <Box sx={{ display: "flex", p: 2, alignItems: "center", cursor: "pointer" }} onClick={() => setOpenTodo(!openTodo)}>
          <Typography fontWeight={700}>Todo ({tasks.todo.length})</Typography>
          <IconButton>{openTodo ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </Box>
        <Collapse in={openTodo}>
          {tasks.todo.map((task, index) => (
            <Box key={index} sx={{ display: "flex", p: 2, alignItems: "center", bgcolor: "white", borderRadius: 2, mb: 1 }}>
              <Typography sx={{ width: "40%" }}>{task.title}</Typography>
              <Typography sx={{ width: "20%" }}>{task.due}</Typography>
              <Chip label={task.status} color="primary" sx={{ width: "20%" }} />
              <Chip label={task.category} sx={{ width: "20%" }} />
              <IconButton onClick={(event) => handleMenuOpen(event, task.title)}>
                <MoreVert />
              </IconButton>
            </Box>
          ))}
        </Collapse>
      </Box>

      {/* IN-PROGRESS SECTION */}
      <Box sx={{ bgcolor: "#A3E6FC", borderRadius: 2, mt: 2 }}>
        <Box sx={{ display: "flex", p: 2, alignItems: "center", cursor: "pointer" }} onClick={() => setOpenProgress(!openProgress)}>
          <Typography fontWeight={700}>In-Progress ({tasks.inProgress.length})</Typography>
          <IconButton>{openProgress ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </Box>
        <Collapse in={openProgress}>
          {tasks.inProgress.map((task, index) => (
            <Box key={index} sx={{ display: "flex", p: 2, alignItems: "center", bgcolor: "white", borderRadius: 2, mb: 1 }}>
              <Typography sx={{ width: "40%" }}>{task.title}</Typography>
              <Typography sx={{ width: "20%" }}>{task.due}</Typography>
              <Chip label={task.status} color="secondary" sx={{ width: "20%" }} />
              <Chip label={task.category} sx={{ width: "20%" }} />
              <IconButton onClick={(event) => handleMenuOpen(event, task.title)}>
                <MoreVert />
              </IconButton>
            </Box>
          ))}
        </Collapse>
      </Box>

      {/* MENU FOR EDIT/DELETE */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskList;
