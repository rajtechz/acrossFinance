import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Chip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import { baseURLProd } from "api/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import pdf3 from "../../../assets/images/users/pdf3.png";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function FinalPayment() {
  const [showFinalTable, setShowFinalTable] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [paymentData, setPaymentData] = useState({
    paymentDate: "", // Will be set via DatePicker
    paymentMode: "",
    gst: "",
    paymentMethod: "",
    partialAmount: 0,
    totalPayable: 0,
  });

  const location = useLocation();
  const { selectedBatches = [] } = location.state || {};
  console.table("hello table", selectedBatches);
  // Initialize selected rows from the passed data
  useEffect(() => {
    if (selectedBatches.length > 0) {
      setSelectedRows(
        selectedBatches.map((batch) => ({
          ...batch,
          selected: true, // Mark all initially as selected
        }))
      );
    }
  }, [selectedBatches]);

  useEffect(() => {
    const filtered = selectedRows.filter((row) => row.selected);

    const totalPayable = filtered.reduce(
      (acc, row) => acc + Number(row.payableAmount || 0),
      0
    );

    const partialAmount = filtered.reduce(
      (acc, row) => acc + Number(row.partialPaid || 0),
      0
    );

    setPaymentData({
      totalPayable: totalPayable.toFixed(2),
      partialAmount: partialAmount.toFixed(2),
    });
  }, [selectedRows]);

  const columns = [
    {
      name: "View",
      selector: (row) => row.view,
      cell: (row) => (
        <span style={{ cursor: "pointer" }}>
          <RemoveRedEyeIcon style={{ color: "#7E00D1" }} />
        </span>
      ),
    },
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.selected}
          disabled={
            row.status === "Batch Created" || row.status === "Invoice Uploaded"
          }
          onChange={(e) => {
            const updatedRows = selectedRows.map((item) =>
              item.batchNo === row.batchNo
                ? { ...item, selected: e.target.checked }
                : item
            );
            setSelectedRows(updatedRows);
          }}
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
    { name: "Schedule ID", selector: (row) => row.batchNo, width: "120px" },
    {
      name: "Batch No",
      selector: (row) => row.batchNo || "—",
      sortable: true,
      width: "120px",
    },

    {
      name: "Vendor Name",
      selector: (row) => row.vendorName || "—",
      width: "150px",
    },
    {
      name: "Approval Date",
      width: "150px",
      selector: (row) =>
        row.approvalDate
          ? new Date(row.approvalDate).toLocaleDateString()
          : "—",
    },
    {
      name: "Case Count",
      selector: (row) => row.caseCount || "—",
      sortable: true,
      width: "150px",
    },
    {
      name: "Invoice No",
      width: "150px",
      selector: (row) => row.invoiceNo || "—",
    },
    {
      name: "Invoice Date",
      width: "150px",
      selector: (row) =>
        row.invoiceDate ? new Date(row.invoiceDate).toLocaleDateString() : "—",
    },
    {
      name: "Invoice Amount",
      width: "150px",
      selector: (row) => row.invoiceAmount || "—",
    },
    {
      name: "Reimbursement",
      width: "150px",
      selector: (row) => row.reimbursement || "—",
    },
    {
      name: "Expense",
      selector: (row) => row.expense || "—",
    },
    {
      name: "GST",
      selector: (row) => row.gst || "—",
    },
    {
      name: "TDS",
      selector: (row) => row.tds || "—",
    },
    {
      name: "Payable",
      selector: (row) => row.payable || "—",
    },
    {
      name: "PDF",
      selector: (row) => row.pdF_FileUpload,
      cell: (row) => (
        <a
          href={`https://mintflix.live:8086${row.pdF_FileUpload}`}
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
      selector: (row) => row.invoiceStatus || "—",
      cell: (row) =>
        row.financeStatus ? (
          <Chip
            label={row.invoiceStatus}
            component="a"
            href="#"
            variant="outlined"
            clickable
            color="primary"
            sx={{ borderRadius: "20px" }}
          />
        ) : (
          "—"
        ),
      width: "200px",
    },
    {
      name: "Finance Status",
      selector: (row) => row.financeStatus || "—",
      cell: (row) =>
        row.financeStatus ? (
          <Chip
            label={row.financeStatus}
            component="a"
            href="#"
            variant="outlined"
            clickable
            color="success"
            sx={{ borderRadius: "20px" }}
          />
        ) : (
          "—"
        ),
      width: "200px",
    },
    {
      name: "Delete",
      selector: (row) => (
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const finalColumns = [
    ...columns.filter((col) => col.name !== "Select"),
    {
      name: "Partial Paid (₹)",
      width: "150px",
      cell: (row) => (
        <TextField
          type="text"
          size="small"
          value={row.partialPaid || ""}
          onChange={(e) => {
            const updatedRows = selectedRows.map((item) =>
              item.batchNo === row.batchNo
                ? { ...item, partialPaid: e.target.value }
                : item
            );
            setSelectedRows(updatedRows);
          }}
          fullWidth
        />
      ),
      ignoreRowClick: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Filter only selected rows
    const filteredBatches = selectedRows.filter((row) => row.selected);
    if (filteredBatches.length === 0) {
      alert("Please select at least one batch to proceed");
      return;
    }
    setShowFinalTable(true);
  };

  useEffect(() => {
    if (selectedBatches.length > 0) {
      setSelectedRows(
        selectedBatches.map((batch) => ({
          ...batch,
          selected: true,
          partialPaid: "", // initialize the field
        }))
      );
    }
  }, [selectedBatches]);
  const totalPayableAmount = selectedRows
    .filter((row) => row.selected)
    .reduce((acc, curr) => acc + Number(curr.payableAmount || 0), 0);
  const selectedData = selectedRows.filter((row) => row.selected);

  const handleFinanceSubmit = async () => {
    // Sirf selected rows filter karo
    const selectedData = selectedRows.filter((row) => row.selected);

    if (selectedData.length === 0) {
      alert("Please select at least one row to submit.");
      return;
    }

    // Total values calculate karo
    const totalBatch = selectedData.map((row) => row.batchNo).join(", ");
    const totalCaseCount = selectedData
      .reduce((acc, row) => acc + Number(row.caseCount || 0), 0)
      .toString();
    const totalReimbursement = selectedData
      .reduce((acc, row) => acc + Number(row.reimbursements || 0), 0)
      .toString();
    const totalExpense = selectedData
      .reduce((acc, row) => acc + Number(row.expense || 0), 0)
      .toString();
    const totalGST = selectedData
      .reduce((acc, row) => acc + Number(row.gst || 0), 0)
      .toString();
    const totalTDS = selectedData
      .reduce((acc, row) => acc + Number(row.tds || 0), 0)
      .toString();
    const totalPayable = selectedData
      .reduce((acc, row) => acc + Number(row.payable || 0), 0)
      .toString();
    const totalPartialPaidAmount = selectedData
      .reduce((acc, row) => acc + Number(row.partialPaid || 0), 0)
      .toString();

    // First row se common data lo (assumption: sab ek jaise hain)
    const first = selectedData[0];

    // Payload banao
    const payload = {
      scheduleID: first.scheduleID || "",
      batchNo: first.batchNo || "",
      aA_Number: first.aA_Number || "",
      vendorName: first.vendorName || "",
      approvalDate: first.approvalDate || "",
      caseCount: first.caseCount?.toString() || "0",
      invoiceNo: first.invoiceNo || "",
      invoiceDate: first.invoiceDate || "",
      invoiceAmount: first.invoiceAmount?.toString() || "0",
      reimbursements: first.reimbursements?.toString() || "0",
      expense: first.expense?.toString() || "0",
      gst: first.gst?.toString() || "0",
      tds: first.tds?.toString() || "0",
      payable: first.payable?.toString() || "0",
      partialPaidAmount: first.partialPaid?.toString() || "0",
      invoiceStatus: first.invoiceStatus || "",
      financeStatus: first.financeStatus || "",
      paymentDate: new Date().toISOString(),
      paymentType: "Online", // hardcoded example
      paymentMode: "UPI", // hardcoded example
      // Total values
      totalBatch: totalBatch,
      totalCaseCount: "",
      totalReimbursement: "",
      totalExpense: "",
      totalGST: "",
      totalTDS: "",
      totalPayable: "",
      totalAmountPayable: totalPayable,
      totalPartialPaidAmount: "",
    };
    console.log("Payload being sent:", payload);
    // API call
    try {
      const response = await fetch(
        "https://mintflix.live:8086/api/Auto/InsertFinancePaymentData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);
      if (response.ok) {
        console.log("API Success:", result);
      } else {
        console.error("API Error Response:", result);
        alert("API error occurred.");
      }
    } catch (error) {
      console.error("API Call Failed:", error);
      alert("Something went wrong while submitting.");
    }
  };

  const handleScheduledPaymentSubmit = async () => {
    const selectedData = selectedRows.filter((row) => row.selected);

    if (selectedData.length === 0) {
      alert("Please select at least one row.");
      return;
    }

    try {
      for (const row of selectedData) {
        const payload = {
          scheduledId: row.aaNo || "123456",
          aaNo: row.aaNo || "",
          imeiNo: row.imeiNo || "",
          creationDate: row.creationDate || "",
          closureDate: row.closureDate || "",
          customerName: row.customerName || "",
          serviceType: row.serviceType || "",
          brand: row.brand || "",
          makeModel: row.makeModel || "",
          repairCharges: row.repairCharges || "",
          chargesInclGST: row.chargesInclGST || "",
          total: row.total || "",
          invoiceStatus: row.invoiceStatus || "",
          batchNo: row.batchNo || "",
          selectedService: row.selectedService || "",
          totalRepairCharges: row.totalRepairCharges || "",
          grossAmount: row.grossAmount || "0",
          finalAmount: row.finalAmount || "0",
          gst: row.gst || "",
          invoiceNo: row.invoiceNo || "",
          invoiceDate: row.invoiceDate || "",
          invoiceAmount: row.invoiceAmount || "",
          invoice: row.invoice || "",
          vendorName: row.vendorName || "",
          caseCount: Number(row.caseCount || 0),
          financeStatus: row.financeStatus || "",
          paymentDate:
            paymentData.paymentDate || new Date().toISOString().split("T")[0],
          paymentType: paymentData.paymentMode || "Online",
          gstStatus: paymentData.gst || "",
          paymentMode: paymentData.paymentMethod || "Reimbursement",
          totalAmount: row.payable || "0",
        };

        const response = await fetch(
          "https://mintflix.live:8086/api/Auto/InsertScheduledPaymentData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();
        console.log(`Response for batch ${row.batchNo}:`, result);

        if (!response.ok) {
          alert(`Failed to submit batch ${row.batchNo}`);
          return;
        }
      }

      alert("Scheduled payment data submitted successfully.");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong while submitting payment data.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography
        variant="h5"
        align="center"
        style={{
          backgroundColor: "#E6EEF7",
          padding: "16px 24px",
          borderRadius: "12px",
          fontWeight: 600,
        }}
      >
        Final Payment
      </Typography>

      <Box
        m={2}
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Button
          variant="outlined"
          sx={{ borderColor: "#7E00D1", color: "black", fontWeight: "bold" }}
        >
          Total no of selected service:{" "}
          {selectedRows.filter((r) => r.selected).length}
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={selectedRows}
        fixedHeader
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
        customStyles={customStyles}
      />

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          {/* <FormControl fullWidth size="small">
            <TextField
              name="paymentDate"
              label="Select Payment Date"
              type="date"
              value={paymentData.paymentDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </FormControl> */}

          <FormControl fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Payment Date"
                format="DD-MM-YYYY"
                value={
                  paymentData.paymentDate
                    ? dayjs(paymentData.paymentDate)
                    : null
                }
                minDate={dayjs()}
                onChange={(newValue) => {
                  setPaymentData((prev) => ({
                    ...prev,
                    paymentDate: dayjs(newValue).format("YYYY-MM-DD"),
                  }));
                }}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Payment Type</InputLabel>
            <Select
              name="paymentMode"
              value={paymentData.paymentMode}
              onChange={handleInputChange}
              label="Payment Type"
            >
              <MenuItem value="Partial Payment">Partial Payment</MenuItem>
              <MenuItem value="Full Payment">Full Payment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>GST</InputLabel>
            <Select
              name="gst"
              value={paymentData.gst}
              onChange={handleInputChange}
              label="GST"
            >
              <MenuItem value="GST Hold">GST Hold</MenuItem>
              <MenuItem value="GST Release">GST Release</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handleInputChange}
              label="Payment Method"
            >
              <MenuItem value="Reimbursement">Reimbursement</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#7E00D1",
              color: "#7E00D1",
              fontWeight: "bold",
            }}
          >
            Total Amount: ₹{totalPayableAmount}
          </Button>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        mt={4}
        flexWrap="wrap"
      >
        <Button
          onClick={() => setShowFinalTable(false)}
          variant="outlined"
          sx={{ borderColor: "#7E00D1", color: "#7E00D1", fontWeight: "bold" }}
        >
          Cancel
        </Button>
        {/* <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#7E00D1", color: "#fff" }}
        >
          Submitdd
        </Button> */}

        <Button
          variant="contained"
          sx={{ backgroundColor: "#2e7d32", color: "#fff", px: 4 }}
          onClick={handleScheduledPaymentSubmit}
        >
          Submit Scheduled Payment
        </Button>
      </Box>

      {showFinalTable && (
        <>
          {/* Payment Details Row */}

          {/* Payment Table */}
          <Box mt={4}>
            <DataTable
              columns={finalColumns}
              data={selectedRows.filter((row) => row.selected)}
              fixedHeader
              customStyles={customStyles}
            />
          </Box>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" sx={buttonStyle}>
                {paymentData.paymentDate}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" sx={buttonStyle}>
                {paymentData.paymentMode}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" sx={buttonStyle}>
                {paymentData.gst}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" sx={buttonStyle}>
                {paymentData.paymentMethod}
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box mt={2}>
              <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#f0f6ff" }}>
                    <TableRow>
                      <TableCell>
                        <strong>Batch</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Case Count</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Reimbursement</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Expense</strong>
                      </TableCell>
                      <TableCell>
                        <strong>GST</strong>
                      </TableCell>
                      <TableCell>
                        <strong>TDS</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Payable</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.batchNo}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            variant="outlined"
                            value={row.caseCount || 0}
                            sx={{ width: 60 }}
                          />
                        </TableCell>
                        <TableCell>
                          {Number(row.reimbursement || 0).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {Number(row.expense || 0).toFixed(2)}
                        </TableCell>
                        <TableCell>{Number(row.gst || 0).toFixed(2)}</TableCell>
                        <TableCell>{Number(row.tds || 0).toFixed(2)}</TableCell>
                        <TableCell>
                          {Number(row.payableAmount || 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          {/* Summary and Confirm Button */}
          {/* <Grid container spacing={2} mt={4} justifyContent="flex-end">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #A259FF",
                  borderRadius: "8px",
                  padding: "12px",
                  fontWeight: 600,
                }}
              >
                Total Amount Payable:{" "}
                <span style={{ float: "right" }}>
                  ₹{paymentData.totalPayable}
                </span>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #A259FF",
                  borderRadius: "8px",
                  padding: "12px",
                  fontWeight: 600,
                }}
              >
                Total Partial Paid Amount:{" "}
                <span style={{ float: "right" }}>
                  ₹{paymentData.partialAmount}
                </span>
              </Box>
            </Grid>
          </Grid> */}

          <Grid container spacing={2} mt={4} justifyContent="flex-end">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #A259FF",
                  borderRadius: "8px",
                  padding: "12px",
                  fontWeight: 600,
                }}
              >
                Total Amount Payable:{" "}
                <span style={{ float: "right" }}>
                  ₹{paymentData.totalPayable}
                </span>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #A259FF",
                  borderRadius: "8px",
                  padding: "12px",
                  fontWeight: 600,
                }}
              >
                Total Partial Paid Amount:{" "}
                <span style={{ float: "right" }}>
                  ₹{paymentData.partialAmount}
                </span>
              </Box>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7E00D1", color: "#fff", px: 4 }}
              onClick={() => {
                setShowFinalTable(false);
                handleFinanceSubmit();
              }}
            >
              Payment
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

export default FinalPayment;
const buttonStyle = {
  borderRadius: "8px",
  borderColor: "#ccc",
  textTransform: "none",
  fontWeight: 500,
  width: "100%", // full width of grid item
  justifyContent: "flex-start", // aligns text to the left like in the image
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
