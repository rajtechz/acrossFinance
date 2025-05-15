// hooks/BankRejectHook.js
import { useEffect, useState } from "react";
import { baseURLProd } from "api/api";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
const BankRejectHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [openBox, setOpenBox] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURLProd}GetFinanceReviewBatches`);
        const result = await response.json();
        console.log("this is result ", result.dataItems);
        setData(result.dataItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    navigate("/allDetails");
    // setSelectedRow(row);
    // setOpenBox(true);
  };

  const handleOpenDialog = () => setOpenBox(true);
  const handleCloseDialog = () => {
    setOpenBox(false);
    setInvoiceFile(null);
    setSelectedRow(null);
  };
  const handleUploadUtr = () => {
    setOpenBox((prev) => !prev);
  };

  return {
    data,
    loading,
    selectedRow,
    invoiceFile,
    openBox,
    setInvoiceFile,
    handleRowClick,
    handleCloseDialog,
    setSelectedRow,
    setOpenBox,
    handleUploadUtr,
    handleOpenDialog,
  };
};

export default BankRejectHook;
