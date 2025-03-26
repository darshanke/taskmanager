import { createTheme } from "@mui/material/styles";


export const colors = {
  primary: "#7B1984",
  secondary: "#6c757d",
  background: "#f8f9fa",
  darkBackground: "#1a1a1a",
  text: "#212529",
  darkText: "#ffffff",
  signInBackground: "#292929",
  signInText: "#FFFFFF",
  signtext: '#000000',
  taskView : '#2F2F2F', 
  taskHeadingbg: "#FAEEFC" , 
  logoutButton: "#7B198426", 
  todo: '#FAC3FF', 
  inprogress: '#85D9F1', 
  done: '#CEFFCC', 


};


declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      signInBackground: string;
      signInText: string;
      signtext: string;
      taskView: string;
      taskHeadingbg: string, 
      logoutButton: string, 
      TODO:string, 
      INPROGRESS: string, 
      DONE: string, 
    };
  }
  interface PaletteOptions {
    custom?: {
      signInBackground: string;
      signInText: string;
      signtext: string;
      taskView: string;
      taskHeadingbg: string,
      logoutButton:string, 
      TODO:string, 
      INPROGRESS: string, 
      DONE: string, 
    };
  }
}


export const materialTheme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: {
      default: colors.background,
      paper: colors.darkBackground,
    },
    text: {
      primary: colors.text,
      secondary: colors.darkText,
    },
    custom: { 
      signInBackground: colors.signInBackground,
      signInText: colors.signInText,
      signtext: colors.signtext, 
      taskView: colors.taskView, 
      taskHeadingbg: colors.taskHeadingbg, 
      logoutButton: colors.logoutButton, 
      TODO:colors.todo, 
      INPROGRESS: colors.inprogress, 
      DONE: colors.done, 
    },
  },
});

export default materialTheme;
