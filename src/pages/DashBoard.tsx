import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import { useTheme, Theme } from "@mui/material/styles";
import Profile from "../components/ui/Profile";
import Logout from "../components/ui/Logout";
import Views from "../components/ui/Views";
import AddButton from "../components/ui/AddButton";
import FIlterComponents from "../components/ui/FIlterComponents";
import SearchBar from "../components/ui/SearchBar";
import TableTop from "../components/layouts/TableTop";
import TaskList from "../components/features/TaskList";
import BasicModal from "../components/features/ModalWindow";
import Board from "../components/layouts/Board";


type DashBoardProp= {
  home?:boolean, 
}
const DashBoard:React.FC<DashBoardProp> = ({home}) => {
  const theme = useTheme<Theme>() as Theme;
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = home ? false : isMobileQuery;  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const image = localStorage.getItem("image") || "";
    const name = localStorage.getItem("user") || "";
    setName(name);
    setProfile(image);
  }, []);

  
  const [view, setView] = useState<string>("list");
  const openModalWindow = () => {
    setOpen(true);
  };
  useEffect(()=>{
  
  }, [])
  useEffect(() => {
    setView("list");
  }, [isMobile]);
  return (
    <>
      <Box
        sx={{
          backgroundColor: isMobile
            ? `${theme?.palette?.custom?.taskHeadingbg}`
            : "none",
          height: isMobile ? "54px" : "82px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",

          marginX: isMobile ? "0px" : "32px",
          marginTop: isMobile ? "0px" : "52px",
          width: home?"1367px":'auto'
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: isMobile ? "100%" : "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Title color={theme.palette.custom.taskView} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Profile profileImage={profile} />
              {!isMobile && (
                <Typography sx={{ marginLeft: "1rem" }}>{name}</Typography>
              )}
            </Box>
          </Box>
        </Box>
        
        {!isMobile && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mx: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Views setView={setView} view={view} />
            </Box>
            <Box sx={{
              display: 'flex', 
              gap: 2, 
              alignItems: 'center',   
            }}>{view==="board" &&<SearchBar/>}<Logout /></Box>
            
          </Box>
        )}
      </Box>
      {view === "list" ? (
        <Box
          sx={{
            marginX: isMobile ? 2 : "32px",
            marginTop: isMobile ? "0px" : "52px",
            gap: 2,
          }}
        >
          {isMobile && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <AddButton variant="small" openModalWindow={openModalWindow} />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                marginBottom: "1rem",
                marginTop: "1rem",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>filter: </Typography>
                <FIlterComponents />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: isMobile ? "100%" : "auto",
                  height: "auto",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: "1rem",
                }}
              >
                <SearchBar />
                {!isMobile && (
                  <AddButton
                    variant="large"
                    openModalWindow={openModalWindow}
                  />
                )}
              </Box>
            </Box>
          </Box>
          {!isMobile && <TableTop />}

          <TaskList variant="Todo" />
          <TaskList variant="InProgress" />
          <TaskList variant="Completed" />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            marginX: "32px",
            marginTop: "52px",
            display: "flex",
            gap: 3,
          }}
        >
          <Board variant="TO-DO" />
          <Board variant="IN-PROGRESS" />
          <Board variant="COMPLETED" />
        </Box>
      )}
      <BasicModal open={open} setOpen={setOpen} />
    </>
  );
};

export default DashBoard;
