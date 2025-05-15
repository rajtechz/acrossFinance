import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ClaimStatusHook = () => {
    const location = useLocation();
    const { rowDetails } = location.state || {};
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedSubStatus, setSelectedSubStatus] = useState("");

    // Lists for Cashless and Reimbursement status
    const cashlessStatusList = [
        "Case Registered", "Awaiting ROI", "Awaiting Medical Record",
        "Awaiting Approval from Insurer", "Awaiting Past medical history",
        "Awaiting Additional Medical Records", "Awaiting Final invoice",
        "Under Investigation", "Awaiting Proposal Form",
        "Awaiting Approval on Final amount", "GOP Placed",
        "Awaiting Debit note from Local partner",
        "Send Debit Note of Approved Amount / Invoice to SBI",
        "SBI verify the debit note", "Awaiting Funds from SBI",
        "Awaiting Payment to Local partner", "Awaiting proof of payment from Local Partner",
        "Send proof of payment with SBI", "Paid and Closed", "Repudiation Initiated",
        "Repudiated", "Closed - Under Deficiency"
    ];

    const reimbursementStatusList = [
        "Case Registered", "NOC Reminder", "NOC Final Reminder",
        "Closed - Under NOC", "Documents Received",
        "Initial Deficiency Letter", "First Deficiency Letter",
        "Second Deficiency Letter", "Closed - Under Deficiency",
        "Awaiting Additional Documents", "Awaiting Passport copy",
        "Awaiting Cancelled Cheque", "Awaiting Approval from SBI",
        "Awaiting Repudiation Letter", "Under Investigation With SBI",
        "Awaiting Proposal form", "Awaiting CKYC Form",
        "Awaiting funds from SBI", "Paid and Closed", "Repudiated",
        "Claim Withdrawn", "Re-open"
    ];

    useEffect(() => {
        if (rowDetails.incidentType === "CA") {
            setStatusOptions(cashlessStatusList);
        } else if (rowDetails.incidentType === "RI") {
            setStatusOptions(reimbursementStatusList);
        }
    }, [rowDetails.incidentType]); 

    const handleSubStatusChange = (event) => {
        setSelectedSubStatus(event.target.value);
      };
    return {
        selectedSubStatus,handleSubStatusChange,statusOptions
    }
}

export default ClaimStatusHook
