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

const PaymentHold = {
  id: "ReviewBatches",
  type: "group",
  children: [
    {
      id: "PaymentHold",
      title: "Payment Hold",
      type: "item",
      url: "/paymentHold",
      icon: icons.DashboardOutlinedIcon,
    //   breadcrumbs: false
    },
  ],
};

export default PaymentHold;
