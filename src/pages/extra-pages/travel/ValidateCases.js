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
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  Chip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import pdf3 from "../../../assets/images/users/pdf3.png";
import { holdData, statusUpdate } from "./MockData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ValidateCasesHook from "./ValidateCasesHook";

const ValidateCases = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [batches, setBatches] = useState();
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [showFinalTable, setShowFinalTable] = useState(false);

  // Add state for search filters
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
  } = ValidateCasesHook();

  console.log("this is data validete", data);
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
        default:
          return {
            borderColor: "#ccc",
            color: "#333",
            backgroundColor: "#f9f9f9",
          };
      }
    };

    const styles = {
      padding: "0px 0px",
      borderRadius: "50px",
      width: "140px",
      ...getColorStyles(status),
      border: `1px solid ${getColorStyles(status).borderColor}`,
    };

    return (
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={styles}
        className="select_padding"
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

    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          disabled={
            row.invoiceStatus === "Batch Created" ||
            row.invoiceStatus === "Invoice Uploaded"
          }
          // checked={selectedBatches.some(
          //   (batch) => batch.batchNo === row.batchNo
          // )}
          checked={selectedBatches.some(
            (batch) =>
              `${batch.batchNo}-${batch.invoiceNo}` ===
              `${row.batchNo}-${row.invoiceNo}`
          )}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedBatches((prev) => [...prev, row]);
            } else {
              setSelectedBatches((prev) =>
                prev.filter(
                  (batch) =>
                    `${batch.batchNo}-${batch.invoiceNo}` !==
                    `${row.batchNo}-${row.invoiceNo}`
                )
              );
              // setSelectedBatches((prev) =>
              //   prev.filter((batch) => batch.batchNo !== row.batchNo)
              // );
            }
          }}
          className="form-check-input"
        />
      ),
      ignoreRowClick: true,
    },
    
    { name: "Batch No", selector: (row) => row.batchNo },
    { name: "Vendor Name", selector: (row) => row.vendorName, width: "150px" }, // Fixed to match the correct field name
    {
      name: "Approval Date",
      selector: (row) => dayjs(row.approvalDate).format("DD-MM-YYYY"), // Format the date
      width: "150px",
    },

    { name: "Case Count", selector: (row) => row.caseCount, width: "150px" },
    { name: "Invoice No", selector: (row) => row.invoiceNo, width: "150px" }, // Fixed
    {
      name: "Invoice Date",
      selector: (row) => row.invoiceDate,
      width: "150px",
    }, // Fixed
    {
      name: "Invoice Amount",
      selector: (row) => row.invoiceAmount,
      width: "150px",
    }, // Fixed

    // {
    //   name: "Reimbursement",
    //   selector: (row) => row.reimbursement,
    //   width: "150px",
    // },
    {
      name: "Expense",
      selector: (row) => {
        if (!row.grossAmount || row.grossAmount === "--") return "--";

        // Remove any non-digit characters (except commas) and split by comma
        const amounts = row.grossAmount.replace(/[^\d,]/g, "").split(",");

        // Convert to numbers and sum them up
        const sum = amounts.reduce((total, amount) => {
          const num = parseFloat(amount) || 0;
          return total + num;
        }, 0);

        return sum.toLocaleString(); // Format with commas if needed
      },
      width: "150px",
    },
    {
      name: "GST",
      selector: (row) => `${row.gst || "18"}%`,
      width: "150px",
    }, // Fixed
    {
      name: "TDS",
      selector: (row) => `${row.tds || "2"}%`,
      width: "150px",
    },
    {
      name: "Payable",
      selector: (row) => row.finalAmount,
      width: "150px",
    },
    {
      name: "Service Charges ",
      selector: (row) => row.serviceCharges,
      width: "150px",
    },
    {
      name: "Total Service Charges",
      selector: (row) => row.totalServiceCharges,
      width: "200px",
    },
    {
      name: "remarks",
      selector: (row) => row.remarks,
      width: "200px",
    },

    {
      name: "Invoice",
      selector: (row) => row.invoice,
      cell: (row) => (
        <a
          href={row.invoice}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={pdf3} alt="PDF" style={{ width: "24px", height: "24px" }} />
        </a>
      ),
      width: "150px",
    },
    {
      name: "Invoice Status",
      cell: (row, index) => (
        <Chip
          label={row.invoiceStatus || "--"}
          variant="outlined"
          color="success"
          style={{ borderRadius: "20px" }}
        />
      ),
      width: "180px",
    },
    {
      name: "Finance Status",
      cell: (row, index) => (
        <Chip
          label={row.financeStatus || "--"}
          variant="outlined"
          color="success"
          style={{ borderRadius: "20px" }}
        />
      ),
      width: "180px",
    },

    // {
    //   name: "Finance Status",
    //   cell: (row, index) => (
    //     <select
    //       style={{
    //         padding: "6px 10px",
    //         borderRadius: "30px",
    //         border: "1px solid #ccc",
    //         backgroundColor: "#f9f9f9",
    //         width: "140px",
    //       }}
    //     >
    //       <option value="Not Submitted">Not Submitted</option>
    //       <option value="Submitted">Submitted</option>
    //       <option value="Approved">Validated</option>
    //       <option value="Rejected">Rejected</option>
    //       <option value="Rejected">Query</option>
    //       <option value="Rejected">Payment Scheduled</option>
    //       <option value="Rejected">Payment Hold</option>
    //       <option value="Rejected">Partial Payment</option>
    //       <option value="Rejected">Paid</option>
    //       <option value="Rejected">Bank Reject</option>
    //     </select>
    //   ),
    //   width: "180px",
    // },
  ];
  // console.log("selected", selectedBatches);

  // Apply filters whenever filters or original data changes
  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
  });

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    // console.log("Raw data:", data);
    // console.log("Current filters:", filters);

    const filtered = data.filter((item) => {
      const matchesVendor = item.vendorName
        ?.toLowerCase()
        .includes(filters.vendorName.toLowerCase());
      const matchesInvoice = item.invoiceNo
        ?.toLowerCase()
        .includes(filters.invoiceNo.toLowerCase());
      const matchesBatch = item.batchNo
        ?.toLowerCase()
        .includes(filters.batchNo.toLowerCase());

      // Date comparison logic
      let matchesDate = true;
      if (filters.filterDate) {
        const itemDate = dayjs(item.approvalDate);
        const filterDate = dayjs(filters.filterDate);
        matchesDate = itemDate.isSame(filterDate, "day");
      }

      return matchesVendor && matchesInvoice && matchesBatch && matchesDate;
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
  console.table("name", customerNames);
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
        <h4 className="mb-0">Validated Cases</h4>

        <Box
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5 className="mb-0"></h5>

          <div>
            {/* <Button
              sx={{
                background: "#7E00D1",

                "&:hover": {
                  background: "#7E00D1",
                },
              }}
              variant="contained"
              startIcon={<UploadFileIcon />}
            >
              Batch Schedule
            </Button> */}
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

      <Box
        sx={{
          display: selectedBatches.length > 0 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #A855F7",
          borderRadius: 2,
          p: 1.5,
          backgroundColor: "#F9FAFB",
          width: "100%",
          maxWidth: 1200,
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {selectedBatches.map((batch, index) => (
            <Chip
              key={`${batch.batchNo}-${index}`} // Using index as fallback in case batchNo is not unique
              label={`Batch ${batch.batchNo}`}
              onDelete={() => {
                setSelectedBatches(
                  selectedBatches.filter((b) => b.batchNo !== batch.batchNo)
                );
              }}
              sx={{ backgroundColor: "#F5EFFF", color: "#000" }}
            />
          ))}
        </Box>
        <Button
          onClick={() =>
            navigate("/finalPayment", { state: { selectedBatches } })
          }
          variant="contained"
          sx={{
            backgroundColor: "#8000EA",
            textTransform: "none",
            "&:hover": { backgroundColor: "#6900c7" },
          }}
        >
          Submit
        </Button>
      </Box>
      {/* <Box
        sx={{
          display: selectedBatches.length > 0 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #A855F7",
          borderRadius: 2,
          p: 1.5,
          backgroundColor: "#F9FAFB",
          width: "100%",
          maxWidth: 1200,
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {selectedBatches.map((batch) => (
            <Chip
              key={batch.id}
              label={`Batch${batch.batchNo}`}
              onDelete={() => {
                setSelectedBatches(
                  selectedBatches.filter((b) => b.id !== batch.id)
                );
              }}
              sx={{ backgroundColor: "#F5EFFF", color: "#000" }}
            />
          ))}
        </Box>
        <Button
          onClick={() =>
            navigate("/finalPayment", { state: { selectedBatches } })
          }
          variant="contained"
          sx={{
            backgroundColor: "#8000EA",
            textTransform: "none",
            "&:hover": { backgroundColor: "#6900c7" },
          }}
        >
          Submit
        </Button>
      </Box> */}

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

export default ValidateCases;

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
