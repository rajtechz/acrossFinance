import React, { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DataTable from "react-data-table-component";
import ReviewBatchHook from "./ReviewBatchHook";
import InputAdornment from "@mui/material/InputAdornment";
import { baseURLProd } from "api/api";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FormControlLabel, InputLabel } from "@mui/material";
import pdf3 from "../../../assets/images/users/pdf3.png";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const ReviewBatch = () => {
  const navigate = useNavigate();
  // State variables
  const [financeStatus, setFinanceStatus] = useState("");
  const [status, setStatus] = useState("");
  const [hovered, setHovered] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [issue, setIssue] = useState("");
  const [pdfFileUpload, setPDF_FileUpload] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedViewRow, setSelectedViewRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [apiData, setApiData] = useState([]);
  const [mismatchData, setMismatchData] = useState({});

  const {
    data,
    setData,
    loading,
    setLoading,
    selectedRow,
    invoiceFile,
    openBox,
    setSelectedRow,
    setOpenBox,
    setInvoiceFile,
    handleCloseDialog,
    handleUploadUtr,
    handleOpenDialog,
  } = ReviewBatchHook();

  const handleRowClick = (row, action = "view") => {
    console.log("onclick eye button service charge", row.serviceCharges);
    console.log("onclick eye button repair charge", row.repairCharges);
    console.log("onclick eye button aaNo", row.aaNo);
    console.log("onclick eye button selling partner", row.sellingPartner);

    if (action === "view") {
      setSelectedViewRow(row);
      setViewModalOpen(true);
    } else {
      setSelectedRow(row);
      setOpenBox(true);
    }

    if (!row) return;

    setLoading(true);

    fetch(`${baseURLProd}GetGadgetCaseDetailsByAA?aaNumbers=${row.aaNo}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const items = data.dataItems || [];
        console.log("apiData", items);

        // Parse row data
        const rowServiceCharges = row.serviceCharges
          ?.split(",")
          .map((val) => parseFloat(val.trim()));
        const rowRepairCharges = row.repairCharges
          ?.split(",")
          .map((val) => parseFloat(val.trim()));
        const rowAANumbers = row.aaNo?.split(",").map((val) => val.trim());
        // Split sellingPartner into an array
        const rowSellingPartners =
          row.sellingPartner
            ?.split(",")
            .map((val) => val.trim().toLowerCase()) || [];

        const mismatches = {};

        items.forEach((item, index) => {
          const apiServiceCharge = parseFloat(item.serviceCharges);
          const apiRepairCharge = parseFloat(item.repairCharges);
          const apiAANumber = item.aA_Number?.trim();
          const apiSellingPartner = item.sellingPartner?.trim().toLowerCase();

          mismatches[index] = {
            serviceMismatch: !rowServiceCharges?.some(
              (val) => Math.abs(val - apiServiceCharge) < 0.01
            ),
            repairMismatch: !rowRepairCharges?.some(
              (val) => Math.abs(val - apiRepairCharge) < 0.01
            ),
            aaMismatch: !rowAANumbers?.includes(apiAANumber),
            sellingPartnerMismatch:
              rowSellingPartners[index] !== apiSellingPartner,
            rowData: {
              serviceCharge: rowServiceCharges ? rowServiceCharges[index] : "-",
              repairCharge: rowRepairCharges ? rowRepairCharges[index] : "-",
              aaNumber: rowAANumbers ? rowAANumbers[index] : "-",
              sellingPartner: rowSellingPartners[index] || "-",
            },
            apiData: {
              serviceCharge: apiServiceCharge || "-",
              repairCharge: apiRepairCharge || "-",
              aaNumber: apiAANumber || "-",
              sellingPartner: apiSellingPartner || "-",
            },
          };

          // Log mismatches
          if (mismatches[index].serviceMismatch) {
            console.warn(`❌ Service Charges mismatch for item ${index + 1}`);
            console.log("API:", apiServiceCharge, "Row:", rowServiceCharges);
          } else {
            console.log(`✅ Service Charges matched for item ${index + 1}`);
          }

          if (mismatches[index].repairMismatch) {
            console.warn(`❌ Repair Charges mismatch for item ${index + 1}`);
            console.log("API:", apiRepairCharge, "Row:", rowRepairCharges);
          } else {
            console.log(`✅ Repair Charges matched for item ${index + 1}`);
          }

          if (mismatches[index].aaMismatch) {
            console.warn(`❌ AA Number mismatch for item ${index + 1}`);
            console.log("API:", apiAANumber, "Row:", rowAANumbers);
          } else {
            console.log(`✅ AA Number matched for item ${index + 1}`);
          }

          if (mismatches[index].sellingPartnerMismatch) {
            console.warn(`❌ Selling Partner mismatch for item ${index + 1}`);
            console.log(
              "API:",
              apiSellingPartner,
              "Row:",
              rowSellingPartners[index]
            );
          } else {
            console.log(`✅ Selling Partner matched for item ${index + 1}`);
          }
        });

        setApiData(items);
        setMismatchData(mismatches);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
        setApiData([]);
        setMismatchData({});
      })
      .finally(() => setLoading(false));
  };

  
  const getColorStyles = (status) => {
    switch (status) {
      case "Approved":
        return {
          borderColor: "#34c759",
          color: "#34c759",
          backgroundColor: "#eafff1",
        };
      case "Partial Approved":
        return {
          borderColor: "#f1c40f",
          color: "#f1c40f",
          backgroundColor: "#fff9e6",
        };
      case "Partial Finalized":
        return {
          borderColor: "#ff9500",
          color: "#ff9500",
          backgroundColor: "#fff4e6",
        };
      case "Batch Created":
        return {
          borderColor: "#3498db",
          color: "#3498db",
          backgroundColor: "#eaf6ff",
        };
      case "Invoice Uploaded":
        return {
          borderColor: "#9b59b6",
          color: "#9b59b6",
          backgroundColor: "#f5ebff",
        };
      case "Validated":
        return {
          borderColor: "#28a745",
          color: "#28a745",
          backgroundColor: "#e6f4ea",
        };
      case "Query":
        return {
          borderColor: "#fd7e14",
          color: "#fd7e14",
          backgroundColor: "#fff3e6",
        };
      case "Hold":
        return {
          borderColor: "#6c757d",
          color: "#6c757d",
          backgroundColor: "#f2f2f2",
        };
      case "Rejected":
        return {
          borderColor: "#dc3545",
          color: "#dc3545",
          backgroundColor: "#f8d7da",
        };
      default:
        return {
          borderColor: "#ccc",
          color: "#333",
          backgroundColor: "#f9f9f9",
        };
    }
  };

  const safeNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const handleValidate = async (rowData) => {
    console.log("Validating row data service:", rowData.serviceCharges);
    console.log("Validating row data repare:", rowData.repairCharges);
    try {
      const formData = new FormData();
      formData.append("AANo", rowData?.aaNo || "");
      formData.append("IMEINo", rowData?.imeiNo || "");
      formData.append("CreationDate", rowData?.creationDate || "");
      formData.append("ClosureDate", rowData?.closureDate || "");
      formData.append("CustomerName", rowData?.customerName || "");
      formData.append("ServiceType", rowData?.serviceType || "");
      formData.append("Brand", rowData?.brand || "");
      formData.append("MakeModel", rowData?.makeModel || "");
      formData.append("BatchNo", rowData?.batchNo || "");
      formData.append("VendorName", rowData?.vendorName || "");
      // formData.append("Total", rowData?.total || "");
      formData.append("CaseCount", rowData?.caseCount || "");
      formData.append("InvoiceNo", rowData?.invoiceNo || "");
      formData.append("InvoiceDate", rowData?.invoiceDate || "");
      formData.append("InvoiceStatus", rowData?.invoiceStatus || "");
      formData.append("SelectedService", rowData?.selectedService || "");
      formData.append("Reimbursment", rowData?.reimbursement || "");
      formData.append("Expense", rowData?.expense || "");
      formData.append("Invoice", rowData?.invoice || "");
      formData.append("FinanceStatus", rowData?.financeStatus || "");
      formData.append("GrossAmount", rowData?.grossAmount || "");
      formData.append("SellingPartner", rowData?.sellingPartner || "");
      formData.append("RepairCharges", rowData?.repairCharges || "");
      formData.append("ServiceCharges", rowData?.serviceCharges || "");
      formData.append("GST", safeNumber(rowData?.gst));
      formData.append("TDS", safeNumber(rowData?.tds));
      formData.append("FinalAmount", safeNumber(rowData?.finalAmount));
      formData.append("InvoiceAmount", safeNumber(rowData?.invoiceAmount));
      formData.append(
        "TotalRepairCharges",
        safeNumber(rowData?.totalRepairCharges)
      );
      formData.append(
        "TotalServiceCharges",
        safeNumber(rowData?.totalServiceCharges)
      );
      formData.append("ChargesInclGST", safeNumber(rowData?.chargesInclGST));

      const cleanedRemarks = (rowData?.remarks || "")
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r)
        .join(", ");
      formData.append("Remarks", cleanedRemarks || "");

      const response = await fetch(`${baseURLProd}InsertValidateFinanceData`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Validation failed");
      return await response.json();
    } catch (error) {
      console.error("Error in handleValidate:", error);
      throw error;
    }
  };

  const handleSubmit = async (rowData, dialogData = {}) => {
    try {

      const formData = new FormData();
      formData.append("BatchNo", rowData?.batchNo || "");
      formData.append("AANo", rowData?.aaNo || "");
      formData.append("VendorName", rowData?.vendorName || "");
      formData.append("ApprovalDate", rowData?.creationDate || "");
      formData.append("InvoiceNo", rowData?.invoiceNo || "");
      // formData.append("InvoiceAmount", rowData?.invoiceAmount || 0);
      formData.append(
        "FinanceStatus",
        financeStatus || rowData?.FinanceStatus || ""
      );
      formData.append("CaseCount", rowData?.caseCount || 0);
      formData.append("InvoiceDate", rowData?.invoiceDate || "");

      formData.append("Invoice", rowData?.invoice || "");
      formData.append("InvoiceStatus", rowData?.invoiceStatus || "");
      formData.append("Date", date || new Date().toISOString().split("T")[0]);
      formData.append("Time", time || new Date().toTimeString().split(" ")[0]);
      formData.append("Status", financeStatus || rowData?.financeStatus || "");
      formData.append("Issue", dialogData?.Issue || remarks || "");
      formData.append("CustomerName", rowData?.customerName || "");
      formData.append("IMEINo", rowData?.imeiNo || "");
      formData.append("ServiceType", rowData?.serviceType || "");
      formData.append("Brand", rowData?.brand || "");
      formData.append("MakeModel", rowData?.makeModel || "");
     
      formData.append("ChargesInclGST", rowData?.chargesInclGST || "");
      formData.append("GrossAmount", rowData?.grossAmount || "");
      formData.append("Total", rowData?.total || "");
      formData.append("SelectedService", rowData?.selectedService || "");
      formData.append("SellingPartner", rowData?.sellingPartner || "");

      formData.append("RepairCharges", rowData?.repairCharges || "");
      formData.append("ServiceCharges", rowData?.serviceCharges || "");
      // Updated payload to handle safe numbers

      formData.append("GST", safeNumber(rowData?.gst));
      formData.append("TDS", safeNumber(rowData?.tds));
      formData.append("FinalAmount", safeNumber(rowData?.finalAmount));
      formData.append("InvoiceAmount", safeNumber(rowData?.invoiceAmount));
      formData.append("Expense", safeNumber(rowData?.expense));
      formData.append("Reimbursement", safeNumber(rowData?.reimbursement));
      formData.append(
        "TotalRepairCharges",
        safeNumber(rowData?.totalRepairCharges)
      );
      formData.append(
        "TotalServiceCharges",
        safeNumber(rowData?.totalServiceCharges)
      );

      if (dialogData?.PDF_FileUpload) {
        formData.append("PDF_FileUpload", dialogData.PDF_FileUpload);
      } else if (pdfFile) {
        formData.append("PDF_FileUpload", pdfFile);
      }

      const endpoint =
        financeStatus === "Validated"
          ? `${baseURLProd}InsertValidateFinanceData`
          : `${baseURLProd}UpdateFinanceStatus`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      toast.success("Finance status updated successfully!");
      handleCloseDialog();
      return result;
    } catch (err) {
      console.error("❌ Submission failed:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
      throw err;
    }
  };

  const handleDialogSubmit = async () => {
    if (!category) {
      setCategoryError(true);
      toast.error("Please select a Remarks Category.");
      return;
    }

    try {
      await handleSubmit(selectedRow, {
        Issue: issue,
        PDF_FileUpload: pdfFileUpload,
      });
      setOpenBox(false);
      setCategoryError(false);
      setCategory("");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const columns = [
    {
      name: "View",
      selector: (row) => row.view,
      cell: (row) => (
        <span
          onClick={() => handleRowClick(row, "view")}
          style={{ cursor: "pointer" }}
        >
          <RemoveRedEyeIcon style={{ color: "#7E00D1" }} />
        </span>
      ),
    },
    {
      name: "Batch No",
      selector: (row) => row.batchNo,
      cell: (row) => (
        <span
          style={{
            backgroundColor:
              row.remarks && row.remarks !== "--" ? "#fff9e6" : "#e6f4ea", // Yellow if remarks exist, green if no remarks
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.batchNo}
        </span>
      ),
    },
    {
      name: "Vendor Name",
      selector: (row) => row.vendorName || "--",
      width: "150px",
    },
    {
      name: "Case Count",
      selector: (row) => row.caseCount || "--",
      width: "130px",
    },
    {
      name: "Invoice No",
      selector: (row) => row.invoiceNo || "--",
      width: "150px",
    },
    {
      name: "Invoice Date",
      selector: (row) => row.invoiceDate || "--",
      width: "150px",
    },
    {
      name: "Invoice Amount",
      selector: (row) => row.invoiceAmount || "--",
      width: "150px",
    },
    {
      name: "Total Repair Charges",
      selector: (row) => row.totalRepairCharges || "--",
      width: "200px",
    },
    {
      name: "Total Service Charges",
      selector: (row) => row.totalServiceCharges || "--",
      width: "200px",
    },
    { name: "GST", selector: (row) => `${row.gst}%` || "--", width: "150px" },
    { name: "TDS", selector: (row) => `${row.tds}%` || "--", width: "150px" },
    {
      name: "Final Amount",
      selector: (row) => row.finalAmount,
      width: "150px",
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks || ",",
      width: "200px",
    },
    {
      name: "Invoice",
      selector: (row) => row.invoice,
      cell: (row) => (
        <a href={row.invoice} target="_blank" rel="noopener noreferrer">
          <img src={pdf3} alt="PDF" style={{ width: "24px", height: "24px" }} />
        </a>
      ),
      width: "150px",
    },
    {
      name: "Invoice Status",
      cell: (row) => {
        const styles = getColorStyles(row.status || "Approved");
        return (
          <span
            style={{
              ...styles,
              padding: "4px 12px",
              border: "2px solid",
              borderRadius: "999px",
              fontWeight: 500,
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            {row.invoiceStatus || "--"}
          </span>
        );
      },
      width: "180px",
    },
    {
      name: "Finance Status",
      cell: (row, index) => {
        const currentStatus = row.financeStatus;
        const styles = getColorStyles(currentStatus);
        return (
          <>
            <select
              style={{
                padding: "6px 10px",
                borderRadius: "30px",
                border: `1px solid ${styles.borderColor}`,
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                width: "140px",
                cursor: "pointer",
              }}
              value={currentStatus}
              onChange={async (e) => {
                const selected = e?.target?.value;
                row.financeStatus = selected;
                setSelectedRow(row);
                setFinanceStatus(selected);

                if (selected === "Validated") {
                  console.log("Validating row:", row);
                  if (!row.aaNo) {
                    alert("AA Number is missing, cannot validate.");
                    return;
                  }
                  try {
                    await handleValidate(row);
                    handleSubmit(row, {});
                  } catch (error) {
                    console.error("Validation error:", error);
                  }
                } else if (["Rejected", "Query", "Hold"].includes(selected)) {
                  setOpenBox(true);
                } else {
                  handleSubmit(row, {});
                }
              }}
            >
              <option value={row.financeStatus || ""}>
                {row.financeStatus || "Select"}
              </option>
              <option value="Validated">Validated</option>
              <option value="Rejected">Rejected</option>
              <option value="Query">Query</option>
              <option value="Hold">Hold</option>
            </select>

            {openBox && (
              <Dialog onClose={() => setOpenBox(false)}>
                <DialogTitle>Enter Details</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Issue"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setIssue(e.target.value)}
                  />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPDF_FileUpload(e.target.files[0])}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenBox(false)}>Cancel</Button>
                  <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
              </Dialog>
            )}
          </>
        );
      },
      width: "180px",
    },
  ];
  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
    status: "",
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    const filtered = data.filter((item) => {
      const vendorMatch =
        item.vendorName
          ?.toLowerCase()
          .includes(filters.vendorName.toLowerCase()) ?? true;
      const invoiceMatch = (item.invoiceNumber || "")
        .toLowerCase()
        .includes(filters.invoiceNo.toLowerCase());
      const batchMatch = (item.batchNo || "")
        .toLowerCase()
        .includes(filters.batchNo.toLowerCase());
      let dateMatch = true;
      if (filters.filterDate) {
        try {
          const itemDate = dayjs(item.approvalDate);
          const filterDate = dayjs(filters.filterDate);
          dateMatch = itemDate.isSame(filterDate, "day");
        } catch (e) {
          console.error("Date parsing error:", e);
        }
      }
      const statusMatch =
        !filters.status ||
        item.financeStatus?.toLowerCase() === filters.status.toLowerCase();

      return (
        vendorMatch && invoiceMatch && batchMatch && dateMatch && statusMatch
      );
    });

    setFilteredData(filtered);
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFilters((prev) => ({
      ...prev,
      filterDate: date,
    }));
  };
  // Existing arrays
  const customerNames =
    selectedViewRow?.customerName
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const aaNos =
    selectedViewRow?.aaNo
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const imeis =
    selectedViewRow?.imeiNo
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const serviceTypes =
    selectedViewRow?.serviceType
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const brands =
    selectedViewRow?.brand
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const models =
    selectedViewRow?.makeModel
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const repairs =
    selectedViewRow?.repairCharges
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const serviceCharges =
    selectedViewRow?.serviceCharges
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const gstCharges =
    selectedViewRow?.chargesInclGST
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const grossAmounts =
    selectedViewRow?.total
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const sellingPartners =
    selectedViewRow?.sellingPartner
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];

  // Add remarks array
  const remarksArray =
    selectedViewRow?.remarks
      ?.split(",")
      .map((item) =>
        item.trim() === "NULL" || item.trim() === "" ? "-" : item.trim()
      ) || [];

  // const maxLength = Math.max(
  //   customerNames.length,
  //   aaNos.length,
  //   imeis.length,
  //   serviceTypes.length,
  //   brands.length,
  //   models.length,
  //   repairs.length,
  //   serviceCharges.length,
  //   gstCharges.length,
  //   grossAmounts.length,
  //   sellingPartners.length // Add sellingPartners to maxLength calculation
  // );

  const maxLength = Math.max(
    customerNames.length,
    aaNos.length,
    imeis.length,
    serviceTypes.length,
    brands.length,
    models.length,
    repairs.length,
    serviceCharges.length,
    gstCharges.length,
    grossAmounts.length,
    sellingPartners.length,
    remarksArray.length // Add remarksArray to maxLength calculation
  );
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ToastContainer />
      <div className="container p-3 bg-white border rounded">
        <Box
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5 className="mb-0">Pending Validation</h5>
        </Box>

        <Grid mb={3} container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Vendor Name"
              name="vendorName"
              value={filters.vendorName}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Invoice No"
              name="invoiceNo"
              value={filters.invoiceNo}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Batch No"
              name="batchNo"
              value={filters.batchNo}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Filter by Date"
                value={filters.filterDate}
                onChange={handleDateChange}
                format="DD-MM-YYYY"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <DataTable
          columns={columns}
          data={filteredData || []}
          fixedHeader
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#EBF3FF",
              },
            },
            headCells: {
              style: {
                fontWeight: "bold",
              },
            },
          }}
        />

        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          >
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="3x"
              style={{ color: "#FE7C0B" }}
            />
          </div>
        )}
      </div>

      <Dialog
        open={openBox}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: 0,
            backgroundColor: "#D8E7FF",
          },
        }}
      >
        <DialogTitle
          disableTypography
          style={{
            padding: 0,
            margin: 0,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              backgroundColor: "#D8E7FF",
            }}
          >
            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Raise Remarks
            </div>
            <div
              style={{
                position: "absolute",
                right: "24px",
                fontSize: "12px",
                color: "#007bff",
              }}
            >
              For Assistance Call on: <strong>999999XXXX</strong>
            </div>
          </div>
        </DialogTitle>

        <DialogContent sx={{ padding: 0, backgroundColor: "#fff" }}>
          <div style={{ padding: "24px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <strong>
                  Vendor Name-{" "}
                  <span style={{ color: "green" }}>
                    {selectedRow?.vendorName}
                  </span>
                </strong>
                <span
                  style={{
                    background: "#F5F5F5",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    float: "right",
                  }}
                >
                  Batch No- <strong>{selectedRow?.batchNo}</strong>
                </span>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={categoryError}>
                  <InputLabel>Remarks Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setCategoryError(false); // Reset error when a value is selected
                    }}
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    <MenuItem value="Billing">Billing</MenuItem>
                    <MenuItem value="Technical">Technical</MenuItem>
                  </Select>
                  {categoryError && (
                    <Typography color="error" variant="caption">
                      Remarks Category is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter your remark"
                  variant="outlined"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    border: "2px dashed #ccc",
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "center",
                    color: "#888",
                    fontSize: "14px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("pdfUpload").click()}
                >
                  <FileUploadIcon
                    style={{ fontSize: "24px", marginBottom: "8px" }}
                  />
                  <br />
                  Drag and drop or{" "}
                  <span
                    style={{ color: "#5D5FEF", textDecoration: "underline" }}
                  >
                    browse
                  </span>{" "}
                  your files
                  <input
                    type="file"
                    id="pdfUpload"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type === "application/pdf") {
                        setPdfFile(file);
                      } else {
                        alert("Please select a valid PDF file.");
                      }
                    }}
                  />
                </div>

                {pdfFile && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    Selected file: <strong>{pdfFile.name}</strong>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            backgroundColor: "#fff",
            paddingBottom: "24px",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            style={{
              borderColor: "#7E00D1",
              backgroundColor: "#fff",
              color: "black",
              marginBottom: "16px",
              width: "20%",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogSubmit}
            variant="contained"
            style={{
              backgroundColor: "#7E00D1",
              color: "#fff",
              marginBottom: "16px",
              width: "20%",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selectedViewRow?.batchNo && `Batch No: ${selectedViewRow.batchNo}`}
          {selectedViewRow?.invoice ? (
            <a
              href={selectedViewRow.invoice}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              aria-label="Open Invoice PDF"
            >
              <PictureAsPdfIcon
                sx={{ color: "red", fontSize: "28px", cursor: "pointer" }}
              />
            </a>
          ) : (
            <span style={{ color: "gray", fontSize: "14px" }}>No Invoice</span>
          )}
        </DialogTitle>

        <DialogContent sx={{ position: "relative", paddingBottom: "80px" }}>
          <Box sx={{ overflowX: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: "#EBF3FF", whiteSpace: "nowrap" }}
                >
                  {[
                    "View",
                    "AA No",
                    "IMEI No",
                    "Creation Date",
                    "Closur Date",
                    "Customer Name",
                    "Service Type",
                    "Selling Partner",
                    "Brand",
                    "Model",
                    "Repair Charges",
                    "Service Charges",
                    "Total",
                    "Invoice Status",
                    "Mismatched Data",
                    "Remarks",
                    "Remark File",
                  ].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* <TableBody>
                {Array.from(
                  { length: rowsPerPage },
                  (_, i) => i + page * rowsPerPage
                )
                  .filter((i) => i < maxLength)
                  .map((index) => {
                    const mismatch = mismatchData[index] || {};
                    const isAAMismatch = mismatch.aaMismatch;
                    const isOtherMismatch =
                      mismatch.serviceMismatch ||
                      mismatch.repairMismatch ||
                      mismatch.sellingPartnerMismatch;
                    const allMatch =
                      !mismatch.aaMismatch &&
                      !mismatch.serviceMismatch &&
                      !mismatch.repairMismatch &&
                      !mismatch.sellingPartnerMismatch;

                    const rowStyle = isAAMismatch
                      ? { backgroundColor: "#f8d7da" } // Red for AA mismatch
                      : isOtherMismatch
                        ? { backgroundColor: "#fff9e6" } // Yellow for other mismatches
                        : { backgroundColor: "#e6f4ea" }; // Green for all matches

                    const mismatchDetails = [
                      {
                        field: "AA Number",
                        excel: mismatch.rowData?.aaNumber || "-",
                        system: mismatch.apiData?.aaNumber || "-",
                        hasMismatch: mismatch.aaMismatch,
                      },
                      {
                        field: "Service Charges",
                        excel: mismatch.rowData?.serviceCharge || "-",
                        system: mismatch.apiData?.serviceCharge || "-",
                        hasMismatch: mismatch.serviceMismatch,
                      },
                      {
                        field: "Repair Charges",
                        excel: mismatch.rowData?.repairCharge || "-",
                        system: mismatch.apiData?.repairCharge || "-",
                        hasMismatch: mismatch.repairMismatch,
                      },
                      {
                        field: "Selling Partner",
                        excel: mismatch.rowData?.sellingPartner || "-",
                        system: mismatch.apiData?.sellingPartner || "-",
                        hasMismatch: mismatch.sellingPartnerMismatch,
                      },
                    ].filter((detail) => detail.hasMismatch);

                    return (
                      <TableRow key={index} sx={rowStyle}>
                        <TableCell>
                          <RemoveRedEyeIcon
                            style={{ cursor: "pointer", color: "#7E00D1" }}
                            onClick={() =>
                              navigate("/allDetails", {
                                state: { aaNumber: aaNos[index] },
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>{aaNos[index] || "-"}</TableCell>
                        <TableCell>{imeis[index] || "-"}</TableCell>
                        <TableCell>
                          {selectedViewRow?.creationDate || "-"}
                        </TableCell>
                        <TableCell>
                          {selectedViewRow?.closureDate || "-"}
                        </TableCell>
                        <TableCell>{customerNames[index] || "-"}</TableCell>
                        <TableCell>{serviceTypes[index] || "-"}</TableCell>
                        <TableCell>{sellingPartners[index] || "-"}</TableCell>
                        <TableCell>{brands[index] || "-"}</TableCell>
                        <TableCell>{models[index] || "-"}</TableCell>
                        <TableCell>{repairs[index] || "-"}</TableCell>
                        <TableCell>{serviceCharges[index] || "-"}</TableCell>
                        <TableCell>{grossAmounts[index] || "-"}</TableCell>
                        <TableCell>
                          {selectedViewRow?.invoiceStatus || "-"}
                        </TableCell>
                        <TableCell
                          style={{ position: "relative", cursor: "pointer" }}
                        >
                          {mismatchDetails.length > 0 ? (
                            <>
                              <Tooltip
                                title={
                                  <div>
                                    <table
                                      className="table table-sm table-bordered mb-0"
                                      style={{
                                        backgroundColor: "#fff9c4", // Custom yellow
                                      }}
                                    >
                                      <thead>
                                        <tr>
                                          <th style={{ fontWeight: "bold" }}>
                                            Field
                                          </th>
                                          <th style={{ fontWeight: "bold" }}>
                                            System Data
                                          </th>
                                          <th style={{ fontWeight: "bold" }}>
                                            Server Data
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {mismatchDetails.map((detail, idx) => (
                                          <tr key={idx}>
                                            <td>{detail.field}</td>
                                            <td>{detail.excel}</td>
                                            <td>{detail.system}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                }
                                placement="top"
                                arrow
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      backgroundColor: "#fff9c4", // Soft Yellow
                                      color: "black",
                                      boxShadow: 3,
                                      fontSize: 12,
                                      maxWidth: 400,
                                      padding: "8px",
                                    },
                                  },
                                }}
                              >
                                <span
                                  style={{ color: "black", fontWeight: "bold" }}
                                >
                                  Mismatches
                                </span>
                              </Tooltip>
                            </>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{selectedViewRow?.remarks || "-"}</TableCell>
                        <TableCell>
                          {selectedViewRow?.remarkFile ? (
                            <a
                              href={selectedViewRow.remarkFile}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <PictureAsPdfIcon sx={{ color: "red" }} />
                            </a>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody> */}

              <TableBody>
                {Array.from(
                  { length: rowsPerPage },
                  (_, i) => i + page * rowsPerPage
                )
                  .filter((i) => i < maxLength)
                  .map((index) => {
                    const mismatch = mismatchData[index] || {};
                    const isAAMismatch = mismatch.aaMismatch;
                    const isOtherMismatch =
                      mismatch.serviceMismatch ||
                      mismatch.repairMismatch ||
                      mismatch.sellingPartnerMismatch;
                    const allMatch =
                      !mismatch.aaMismatch &&
                      !mismatch.serviceMismatch &&
                      !mismatch.repairMismatch &&
                      !mismatch.sellingPartnerMismatch;

                    const rowStyle = isAAMismatch
                      ? { backgroundColor: "#f8d7da" } // Red for AA mismatch
                      : isOtherMismatch
                        ? { backgroundColor: "#fff9e6" } // Yellow for other mismatches
                        : { backgroundColor: "#e6f4ea" }; // Green for all matches

                    const mismatchDetails = [
                      {
                        field: "AA Number",
                        excel: mismatch.rowData?.aaNumber || "-",
                        system: mismatch.apiData?.aaNumber || "-",
                        hasMismatch: mismatch.aaMismatch,
                      },
                      {
                        field: "Service Charges",
                        excel: mismatch.rowData?.serviceCharge || "-",
                        system: mismatch.apiData?.serviceCharge || "-",
                        hasMismatch: mismatch.serviceMismatch,
                      },
                      {
                        field: "Repair Charges",
                        excel: mismatch.rowData?.repairCharge || "-",
                        system: mismatch.apiData?.repairCharge || "-",
                        hasMismatch: mismatch.repairMismatch,
                      },
                      {
                        field: "Selling Partner",
                        excel: mismatch.rowData?.sellingPartner || "-",
                        system: mismatch.apiData?.sellingPartner || "-",
                        hasMismatch: mismatch.sellingPartnerMismatch,
                      },
                    ].filter((detail) => detail.hasMismatch);

                    return (
                      <TableRow key={index} sx={rowStyle}>
                        <TableCell>
                          <RemoveRedEyeIcon
                            style={{ cursor: "pointer", color: "#7E00D1" }}
                            onClick={() =>
                              navigate("/allDetails", {
                                state: { aaNumber: aaNos[index] },
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>{aaNos[index] || "-"}</TableCell>
                        <TableCell>{imeis[index] || "-"}</TableCell>
                        <TableCell>
                          {selectedViewRow?.creationDate || "-"}
                        </TableCell>
                        <TableCell>
                          {selectedViewRow?.closureDate || "-"}
                        </TableCell>
                        <TableCell>{customerNames[index] || "-"}</TableCell>
                        <TableCell>{serviceTypes[index] || "-"}</TableCell>
                        <TableCell>{sellingPartners[index] || "-"}</TableCell>
                        <TableCell>{brands[index] || "-"}</TableCell>
                        <TableCell>{models[index] || "-"}</TableCell>
                        <TableCell>{repairs[index] || "-"}</TableCell>
                        <TableCell>{serviceCharges[index] || "-"}</TableCell>
                        <TableCell>{grossAmounts[index] || "-"}</TableCell>
                        <TableCell>
                          {selectedViewRow?.invoiceStatus || "-"}
                        </TableCell>
                        <TableCell
                          style={{ position: "relative", cursor: "pointer" }}
                        >
                          {mismatchDetails.length > 0 ? (
                            <>
                              <Tooltip
                                title={
                                  <div>
                                    <table
                                      className="table table-sm table-bordered mb-0"
                                      style={{
                                        backgroundColor: "#fff9c4", // Custom yellow
                                      }}
                                    >
                                      <thead>
                                        <tr>
                                          <th style={{ fontWeight: "bold" }}>
                                            Field
                                          </th>
                                          <th style={{ fontWeight: "bold" }}>
                                            System Data
                                          </th>
                                          <th style={{ fontWeight: "bold" }}>
                                            Server Data
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {mismatchDetails.map((detail, idx) => (
                                          <tr key={idx}>
                                            <td>{detail.field}</td>
                                            <td>{detail.excel}</td>
                                            <td>{detail.system}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                }
                                placement="top"
                                arrow
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      backgroundColor: "#fff9c4", // Soft Yellow
                                      color: "black",
                                      boxShadow: 3,
                                      fontSize: 12,
                                      maxWidth: 400,
                                      padding: "8px",
                                    },
                                  },
                                }}
                              >
                                <span
                                  style={{ color: "black", fontWeight: "bold" }}
                                >
                                  Mismatches
                                </span>
                              </Tooltip>
                            </>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{remarksArray[index] || "-"}</TableCell>{" "}
                        {/* Updated to use remarksArray */}
                        <TableCell>
                          {selectedViewRow?.remarkFile ? (
                            <a
                              href={selectedViewRow.remarkFile}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <PictureAsPdfIcon sx={{ color: "red" }} />
                            </a>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
          <Box
            sx={{
              bottom: 16,
              right: 24,

              zIndex: 10,
            }}
          >
            <TablePagination
              rowsPerPageOptions={[10, 15, 20, 25]}
              component="div"
              count={maxLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button variant="outlined">
              Total Amount: {selectedViewRow?.finalAmount}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setViewModalOpen(false)}
            style={{ backgroundColor: "#FE7C0B", color: "#fff" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewBatch;
