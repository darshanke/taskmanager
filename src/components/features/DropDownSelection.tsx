import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type BasicSelectProps = {
  selectedStatus: "TODO" | "INCOMPLETE" | "COMPLETED" | null;
  onStatusChange: (status: "TODO" | "INCOMPLETE" | "COMPLETED") => void;
};

export default function BasicSelect({
  selectedStatus,
  onStatusChange,
}: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onStatusChange(event.target.value as "TODO" | "INCOMPLETE" | "COMPLETED");
  };

  return (
    <Box sx={{ width: 200  , height: 32}}>
      <FormControl fullWidth>
        <Select
          id="status-select"
          value={selectedStatus || ""}
          onChange={handleChange}
          displayEmpty
          sx={{
            backgroundColor: "#fff", 
            color: "#000", 
            height: '32px', 
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9c27b0",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#fff", // White dropdown background
                color: "#000", // Black text
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ color: "#777" }}>
            Choose Status
          </MenuItem>
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="INCOMPLETE">INCOMPLETE</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
