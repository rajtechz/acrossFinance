import MainLayout from "layout/MainLayout";
import Login from "pages/authentication/Login";
import AllDetails from "pages/extra-pages/travel/AllDetails";
import BankReject from "pages/extra-pages/travel/BankReject";
import ClaimDetailpage from "pages/extra-pages/travel/claimdetailpage";
import DashboardAdmin from "pages/extra-pages/travel/DashboardAdmin";
import FinalPayment from "pages/extra-pages/travel/FinalPayment";
import FullPayment from "pages/extra-pages/travel/FullPayment";
import HoldCases from "pages/extra-pages/travel/HoldCases";
import PartialPayment from "pages/extra-pages/travel/PartialPayment";
import PaymentHistory from "pages/extra-pages/travel/PaymentHistory";
import PaymentScheduled from "pages/extra-pages/travel/PaymentScheduled";
import QueryCases from "pages/extra-pages/travel/QueryCases";
import RejectedCases from "pages/extra-pages/travel/RejectedCases";
import ReviewBatch from "pages/extra-pages/travel/ReviewBatch";
import Traveldetail from "pages/extra-pages/travel/Traveldetail";
import ValidateCases from "pages/extra-pages/travel/ValidateCases";
import VendorList from "pages/extra-pages/travel/VendorList";
const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Login />,
    },
    // {
    //   path: 'vendorList',
    //   element: <Traveldetail />
    // },
    {
      path: "vendorList",
      element: <VendorList />,
    },
    {
      path: "reviewBatches",
      element: <ReviewBatch />,
    },
    {
      path: "holdCases",
      element: <HoldCases />,
    },
    {
      path: "paymentScheduled",
      element: <PaymentScheduled />,
    },
    {
      path: "partialPayment",
      element: <PartialPayment />,
    },
    {
      path: "fullPayment",
      element: <FullPayment />,
    },
    {
      path: "/finalPayment",
      element: <FinalPayment />,
    },
    {
      path: "bankReject",
      element: <BankReject />,
    },
    {
      path: "paymentHistory",
      element: <PaymentHistory />,
    },
    {
      path: "validateCases",
      element: <ValidateCases />,
    },
    {
      path: "rejectedCases",
      element: <RejectedCases />,
    },
    {
      path: "queryCases",
      element: <QueryCases />,
    },
    {
      path: "/allDetails",
      element: <AllDetails />,
    },
    {
      path: "dashboard",
      element: <DashboardAdmin />,
    },
    {
      path: "claimdetail/:srnNo",
      element: <ClaimDetailpage />,
    },
  ],
};

export default MainRoutes;
