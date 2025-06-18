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

const GSTHoldCases = {
  id: "GSTHoldCases",
  type: "group",
  children: [
    {
      id: "GSTHoldCases",
      title: "GST Hold Cases",
      type: "item",
      url: "/GSTHoldCases",
      icon: icons.DashboardOutlinedIcon,
      // breadcrumbs: false
    },
    
  ],
};

export default GSTHoldCases;
