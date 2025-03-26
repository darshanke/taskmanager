import Button from "@mui/material/Button";
import { useTheme, Theme } from "@mui/material/styles";

type handleSignIn = {
  handleGoogleLogin: () => Promise<void>;
};
const AuthButton = ({ handleGoogleLogin }: handleSignIn) => {
  const theme = useTheme() as Theme;

  const buttonStyles = {
    minWidth: "259px",
    maxWidth: "363px", 
    backgroundColor: theme.palette?.custom?.signInBackground,
    color: theme.palette?.custom?.signInText,
    borderRadius: "18.91px",
    fontFamily: "Urbanist",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "140%",
  };

  return (
    <Button onClick={handleGoogleLogin} sx={buttonStyles}>
      Continue with Google
    </Button>
  );
};

export default AuthButton;
