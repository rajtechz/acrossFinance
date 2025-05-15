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
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FullPaymentdata, data } from "./MockData";
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

// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  FormControlLabel,
  InputLabel,
} from "../../../../node_modules/@mui/material/index";
import BankRejectHook from "./BankRejectHook";
const BankReject = () => {
  const [status, setStatus] = useState("");
  const [openModal, setopenModal] = useState(false);

  const handleOpenDialog = () => setopenModal(true);
  const handleCloseDialog = () => setopenModal(false);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const {
    // data,
    loading,
    selectedRow,
    invoiceFile,
    // openModal,
    setInvoiceFile,
    handleRowClick,
    // handleCloseDialog,
    handleUploadUtr,
    // setopenModal,
  } = BankRejectHook();

  const handleFinanceStatusChange = (newStatus, row) => {
    console.log("Updated status for", row.id, "to", newStatus);
  };
  const getFinanceStatusStyle = (status) => {
    if (!status || typeof status !== "string") {
      return {
        backgroundColor: "#F0F0F0",
        color: "#333",
        border: "1px solid #CCC",
      };
    }

    switch (status.toLowerCase()) {
      case "approved":
        return {
          backgroundColor: "#E6FFE6",
          color: "#00B050",
          border: "1px solid #00B050",
        };
      case "validated":
        return {
          backgroundColor: "#E6F7FF",
          color: "#00B3E6",
          border: "1px solid #00B3E6",
        };
      case "rejected":
        return {
          backgroundColor: "#FFE6E6",
          color: "#FF0000",
          border: "1px solid #FF0000",
        };
      case "hold":
        return {
          backgroundColor: "#FFF4E6",
          color: "#FF8C00",
          border: "1px solid #FF8C00",
        };
      case "submitted":
        return {
          backgroundColor: "#E6FFF2",
          color: "#00A67E",
          border: "1px solid #00A67E",
        };
      case "partial approved":
        return {
          backgroundColor: "#FFFBE6",
          color: "#FFD700",
          border: "1px solid #FFD700",
        };
      case "partial - finalized":
        return {
          backgroundColor: "#F4E6FF",
          color: "#8E44AD",
          border: "1px solid #8E44AD",
        };
      case "pending":
        return {
          backgroundColor: "#E6F0FF",
          color: "#007BFF",
          border: "1px solid #007BFF",
        };
      default:
        return {
          backgroundColor: "#F0F0F0",
          color: "#333",
          border: "1px solid #CCC",
        };
    }
  };

  const StatusCell = ({ initialStatus }) => {
    const [status, setStatus] = React.useState(initialStatus);

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
            borderColor: "#ff9500",
            color: "#ff9500",
            backgroundColor: "#fff4e6",
          };
        case "Invoice Uploaded":
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
          borderColor: "#f1c40f",
          color: "#f1c40f",
          backgroundColor: "#fff9e6",
        };
      case "Invoice Uploaded":
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

  const getFinanceColorStyles = (status) => {
    switch (status) {
      case "Full Payment":
        return {
          borderColor: "#34c759",
          color: "#34c759",
          backgroundColor: "#eafff1",
        };
      case "Partial Payment":
        return {
          borderColor: "#f1c40f",
          color: "#f1c40f",
          backgroundColor: "#fff9e6",
        };
      case "Not Submitted":
        return {
          borderColor: "#ccc",
          color: "#333",
          backgroundColor: "#f9f9f9",
        };
      case "Approved":
        return {
          borderColor: "#18884F",
          color: "#18884F",
          backgroundColor: "#E0FFEF",
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
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          disabled={
            row.status === "Batch Created" || row.status === "Invoice Uploaded"
          }
          style={{
            cursor:
              row.status === "Batch Created" ||
              row.status === "Invoice Uploaded"
                ? "not-allowed"
                : "pointer",
          }}
          className="form-check-input"
        />
      ),
      ignoreRowClick: true,
    },
    { name: "Payment  ID", selector: (row) => row.scheduleID, width: "120px" },
    { name: "Batch No", selector: (row) => row.batchNo },
    { name: "Vendor Name", selector: (row) => row.vendorName, width: "150px" }, // Fixed to match the correct field name
    {
      name: "Approval Date",
      selector: (row) => row.approvalDate,
      width: "150px",
    },
    { name: "Case Count", selector: (row) => row.caseCount, width: "100px" },
    { name: "Invoice No", selector: (row) => row.invoiceNo, width: "120px" },
    {
      name: "Invoice Date",
      selector: (row) => row.invoiceDate,
      width: "140px",
    },
    {
      name: "Invoice Amount",
      selector: (row) => row.invoiceAmount,
      width: "150px",
    },
    {
      name: "Reimbursement",
      selector: (row) => row.reimbursement,
      width: "150px",
    },
    { name: "Expense", selector: (row) => row.expense, width: "120px" },
    { name: "GST", selector: (row) => row.gstHold, width: "120px" },
    { name: "TDS", selector: (row) => row.tds, width: "120px" },
    { name: "Payable", selector: (row) => row.payable, width: "120px" },
    {
      name: "Partial Paid Amount",
      selector: (row) => row.portalPaidAmount,
      width: "160px",
    },
    // { name: "AA/SRN No", selector: (row) => row.srnNo, width: "100px" },
    // { name: "Auto/Gadget", selector: (row) => row.batchID, width: "150px" },

    {
      name: "Payment Date",
      selector: (row) => row.paymentDate,
      width: "140px",
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymentType,
      width: "140px",
    },
    {
      name: "GST",
      selector: (row) => row.gstType,
      width: "100px",
    },
    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      width: "150px",
    },
    { name: "PDF", selector: (row) => row.pdf, width: "150px" },
    {
      name: "Remarks",
      selector: (row) => "Invoice have some changes",
      width: "150px",
    },
    {
      name: "Reson",
      selector: (row) => "Invoice have some changes",
      width: "150px",
    },

    {
      name: "Invoice Status",
      selector: (row) => row.status || "Approved",
      width: "180px",
      cell: (row) => {
        const status = row.status || "Approved";
        const styles = getColorStyles(status);
        return (
          <div
            style={{
              border: `1px solid ${styles.borderColor}`,
              color: styles.color,
              backgroundColor: styles.backgroundColor,
              padding: "6px 10px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {status}
          </div>
        );
      },
    },
    {
      name: "Finance Status",
      selector: (row) => row.financeStatus || "Not Submitted",
      width: "180px",
      cell: (row) => {
        const status = row.financeStatus || "Not Submitted";
        // For Finance Status, you might want different colors
        const styles = getFinanceColorStyles(status);
        return (
          <div
            style={{
              border: `1px solid ${styles.borderColor}`,
              color: styles.color,
              backgroundColor: styles.backgroundColor,
              padding: "6px 10px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {status}
          </div>
        );
      },
    },

    {
      name: "Modify Details",
      selector: (row) => (
        <Chip
          label="Modify Details"
          color="error"
          sx={{ borderRadius: "20px", cursor: "pointer" }}
          onClick={handleOpenDialog}
        />
      ),
      width: "150px",
    },
  ];

  // Add this state definition
  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
    status: ""
  });
  const [filteredData, setFilteredData] = useState([]);
  // Apply filters whenever filters or data changes
  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  // Apply filters whenever filters or data changes
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
      const batchMatch = (item.batchNo || "")
        .toLowerCase()
        .includes(filters.batchNo.toLowerCase());

      // Date filter - using approvalDate from your columns
      let dateMatch = true;
      if (filters.filterDate) {
        try {
          const itemDate = dayjs(item.approvalDate);
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
          <h5 className="mb-0">Review Batches</h5>

          <div>
            <Button
              // onClick={() => setShowHoldModal(false)}
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#8000d7",
              }}
            >
              Bank File Upload
            </Button>
          </div>
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
          {/* <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder=" Auto/Gadget"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid> */}
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
          // data={FullPaymentdata}
          data={filteredData}
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

        <div className="d-flex justify-content-center align-content-center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7E00D1",
              fontWeight: "bold",
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#6C00BA",
              },
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={openModal}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
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
              Modify Details
            </div>
          </div>
        </DialogTitle>

        {/* Dialog Body */}
        <DialogContent sx={{ padding: 0, backgroundColor: "#fff" }}>
          <div style={{ padding: "0 24px 24px" }}>
            {/* Personal Details */}
            <div
              style={{
                marginTop: "16px",
                border: "1px solid #eee",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#D8E7FF",
                  padding: "8px 16px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Personal Details
              </div>
              <Grid container spacing={2} style={{ padding: "16px" }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    placeholder="Customer name"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact No"
                    placeholder="Primary contact no"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Address"
                    placeholder="Alternate contact no"
                  />
                </Grid>
              </Grid>

              {/* Bank Details */}
              <div
                style={{
                  background: "#D8E7FF",
                  padding: "8px 16px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Bank Details
              </div>
              <Grid container spacing={2} style={{ padding: "16px" }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Account No"
                    placeholder="Customer name"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="IFSC No"
                    placeholder="Primary contact no"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Customer ID"
                    placeholder="Alternate contact no"
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions
          style={{
            justifyContent: "center",
            backgroundColor: "#fff",
            paddingBottom: "24px",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            style={{
              backgroundColor: "#7E00D1",
              color: "#fff",
              width: "40%",
              textTransform: "none",
            }}
          >
            Save & Verify
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={openModal}
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
              For Assistance Call on : <strong>999999XXXX</strong>
            </div>
          </div>
        </DialogTitle>

        <DialogContent
          sx={{
            padding: 0,
            backgroundColor: "#fff",
          }}
        >
          <div style={{ padding: "24px" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>Vendor Name</strong>
                <span
                  style={{
                    background: "#F5F5F5",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  AAN No - <strong>123456789</strong>
                </span>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Remarks Category</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="Billing">Billing</MenuItem>
                    <MenuItem value="Technical">Technical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter your issues"
                  variant="outlined"
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
                  }}
                >
                  <i
                    className="fas fa-upload"
                    style={{ fontSize: "24px", marginBottom: "8px" }}
                  ></i>
                  <br />
                  Drag and drop or{" "}
                  <span style={{ color: "#5D5FEF", cursor: "pointer" }}>
                    browse
                  </span>{" "}
                  your files
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions
          style={{
            justifyContent: "center",
            padding: 0,
            backgroundColor: "#fff",
            paddingBottom: "24px",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            style={{
              backgroundColor: "#7E00D1",
              color: "#fff",
              marginBottom: "16px",
              width: "40%",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default BankReject;

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
