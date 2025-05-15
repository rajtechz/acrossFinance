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

const PaymentScheduled = {
  id: "PaymentScheduled",
  type: "group",
  children: [
    {
      id: "PaymentScheduled",
      title: "Payment Scheduled",
      type: "item",
      url: "/paymentScheduled",
      icon: icons.DashboardOutlinedIcon,
      // breadcrumbs: false
    },
    
  ],
};

export default PaymentScheduled;
