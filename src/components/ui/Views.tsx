import React, { useState  } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Group from "./assets/Group.svg"
import List from "./assets/list_icon.svg"

type TabItem = {
  name: string;
  icon: string;
};

const tabData: TabItem[] = [
  { name: "List", icon: List},
  { name: "Board", icon: Group },
];
interface ChildComponentProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
  view?: string;
}
const Views: React.FC<ChildComponentProps> = ({ setView , view } ) => {
  const [selectedTab, setSelectedTab] = useState(0);
const changeView = (newValue:number)=>{
  console.log(newValue);
  setSelectedTab(newValue);
  setView(newValue==0?"list":"board")
}
console.log(view);
  return (
    <Tabs
      value={selectedTab}
      onChange={(_, newValue:number) => changeView(newValue)}
      sx={{ minHeight: 40, borderBottom: "1px solid #ccc" }} 
    >
      {tabData.map((tab, index) => (
        <Tab
          key={tab.name}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={tab.icon} alt={tab.name} width={20} height={20} />
              {tab.name}
            </Box>
          }
          sx={{
            fontWeight: selectedTab === index ? "bold" : "normal",
            color: selectedTab === index ? "black" : "gray",
            textTransform: "none",
          }}
        />
      ))}
    </Tabs>
  );
};

export default Views;
