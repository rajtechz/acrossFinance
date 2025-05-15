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

const PartialPayment = {
  id: "ReviewBatches",
  type: "group",
  children: [
    {
      id: "PartialPayment",
      title: "Partial Payment",
      type: "item",
      url: "/partialPayment",
      icon: icons.DashboardOutlinedIcon,
    //   breadcrumbs: false
    },
  ],
};

export default PartialPayment;
