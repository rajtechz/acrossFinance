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

const ValidateCases = {
  id: "ReviewBatches",
  type: "group",
  children: [
    {
      id: "validateCases",
      title: "Validated Cases",
      type: "item",
      url: "/validateCases",
      icon: icons.DashboardOutlinedIcon,
      //   breadcrumbs: false
    },
    
  ],
};

export default ValidateCases;
