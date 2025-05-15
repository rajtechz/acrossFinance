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

const PaymentHistory = {
  id: "PaymentHistory",
  type: "group",
  children: [
    {
      id: "PaymentHistory",
      title: "Payment History",
      type: "item",
      url: "/paymentHistory",
      icon: icons.DashboardOutlinedIcon,
    //   breadcrumbs: false
    },
  ],
};

export default PaymentHistory;
