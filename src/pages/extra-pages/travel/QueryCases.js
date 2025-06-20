import React, { useState, useEffect } from "react";
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
  Chip,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { data } from "./MockData";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DataTable from "react-data-table-component";
import ReviewBatchHook from "./ReviewBatchHook";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import pdf3 from "../../../assets/images/users/pdf3.png";

// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  FormControlLabel,
  InputLabel,
} from "../../../../node_modules/@mui/material/index";
import QueryCasesHook from "./QueryCasesHook";
import { useNavigate } from "react-router-dom";

const QueryCases = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  // Add state for search filters
  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
  });

  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const {
    data,
    loading,
    selectedRow,
    invoiceFile,
    openBox,
    setOpenBox,
    setInvoiceFile,
    handleRowClick,
    handleCloseDialog,
    handleUploadUtr,
    handleOpenDialog,
  } = QueryCasesHook();
  console.log("this is data", data);
  // Apply filters whenever filters or original data changes
  useEffect(() => {
    if (data && data.length > 0) {
      const filtered = data.filter((item) => {
        // Vendor filter - only apply if filter has value
        const matchesVendor = filters.vendorName
          ? item.vendorName
              ?.toLowerCase()
              .includes(filters.vendorName.toLowerCase())
          : true;

        // Invoice filter - only apply if filter has value
        const matchesInvoice = filters.invoiceNo
          ? item.invoiceNumber
              ?.toLowerCase()
              .includes(filters.invoiceNo.toLowerCase())
          : true;

        // Batch filter - only apply if filter has value
        const matchesBatch = filters.batchNo
          ? item.batchNo?.toLowerCase().includes(filters.batchNo.toLowerCase())
          : true;

        // Date filter - only apply if filter has value
        let matchesDate = true;
        if (filters.filterDate) {
          const itemDate = dayjs(item.approvalDate);
          const filterDate = dayjs(filters.filterDate);
          matchesDate = itemDate.isSame(filterDate, "day");
        }

        return matchesVendor && matchesInvoice && matchesBatch && matchesDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
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
  // ✅ Define this at the top (before columns or component logic)
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
  const columns = [
    {
      name: "View",
      selector: (row) => row.view,
      cell: (row) => (
        <span onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
          <RemoveRedEyeIcon style={{ color: "#7E00D1" }} />
        </span>
      ),
    },

    { name: "Batch No", selector: (row) => row.batchNo },
    { name: "Vendor Name", selector: (row) => row.vendorName, width: "150px" },
    {
      name: "Approval Date",
      selector: (row) => dayjs(row.approvalDate).format("DD-MM-YYYY"),
      width: "150px",
    },
    { name: "Case Count", selector: (row) => row.caseCount, width: "120px" },
    {
      name: "Invoice No",
      selector: (row) => row.invoiceNumber,
      width: "150px",
    },

    {
      name: "Invoice Date",
      selector: (row) => row.invoiceDate,
      width: "150px",
    },
    {
      name: "Invoice Amount",
      selector: (row) => row.invoiceAmount,
      width: "150px",
    },

    

  
    {
      name: "GST",
      selector: (row) => row.gst,
      width: "150px",
    },
    {
      name: "TDS",
      selector: (row) => row.tds,
      width: "150px",
    },

       {
      name: "Total Repair Charges",
      selector: (row) => row.totalRepairCharges || "--",
      width: "150px",
    },
    {
      name: "Total Service Charges",
      selector: (row) => row.totalServiceCharges || "--",
      width: "150px",
    },
    {
      name: "Final Amount",
      selector: (row) => row.finalAmount || "--",
      width: "150px",
    },
   
 
   
    {
      name: "Invoice",
      selector: (row) => row.pdF_FileUpload,
      cell: (row) => (
        <a
          href={`${row.invoice}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={pdf3} alt="PDF" style={{ width: "24px", height: "24px" }} />
        </a>
      ),
      width: "150px",
    },
   
    {
      name: "Query DOC",
      selector: (row) => row.pdF_FileUpload,
      cell: (row) => (
        <a
          href={`${row.pdF_FileUpload}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={pdf3} alt="PDF" style={{ width: "24px", height: "24px" }} />
        </a>
      ),
      width: "150px",
    },
    {
      name: "Remarks Date",
      selector: (row) => row.date,
      width: "150px",
    },
    { name: "Remarks", selector: (row) => row.issue, width: "150px" },
    {
      name: "Invoice Status",
      selector: (row) => (
        <Chip
          label={row.invoiceStatus}
          color={
            row.invoiceStatus === "Approved"
              ? "success"
              : row.invoiceStatus === "Pending"
                ? "error"
                : "default"
          }
          variant="outlined"
          sx={{ borderRadius: "20px", padding: "4px 12px" }}
        />
      ),
      width: "150px",
    },

    // {
    //   name: "Invoice Status",
    //   cell: (row) => {
    //     const styles = getColorStyles(row.invoiceStatus || "Approved");
    //     return (
    //       <span
    //         style={{
    //           ...styles,
    //           padding: "4px 12px",
    //           border: "2px solid",
    //           borderRadius: "999px",
    //           fontWeight: 500,
    //           fontSize: "14px",
    //           display: "inline-block",
    //         }}
    //       >
    //         {row.invoiceStatus || "--"}
    //       </span>
    //     );
    //   },
    //   width: "180px",
    // },

    {
      name: "Finance Status",
      selector: (row) => (
        <Chip
          label={row.financeStatus}
          color={
            row.financeStatus === "Query"
              ? "warning"
              : row.financeStatus === "Pending"
                ? "error"
                : "default"
          }
          variant="outlined"
          sx={{ borderRadius: "20px", padding: "4px 12px" }}
        />
      ),
      width: "150px",
    },

    // {
    //   name: "Finance Status",
    //   cell: (row, index) => {
    //     // Get the current finance status from row data if it exists
    //     const currentStatus = row.financeStatus || "";
    //     const styles = getColorStyles(currentStatus);

    //     return (
    //       <select
    //         style={{
    //           padding: "6px 10px",
    //           borderRadius: "30px",
    //           border: `1px solid ${styles.borderColor}`,
    //           backgroundColor: styles.backgroundColor,
    //           color: styles.color,
    //           width: "140px",
    //           cursor: "pointer",
    //         }}
    //         value={currentStatus}
    //         onChange={(e) => {
    //           const selected = e.target.value;
    //           // Update the row's finance status (you might need to handle this in your state)
    //           row.financeStatus = selected;

    //           if (
    //             selected === "Validated" ||
    //             selected === "Query" ||
    //             selected === "Hold" ||
    //             selected === "Rejected"
    //           ) {
    //             setOpenBox(true); // Open your popup dialog
    //           }
    //         }}
    //       >
    //         <option value={row.financeStatus}>{row.financeStatus}</option>
    //         <option value="Validated">Validated</option>
    //         <option value="Rejected">Rejected</option>
    //         <option value="Query">Query</option>
    //         <option value="Hold">Hold</option>
    //       </select>
    //     );
    //   },
    //   width: "180px",
    // },
  ];

  console.log("this is selected row", selectedRow);

  const customerNames = selectedRow?.customerName?.split(",") || [];
  const aaNos = selectedRow?.aaNo?.split(",") || [];
  const imeis = selectedRow?.imeiNo?.split(",") || [];
  const serviceTypes = selectedRow?.serviceType?.split(",") || [];
  const brands = selectedRow?.brand?.split(",") || [];
  const models = selectedRow?.makeModel?.split(",") || [];
  const repairs = selectedRow?.repairCharges?.split(",") || [];
  const gstCharges = selectedRow?.chargesInclGST?.split(",") || [];
  const grossAmount = selectedRow?.grossAmount?.split(",") || [];

  const maxLength = Math.max(
    customerNames.length,
    aaNos.length,
    imeis.length,
    serviceTypes.length,
    brands.length,
    models.length,
    repairs.length,
    gstCharges.length,
    grossAmount.length
  );

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
          <h5 className="mb-0">Query Cases</h5>

          <div></div>
        </Box>

        <Grid mb={3} container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              name="vendorName"
              variant="outlined"
              placeholder="Vendor Name"
              value={filters.vendorName}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              name="invoiceNo"
              variant="outlined"
              placeholder="Invoice No"
              value={filters.invoiceNo}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              name="batchNo"
              variant="outlined"
              placeholder="Batch No"
              value={filters.batchNo}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Approval Date"
                value={filters.filterDate}
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          customStyles={customStyles}
        />
        {/* <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          customStyles={customStyles}
        /> */}

        {loading && (
          <div style={spinner}>
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
          {selectedRow?.batchNo ? `Batch No: ${selectedRow.batchNo}` : ""}
          <a
            href={selectedRow?.invoice}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <PictureAsPdfIcon
              sx={{ color: "red", fontSize: "28px", cursor: "pointer" }}
            />
          </a>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>View</TableCell>
                <TableCell>Customer Name</TableCell>
                {/* <TableCell>AA No</TableCell> */}
                <TableCell>IMEI No</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Repair Charges</TableCell>
                <TableCell>GST Charges</TableCell>
                <TableCell>GrossAmount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(maxLength)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <RemoveRedEyeIcon
                      style={{ cursor: "pointer", color: "#7E00D1" }}
                      onClick={() =>
                        navigate("/allDetails", {
                          state: { aaNumber: aaNos[index] }, // <-- only that row's AA number
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{customerNames[index] || "-"}</TableCell>
                  {/* <TableCell>{aaNos[index] || "-"}</TableCell> */}
                  <TableCell>{imeis[index] || "-"}</TableCell>
                  <TableCell>{serviceTypes[index] || "-"}</TableCell>
                  <TableCell>{brands[index] || "-"}</TableCell>
                  <TableCell>{models[index] || "-"}</TableCell>
                  <TableCell>{repairs[index] || "-"}</TableCell>
                  <TableCell>{gstCharges[index] || "-"}</TableCell>
                  <TableCell>{grossAmount[index] || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button variant="outlined">
              Total Amount :{selectedRow?.finalAmount}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            style={{ backgroundColor: "#FE7C0B", color: "#fff" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default QueryCases;

const boxStyle = {
  backgroundColor: "#6A0DAD",
  color: "white",
  padding: "2px 10px",
  borderRadius: "100%",
  display: "inline-block",
  cursor: "pointer",
};

const customStyles = {
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
};

const spinner = {
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
};
