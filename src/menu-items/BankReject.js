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


const BankReject = {
  id: "BankReject",
  type: "group",
  children: [
    {
      id: "BankReject",
      title: "Bank Reject",
      type: "item",
      url: "/bankReject",
      icon: icons.DashboardOutlinedIcon,
    //   breadcrumbs: false
    },
  ],
};


export default BankReject;
