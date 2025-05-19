import React, { useState, useEffect } from "react";
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
  Chip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
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
import PaymeScheduleHook from "./PaymentScheduleHook";
const PaymentScheduled = () => {
  const [status, setStatus] = useState("");
  const [batches, setBatches] = useState(["Batch 1", "Batch 2", "Batch 3"]);

  const handleDelete = (batchToDelete) => {
    setBatches((prev) => prev.filter((batch) => batch !== batchToDelete));
  };
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const {
    data,
    loading,
    selectedRow,
    invoiceFile,
    openBox,
    setInvoiceFile,
    handleRowClick,
    handleCloseDialog,
    handleUploadUtr,
    setOpenBox,
  } = PaymeScheduleHook();
  console.log(data, "this is data");
  const StatusCell = ({ initialStatus }) => {
    const [status, setStatus] = useState(initialStatus);

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
        default:
          return {
            borderColor: "#ccc",
            color: "#333",
            backgroundColor: "#f9f9f9",
          };
      }
    };

    const styles = {
      padding: "6px 10px",
      borderRadius: "30px",
      width: "140px",
      ...getColorStyles(status),
      border: `1px solid ${getColorStyles(status).borderColor}`,
    };
    return (
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={styles}
      >
        <option value="Batch">Batch</option>
        <option value="Invoice">Invoice</option>
        <option value="Partial Approved">Partial Approved</option>
        <option value="Partial Finalized">Partial Finalized</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    );
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
    // {
    //   name: "Select",
    //   cell: (row) => (
    //     <input
    //       type="checkbox"
    //       disabled={
    //         row.status === "Batch Created" || row.status === "Invoice Uploaded"
    //       }
    //       style={{
    //         cursor:
    //           row.status === "Batch Created" ||
    //           row.status === "Invoice Uploaded"
    //             ? "not-allowed"
    //             : "pointer",
    //       }}
    //       className="form-check-input"
    //     />
    //   ),
    //   ignoreRowClick: true,
    // },
    {
      name: "Schedule ID",
      selector: (row) => row.scheduledId || "--",
      width: "120px",
    },
    { name: "Batch No", selector: (row) => row.batchNo },
    { name: "Vendor Name", selector: (row) => row.vendorName, width: "150px" },
    {
      name: "Approval Date",
      selector: (row) => row.approvalDate,
      width: "150px",
    },
    { name: "Case Count", selector: (row) => row.caseCount, width: "150px" },
    { name: "Invoice No", selector: (row) => row.invoiceNo, width: "150px" },
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
      name: "Reimbursement",
      selector: (row) => row.reimbursment,
      width: "150px",
    }, // Fixed
    {
      name: "Expense",
      selector: (row) => row.invoiceAmount,
      width: "150px",
    }, // Fixed
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
      name: "Payable",
      selector: (row) => row.payable,
      width: "150px",
    },
    {
      name: "Edit Payment Date",
      width: "220px", // give extra width if needed
      cell: (row) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={row.invoiceDate ? dayjs(row.invoiceDate) : null}
            onChange={(newDate) => {
              console.log("Updated date:", newDate?.format("DD-MM-YYYY"));
            }}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />
        </LocalizationProvider>
      ),
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymentType,
      width: "150px",
    },
    {
      name: "GST",
      selector: (row) => row.finalAmount,
      width: "150px",
    },
    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      width: "150px",
    },
    {
      name: "PDF",
      selector: (row) => row.invoice,
      cell: (row) => (
        <a href={row.invoice} target="_blank" rel="noopener noreferrer">
          <img src={pdf3} alt="PDF" style={{ width: "24px", height: "24px" }} />
        </a>
      ),
      width: "150px",
    },

    ,
    {
      name: "Invoice Status",
      cell: (row, index) => (
        <div>
         
          <Chip
            label={row.invoiceStatus || "Approved"}
            color="primary"
            variant="outlined"
            style={{ borderRadius: "20px" }}
          />
        </div>
      ),
      width: "180px",
    },
    {
      name: "Finance Status",
      cell: (row, index) => (
        // <StatusCell initialStatus={row.status || "Approved"} />
        <Chip
          label={row.financeStatus || "Approved"}
          color="warning"
          variant="outlined"
          style={{ borderRadius: "20px" }}
        />
      ),
      width: "180px",
    },
    {
      name: "Bank Formet Download",
      cell: (row, index) => (
        // <StatusCell initialStatus={row.status || "Approved"} />
        <Chip
          label="Download"
          icon={<ExpandCircleDownRoundedIcon />}
          variant="outlined"
          style={{ borderRadius: "20px", cursor: "pointer" }}
        />
      ),
      width: "200px",
    },
    {
      name: "Upload Bank File",
      cell: (row, index) => (
        // <StatusCell initialStatus={row.status || "Approved"} />
        <Chip
          label="Upload Bank File"
          color="primary"
          style={{ borderRadius: "20px", cursor: "pointer" }}
        />
      ),
      width: "180px",
    },
  ];

  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
    status: "", // Added status filter
  });

  const [filteredData, setFilteredData] = useState([]);

  // Initialize with all data when component mounts
  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const filtered = data.filter((item) => {
      // If all filters are empty, show all data
      if (
        !filters.vendorName &&
        !filters.invoiceNo &&
        !filters.batchNo &&
        !filters.filterDate &&
        !filters.status
      ) {
        return true;
      }

      // Vendor filter
      const vendorMatch = item.vendorName
        ?.toLowerCase()
        .includes(filters.vendorName.toLowerCase());

      // Invoice filter
      const invoiceMatch = (item.invoiceNo || "")
        .toLowerCase()
        .includes(filters.invoiceNo.toLowerCase());

      // Batch filter
      const batchMatch = (item.name || "") // Changed from batchNo to name
        .toLowerCase()
        .includes(filters.batchNo.toLowerCase());

      // Date filter
      let dateMatch = true;
      if (filters.filterDate) {
        try {
          const itemDate = dayjs(item.batchDate); // Changed from approvalDate to batchDate
          const filterDate = dayjs(filters.filterDate);
          dateMatch = itemDate.isSame(filterDate, "day");
        } catch (e) {
          console.error("Date parsing error:", e);
          dateMatch = true;
        }
      }

      // Status filter
      const statusMatch =
        !filters.status ||
        (item.status &&
          item.status.toLowerCase() === filters.status.toLowerCase());

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

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setFilters((prev) => ({
      ...prev,
      status: event.target.value,
    }));
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
          <h5 className="mb-0">Payment Schedule</h5>

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
          <Grid item xs={12} md={2}>
            <FormControl fullWidth className="designationForm">
              <Select
                value={filters.status}
                onChange={handleStatusChange}
                displayEmpty
                name="status"
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="Batch Created">Batch Created</MenuItem>
                <MenuItem value="Invoice Uploaded">Invoice Uploaded</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DataTable
          columns={columns}
          data={data}
          // data={filteredData}
          fixedHeader
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          customStyles={customStyles}
        />

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

      
    </>
  );
};

export default PaymentScheduled;

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
