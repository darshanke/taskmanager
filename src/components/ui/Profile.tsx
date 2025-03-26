import { Box } from '@mui/material';



const Profile = ({profileImage}: {profileImage:string}) => {
  return (
    <Box sx={{
        
        width: 36,
        height: 36,
        border: "0.4px solid rgba(0, 0, 0, 0.2)", 
        borderRadius: '50%', 
       

    }}  component="img" src={profileImage} alt="profileImage" />

   
  )
}

export default Profile;