// assets
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
// icons
const icons = {
  SafetyCheckIcon,
  DashboardOutlinedIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const RejectedCases = {
  id: "RejectedCases",
  type: "group",
  children: [
    {
      id: "RejectedCases",
      title: "Rejected Cases",
      type: "item",
      url: "/rejectedCases",
      icon: icons.DashboardOutlinedIcon,
      // breadcrumbs: false
    },
    
  ],
};

export default RejectedCases;
