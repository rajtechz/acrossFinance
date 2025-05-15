import { useEffect, useState } from "react";
import { baseURLProd } from "api/api";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
const ValidateCasesHook = () => {
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
        // const response = await fetch(`${baseURLProd}GetValidateCasesFinance`);
        const response = await fetch(
          `${baseURLProd}GetValidateBatchDataFinance`
        );
        const result = await response.json();
        console.log("this is result ", result);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    setOpenBox(true);
    setSelectedRow(row);
    // navigate("/allDetails", {
    //   state: { aaNumber: row.aA_Number },
    // });
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

export default ValidateCasesHook;
