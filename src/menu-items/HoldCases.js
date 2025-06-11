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

const holdCases = {
  id: "holdCases",
  type: "group",
  children: [
    {
      id: "holdCases",
      title: " Hold Cases",
      type: "item",
      url: "/holdCases",
      icon: icons.DashboardOutlinedIcon,
    //   breadcrumbs: false
    },
  ],
};

export default holdCases;
