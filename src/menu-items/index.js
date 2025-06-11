import policy from "./policies";
import travel from "./Travel";
import createAgent from "./Subagent";
import privacypolicy from "./PrivacyPolicy";
import TermsCondition from "./Terms_condition";
import assignrole from "./Assignrole";
import createInsurer from "./createInsurer";
import ReviewBatches from "./ReviewBatches";
import VendorList from "./VendorList";

import ValidateCases from "./ValidateCases";
import PaymentScheduled from "./PaymentScheduled";
import RejectedCases from "./RejectedCases";
import QueryCases from "./QueryCases";
import PartialPayment from "./PartialPayment";
import FullPayment from "./FullPayment";
import BankReject from "./BankReject";
import PaymentHistory from "./PaymentHistory";
import holdCases from "./HoldCases";
const getRoleFromStorage = () => {
  return localStorage.getItem("ROLE");
};

const useMenuItems = () => {
  const role = getRoleFromStorage();

  let menuItems;

  if (role === "Agent") {
    menuItems = {
      items: [
        // ReviewBatches,
        // ValidateCases
        // travel, policy,privacypolicy,TermsCondition
      ],
    };
  } else if (role === "Sub Agent") {
    menuItems = {
      items: [
        // ReviewBatches,
        // ValidateCases
        //  travel, policy ,createAgent,createInsurer,assignrole,
        // privacypolicy,TermsCondition
      ],
    };
  } else {
    menuItems = {
      items: [
        ReviewBatches,
        ValidateCases,
        RejectedCases,
        QueryCases,
        holdCases,
        PaymentScheduled,
        PartialPayment,
        FullPayment,
        BankReject,
        PaymentHistory,
        //  VendorList,
        // travel, policy,privacypolicy,TermsCondition,
      ],
    };
  }
  return menuItems;
};
export default useMenuItems;
