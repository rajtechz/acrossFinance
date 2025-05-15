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

const FullPayment = {
  id: "ReviewBatches",
  type: "group",
  children: [
    {
      id: "FullPayment",
      title: "Full Payment",
      type: "item",
      url: "/FullPayment",
      icon: icons.DashboardOutlinedIcon,
    //   breadcrumbs: false
    },
  ],
};

export default FullPayment;
