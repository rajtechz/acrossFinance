import React, { useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  TextField,
  FormControl,
  Select,
  Chip,
  MenuItem,
  InputLabel,
  InputAdornment,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RejectedCasesHook from "./RejectedCasesHook";
import pdf3 from "../../../assets/images/users/pdf3.png";
import { useNavigate } from "react-router-dom";
const RejectedCases = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
  });
  const [filteredData, setFilteredData] = useState([]);
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
  } = RejectedCasesHook();


  console.log("this is response of ",data)

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

  const handleClearDate = () => {
    setFilters((prev) => ({
      ...prev,
      filterDate: null,
    }));
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
    { name: "GST", selector: (row) => row.gst, width: "150px" },
    // { name: "TDS", selector: (row) => row.tds, width: "150px" },
    // { name: "Payable", selector: (row) => row.payable, width: "150px" },

    {
      name: "Payable",
      selector: (row) => row.finalAmount,
      width: "150px",
    },
    {
      name: "Invoice",
      selector: (row) => row.pdf,
      cell: (row) => (
        <a
          href={`${row.pdf}`}
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
     
    {
      name: "Remarks",
      selector: (row) => row.issue,
      width: "200px",
      cell: (row) => {
        const words = row.issue?.split(" ") || [];
        const lines = [];
        for (let i = 0; i < words.length; i += 3) {
          lines.push(words.slice(i, i + 3).join(" "));
        }
        return (
          <div>
            {lines.map((line, index) => (
              <div key={index} className="text-center">
                {line}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      name: "Remarks DOC",
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
      name: "Invoice Status",
      selector: (row) => (
        <Chip
          label={row.invoiceStatus || "--"}
          color="success"
          variant="outlined"
          sx={{ borderRadius: "20px" }}
        />
      ),
      width: "180px",
    },
    {
      name: "Finance Status",
      selector: (row) => (
        <Chip
          label={row.financeStatus || "--"}
          color="error"
          variant="outlined"
          sx={{ borderRadius: "20px" }}
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
  const totalAmount = selectedRow?.total
    ?.split(",")
    .map((val) => parseFloat(val.trim()))
    .filter((val) => !isNaN(val))
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
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
          <h5 className="mb-0">Reject Cases</h5>
        </Box>

        <Grid mb={3} container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              name="vendorName"
              variant="outlined"
              placeholder="Vendor Name"
              value={filters.vendorName}
              onChange={handleFilterChange}
              fullWidth
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
            {filters.filterDate && (
              <Button
                onClick={handleClearDate}
                style={{ marginLeft: "8px" }}
                variant="outlined"
                size="small"
              >
                Clear
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          customStyles={customStyles}
        /> */}
        <DataTable
          columns={columns}
          // data={data}
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
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button variant="outlined">
              Total Amount :{selectedRow?.total}
            </Button>
          </Box> */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button variant="outlined">Total Amount: ₹ {totalAmount}</Button>
          </Box>
          ;
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
      {/* <Dialog
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
              <Grid item xs={12}>
                <strong>Vendor Name</strong>
                <span
                  style={{
                    background: "#F5F5F5",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    float: "right",
                  }}
                >
                  AAN No - <strong>{selectedRow?.bpbxId || "123456789"}</strong>
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
                    onChange={(e) => setInvoiceFile(e.target.files[0])}
                  />
                </div>
                {invoiceFile && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    Selected file: <strong>{invoiceFile.name}</strong>
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

export default RejectedCases;
