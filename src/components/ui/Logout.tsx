import { useTheme, Theme } from "@mui/material/styles";
import { Button } from '@mui/material'
import logout from './assets/logout_icon.svg'
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const theme = useTheme<Theme>();
    const navigate = useNavigate();

    const logOut =()=>{
      navigate("/");
    }
  
  return (
    <Button  
    startIcon={<img src={logout} alt="Logout Icon" width={20} height={20} />}
    sx={{
        backgroundColor: `${theme?.palette?.custom?.logoutButton}`, 
        color: '#000000', 
        height: '40px', 
        borderRadius: '12px', 
        marginRight: '2.5rem', 

    }} onClick={logOut} >
      Logout
    </Button>
  )
}

export default Logout