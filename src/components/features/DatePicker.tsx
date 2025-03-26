import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dayjs } from "dayjs";

// Force light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

type DatePickerProps = {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
};

export default function BasicDatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
  
          value={selectedDate}
          onChange={onDateChange}
          slotProps={{ textField: {
            sx: {
              backgroundColor: "#fff",
              color: "#000",
              "& .MuiInputBase-root": {
                height: "32px", // Adjust height here
              },
              "& input": {
                height: "40px",
                padding: "8px",
              },
            },
           } }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
