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

const ReviewBatches = {
  id: "ReviewBatches",
  type: "group",
  children: [
    {
      id: "ReviewBatches",
      title: "New  Batches",
      type: "item",
      url: "/reviewBatches",
      icon: icons.DashboardOutlinedIcon,
      // breadcrumbs: false
    },
    
  ],
};

export default ReviewBatches;
