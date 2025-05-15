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

const QueryCases = {
  id: "QueryCases",
  type: "group",
  children: [
    {
      id: "QueryCases",
      title: "Query Cases",
      type: "item",
      url: "/queryCases",
      icon: icons.DashboardOutlinedIcon,
      // breadcrumbs: false
    },
    
  ],
};

export default QueryCases;
