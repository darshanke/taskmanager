import { Box, Card, Stack, Typography, ClickAwayListener } from "@mui/material";
import  { useState } from "react";
import { TodoStore } from "../../store/slices/todo.slice";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskCardProp = {
  task: TodoStore;
};

const TaskCards = ({ task }: TaskCardProp) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card
      sx={{
        width: "80%",
        height: "110px",
        m: 2,
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "0.5px solid #58575147",
        p: 2,
        display: "flex",
        flexDirection: "column",
        position: "relative", 
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold">{task.title}</Typography>
        <MoreHorizIcon onClick={() => setShowMenu(true)} sx={{ cursor: "pointer" }} />
      </Stack>

      {/* ClickAwayListener will detect clicks outside and close the menu */}
      {showMenu && (
        <ClickAwayListener onClickAway={() => setShowMenu(false)}>
          <Box sx={{ position: "absolute", top: "40px", right: "10px" }}>
            <EditAndDelete id={task.id}/>
          </Box>
        </ClickAwayListener>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" justifyContent="space-between" mt={1}>
        <Typography color="gray">{task.category}</Typography>
        <Typography color="gray">{task.due_on.toLocaleDateString()}</Typography>
      </Stack>
    </Card>
  );
};

type EditAndDeletePro = {
    id: string
}

const EditAndDelete = ({id}: EditAndDeletePro ) => {
    const editTask = ()=>{
        console.log(id)
    }
    const deleteTask =()=>{
        console.log(id)
    }
    return (
      <Stack
        sx={{
          width: "134px",
          backgroundColor: "white",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "8px",
          zIndex: 10,
          fontFamily: 'Mulish',
          fontWeight: 600, 
          fontSize:'16px', 
          lineHeight: '140%', 

        }}
      >
        <Stack direction="row" alignItems="center" onClick={editTask} sx={{ cursor: "pointer", color: '#000000' ,  padding: "4px 8px" }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography>Edit</Typography>
        </Stack>
  
        <Stack direction="row" alignItems="center" onClick={deleteTask}sx={{ cursor: "pointer", color: '#DA2F2F', padding: "4px 8px" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography>Delete</Typography>
        </Stack>
      </Stack>
    );
  };

export default TaskCards;
