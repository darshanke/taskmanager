import React, { useState } from "react";
import { auth, googleProvider } from "../authentication/firebase";
import { signInWithPopup, User } from "firebase/auth";
import AuthButton from "../components/ui/AuthButton";
import { Box, Typography, useMediaQuery } from "@mui/material";
import task from "../assets/task.svg";
import { useNavigate } from "react-router-dom";
import { useTheme, Theme } from "@mui/material/styles";
import RingsContainer from "../components/ui/Ring";
import DashBoard from "./DashBoard";

const Home: React.FC = () => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  type CustomUser = User & {
    stsTokenManager: {
      accessToken: string;
      refreshToken: string;
    };
  };

  const storeUserData = (user: CustomUser) => {
    const { accessToken, refreshToken } = user.stsTokenManager;
    localStorage.setItem("user", user.displayName || "");
    localStorage.setItem("image", user.photoURL || "");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      storeUserData(userCredential.user as CustomUser);
      console.log(user, error);
      setError("");
      navigate("/dashboard");
      console.log("User logged in:", userCredential.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error logging in:", err.message);
      } else {
        setError("An unknown error occurred.");
        console.error("Unknown error:", err);
      }
    }
  };

  const renderContent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
        px: isMobile ? 2 : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontFamily: "Urbanist",
          fontWeight: 700,
          fontSize: "26.19px",
          color: theme.palette.primary.main,
          mb: isMobile ? 2 : 1,
        }}
      >
        <Box
          component="img"
          src={task}
          alt="Task Icon"
          height={isMobile ? 20 : 22}
          width={isMobile ? 24 : 28}
          mr={1}
        />
        <Typography fontSize={isMobile ? "22px" : "inherit"}>
          TaskBuddy
        </Typography>
      </Box>

      <Typography
        sx={{
          maxWidth: isMobile ? "90%" : "295px",
          fontFamily: "Urbanist",
          fontWeight: 500,
          fontSize: isMobile ? "10.5px" : "11.64px",
          lineHeight: "140%",
          mb: isMobile ? 2 : 3,
          p: isMobile ? 0 : 1,
        }}
      >
        Streamline your workflow and track progress effortlessly with our
        all-in-one task management app.
      </Typography>

      <AuthButton handleGoogleLogin={handleGoogleLogin} />
    </Box>
  );

  return (
    <Box
      sx={{
        textAlign: "center",
        // p: isMobile ? 2 : 5,
        maxHeight: "814px",
        position: "relative",
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderContent()}
          <RingsContainer position="absolute" top="50px" left="-140px" />
          <RingsContainer position="absolute" top="-90px" right="-90px" />
          <RingsContainer position="relative" top="40px" />
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 8,
          }}
        >
          {renderContent()}

          <RingsContainer
            position="relative"
            ringSizes={["50vw", "40vw", "30vw"]}
            zIndex="-10"
          />
          <Box sx={{position: 'absolute', right: -700}}>
            <DashBoard home={true}  />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
