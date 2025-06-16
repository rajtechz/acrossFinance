


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Grid,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   Chip,
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import { useLocation } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import pdf3 from "../../../assets/images/users/pdf3.png";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import dayjs from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import FinalPaymentHook from "./FinalPaymentHook";
// import { useNavigate } from "react-router-dom";

// function FinalPayment() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [openBox, setOpenBox] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [customerNames, setCustomerNames] = useState([]);
//   const [imeis, setImeis] = useState([]);
//   const [serviceTypes, setServiceTypes] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [models, setModels] = useState([]);
//   const [repairs, setRepairs] = useState([]);
//   const [gstCharges, setGstCharges] = useState([]);
//   const [grossAmount, setGrossAmount] = useState([]);
//   const [aaNos, setAaNos] = useState([]);
//   const [maxLength, setMaxLength] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [paymentData, setPaymentData] = useState({
//     paymentDate: "",
//     paymentMode: "",
//     gst: "",
//     paymentMethod: "",
//     partialAmount: 0,
//     totalPayable: 0,
//   });

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { selectedBatches = [] } = location.state || {};

//   const handleOpenDialog = (row) => {
//     setSelectedRow(row);
//     const parseField = (field) =>
//       field ? field.split(",").map((s) => s.trim()) : [];
//     const cNames = parseField(row.customerName);
//     const imeiList = parseField(row.imeiNo);
//     const stypes = parseField(row.serviceType);
//     const bList = parseField(row.brand);
//     const mList = parseField(row.makeModel);
//     const rCharges = parseField(row.repairCharges);
//     const gstList = parseField(row.chargesInclGST);
//     const gAmount = parseField(row.total);
//     const aaList = parseField(row.aaNo).slice(0, row.caseCount || 0);
//     const max = Math.max(
//       cNames.length,
//       imeiList.length,
//       stypes.length,
//       bList.length,
//       mList.length,
//       rCharges.length,
//       gstList.length,
//       gAmount.length,
//       aaList.length
//     );
//     const totalAmt = gAmount
//       .slice(0, row.caseCount || 0)
//       .reduce((acc, val) => acc + Number(val || 0), 0);
//     setCustomerNames(cNames.slice(0, row.caseCount || 0));
//     setImeis(imeiList.slice(0, row.caseCount || 0));
//     setServiceTypes(stypes.slice(0, row.caseCount || 0));
//     setBrands(bList.slice(0, row.caseCount || 0));
//     setModels(mList.slice(0, row.caseCount || 0));
//     setRepairs(rCharges.slice(0, row.caseCount || 0));
//     setGstCharges(gstList.slice(0, row.caseCount || 0));
//     setGrossAmount(gAmount.slice(0, row.caseCount || 0));
//     setAaNos(aaList);
//     setMaxLength(max);
//     setTotalAmount(totalAmt.toFixed(2));
//     setOpenBox(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenBox(false);
//   };

//   useEffect(() => {
//     if (selectedBatches.length > 0) {
//       console.log(
//         "Raw selectedBatches:",
//         JSON.stringify(selectedBatches, null, 2)
//       );
//       setSelectedRows(
//         selectedBatches.map((batch) => ({
//           ...batch,
//           selected: true,
//           partialPaid: "",
//           selectedAaNos: batch.aaNo
//             ? batch.aaNo.split(",").map((s) => s.trim()).slice(0, batch.caseCount || 0)
//             : [],
//         }))
//       );
//     }
//   }, [selectedBatches]);

//   useEffect(() => {
//     const filtered = selectedRows.filter((row) => row.selected);
//     const totalPayable = filtered.reduce((acc, row) => {
//       const reimbursement =
//         paymentData.paymentMethod === "Expense"
//           ? 0
//           : Number(row.reimbursement || 0);
//       const expense =
//         paymentData.paymentMethod === "Reimbursement"
//           ? 0
//           : Number(row.expense || 0);
//       const baseAmount = reimbursement + expense;
//       const gstRate =
//         paymentData.gst === "GST Hold" ? 0 : Number(row.gst || 0);
//       const tdsRate = Number(row.tds || 0);
//       const gstAmount = baseAmount * (gstRate / 100);
//       const tdsAmount = baseAmount * (tdsRate / 100);
//       const payable = baseAmount + gstAmount - tdsAmount;
//       return acc + payable;
//     }, 0);

//     const partialAmount = filtered.reduce(
//       (acc, row) => acc + Number(row.partialPaid || 0),
//       0
//     );

//     setPaymentData((prev) => ({
//       ...prev,
//       totalPayable: totalPayable.toFixed(2),
//       partialAmount: partialAmount.toFixed(2),
//     }));
//   }, [selectedRows, paymentData.gst, paymentData.paymentMethod]);

//   const handleDeleteRow = (batchNo) => {
//     const updatedRows = selectedRows.filter((item) => item.batchNo !== batchNo);
//     setSelectedRows(updatedRows);
//   };

//   const handleCheckboxChange = (batchNo, checked) => {
//     const updatedRows = selectedRows.map((row) =>
//       row.batchNo === batchNo ? { ...row, selected: checked } : row
//     );
//     setSelectedRows(updatedRows);
//   };

//   // Handler for editing caseCount and updating selected aaNos with validation
//   const handleCaseCountChange = (batchNo, newValue) => {
//     const updatedRows = selectedRows.map((row) => {
//       if (row.batchNo === batchNo) {
//         const allAaNos = row.aaNo ? row.aaNo.split(",").map((s) => s.trim()) : [];
//         const maxCount = allAaNos.length; // Maximum allowable count based on aaNo entries
//         const newCount = Math.max(0, Math.min(parseInt(newValue) || 0, maxCount)); // Ensure non-negative and not greater than aaNo count
//         const selectedAaNos = allAaNos.slice(0, newCount); // Select first `newCount` aaNos

//         // Optional: Alert if the user tries to set a count greater than aaNo length
//         if (parseInt(newValue) > maxCount) {
//           alert(`Count cannot exceed the number of aaNo entries (${maxCount}).`);
//         }

//         return { ...row, caseCount: newCount, selectedAaNos };
//       }
//       return row;
//     });
//     setSelectedRows(updatedRows);
//   };

//   const columns = [
//     {
//       name: "View",
//       selector: (row) => row.view,
//       cell: (row) => (
//         <span
//           style={{ cursor: "pointer" }}
//           onClick={() => handleOpenDialog(row)}
//         >
//           <RemoveRedEyeIcon style={{ color: "#7E00D1" }} />
//         </span>
//       ),
//     },
//     {
//       name: "Select",
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={row.selected || false}
//           disabled={
//             row.invoiceStatus === "Batch Created" ||
//             row.invoiceStatus === "Invoice Uploaded"
//           }
//           className="form-check-input"
//           onChange={(e) => handleCheckboxChange(row.batchNo, e.target.checked)}
//         />
//       ),
//       ignoreRowClick: true,
//     },
//     { name: "Schedule ID", selector: (row) => row.batchNo, width: "120px" },
//     {
//       name: "Batch No",
//       selector: (row) => row.batchNo || "—",
//       sortable: true,
//       width: "120px",
//     },
//     {
//       name: "Vendor Name",
//       selector: (row) => row.vendorName || "—",
//       width: "150px",
//     },
//     {
//       name: "Approval Date",
//       width: "150px",
//       selector: (row) =>
//         row.approvalDate
//           ? new Date(row.approvalDate).toLocaleDateString()
//           : "—",
//     },
//     {
//       name: "Case Count",
//       selector: (row) => row.caseCount || "—",
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Invoice No",
//       width: "150px",
//       selector: (row) => row.invoiceNo || "—",
//     },
//     {
//       name: "Invoice Date",
//       width: "150px",
//       selector: (row) =>
//         row.invoiceDate ? new Date(row.invoiceDate).toLocaleDateString() : "—",
//     },
//     {
//       name: "Invoice Amount",
//       width: "150px",
//       selector: (row) => row.invoiceAmount || "—",
//     },
//     {
//       name: "Reimbursement",
//       width: "150px",
//       selector: (row) => row.reimbursement || "200",
//     },
//     {
//       name: "Expense",
//       selector: (row) => row.expense || "—",
//     },
//     {
//       name: "GST",
//       selector: (row) => `${row.gst}%` || "—",
//     },
//     {
//       name: "TDS",
//       selector: (row) => `${row.tds}%` || "—",
//     },
//     {
//       name: "Payable",
//       selector: (row) => row.finalAmount || "—",
//     },
//     {
//       name: "Invoice",
//       selector: (row) => row.invoice,
//       cell: (row) => (
//         <a href={row.invoice} target="_blank" rel="noopener noreferrer">
//           <img src={pdf3} alt="PDF" style={{ width: "24px", height: "24px" }} />
//         </a>
//       ),
//       width: "150px",
//     },
//     {
//       name: "Invoice Status",
//       selector: (row) => row.invoiceStatus || "—",
//       cell: (row) =>
//         row.financeStatus ? (
//           <Chip
//             label={row.invoiceStatus}
//             component="a"
//             href="#"
//             variant="outlined"
//             clickable
//             color="primary"
//             sx={{ borderRadius: "20px" }}
//           />
//         ) : (
//           "—"
//         ),
//       width: "200px",
//     },
//     {
//       name: "Finance Status",
//       selector: (row) => row.financeStatus || "—",
//       cell: (row) =>
//         row.financeStatus ? (
//           <Chip
//             label={row.financeStatus}
//             component="a"
//             href="#"
//             variant="outlined"
//             clickable
//             color="success"
//             sx={{ borderRadius: "20px" }}
//           />
//         ) : (
//           "—"
//         ),
//       width: "200px",
//     },
//     {
//       name: "Delete",
//       cell: (row) => (
//         <IconButton color="error" onClick={() => handleDeleteRow(row.batchNo)}>
//           <DeleteIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const sanitizeNumber = (value) => {
//     if (
//       !value ||
//       value === "" ||
//       value.trim() === "," ||
//       value.trim() === ", "
//     ) {
//       return "0.00";
//     }
//     if (typeof value === "number") {
//       return value.toFixed(2);
//     }
//     if (typeof value === "string") {
//       const values = value
//         .split(",")
//         .map((v) => v.trim())
//         .filter((v) => v !== "" && !isNaN(parseFloat(v)));
//       if (values.length === 0) {
//         return "0.00";
//       }
//       const total = values.reduce((acc, val) => acc + parseFloat(val), 0);
//       return total.toFixed(2);
//     }
//     return "0.00";
//   };

//   const validateRowData = (row) => {
//     const numericFields = [
//       "repairCharges",
//       "chargesInclGST",
//       "total",
//       "reimbursment",
//       "totalRepairCharges",
//       "grossAmount",
//       "finalAmount",
//       "invoiceAmount",
//       "tds",
//       "partialPaid",
//     ];
//     const validatedRow = { ...row };
//     numericFields.forEach((field) => {
//       if (
//         validatedRow[field] === ", " ||
//         validatedRow[field] === "" ||
//         validatedRow[field] === null ||
//         validatedRow[field] === undefined
//       ) {
//         console.warn(
//           `Invalid value for ${field} in row ${row.batchNo}: ${validatedRow[field]}`
//         );
//         validatedRow[field] = "0.00";
//       } else {
//         validatedRow[field] = sanitizeNumber(validatedRow[field]);
//       }
//     });
//     return validatedRow;
//   };

//   const handleScheduledPaymentSubmit = async () => {
//     const selectedData = selectedRows.filter((row) => row.selected);
//     if (selectedData.length === 0) {
//       alert("Please select at least one row to submit.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const selectedDate = dayjs(paymentData.paymentDate).startOf("day");
//       const today = dayjs().startOf("day");

//       if (selectedDate.isAfter(today)) {
//         const validatedData = selectedData.map(validateRowData);
//         for (const row of validatedData) {
//           const reimbursement =
//             paymentData.paymentMethod === "Expense"
//               ? 0
//               : Number(row.reimbursement || 0);
//           const expense =
//             paymentData.paymentMethod === "Reimbursement"
//               ? 0
//               : Number(row.expense || 0);
//           const baseAmount = reimbursement + expense;
//           const gstRate =
//             paymentData.gst === "GST Hold" ? 0 : Number(row.gst || 0);
//           const tdsRate = Number(row.tds || 2);

//           const payload = {
//             scheduledId: row.batchNo || "N/A",
//             aaNo: row.selectedAaNos.join(", ") || "",
//             imeiNo: row.imeiNo || "",
//             creationDate: row.creationDate || "",
//             closureDate: row.closureDate || "",
//             customerName: row.customerName || "",
//             serviceType: row.serviceType || "",
//             brand: row.brand || "",
//             makeModel: row.makeModel || "",
//             repairCharges: sanitizeNumber(row.repairCharges),
//             chargesInclGST: sanitizeNumber(row.chargesInclGST),
//             total: sanitizeNumber(row.total),
//             invoiceStatus: row.invoiceStatus || "",
//             batchNo: row.batchNo || "",
//             selectedService: row.selectedService || "",
//             reimbursment: reimbursement,
//             totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
//             grossAmount: sanitizeNumber(row.grossAmount),
//             finalAmount: sanitizeNumber(
//               baseAmount +
//                 baseAmount * (gstRate / 100) -
//                 baseAmount * (tdsRate / 100)
//             ),
//             gst: gstRate.toString(),
//             tds: tdsRate.toString(),
//             invoiceNo: row.invoiceNo || "",
//             invoiceDate: row.invoiceDate || "",
//             invoiceAmount: sanitizeNumber(row.invoiceAmount),
//             invoice: row.invoice || "",
//             vendorName: row.vendorName || "",
//             caseCount: Number(row.caseCount || 0),
//             financeStatus: row.financeStatus || "",
//             paymentDate:
//               paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
//             paymentType: paymentData.paymentMode || "",
//             gstStatus: paymentData.gst || "",
//             paymentMode: paymentData.paymentMethod || "",
//             totalAmount: sanitizeNumber(
//               baseAmount +
//                 baseAmount * (gstRate / 100) -
//                 baseAmount * (tdsRate / 100)
//             ),
//             totalPartialPaidAmount: paymentData.partialAmount,
//             partialPaidAmount: sanitizeNumber(row.partialPaid),
//           };

//           console.log(
//             "Future Payment Payload:",
//             JSON.stringify(payload, null, 2)
//           );
//           const response = await fetch(
//             "https://mintflix.live:8086/api/Auto/InsertScheduledPaymentData",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(payload),
//             }
//           );
//           const result = await response.json();
//           if (!response.ok) {
//             throw new Error(
//               result.message || "Failed to submit future payment"
//             );
//           }
//         }
//         alert("✅ Future payments submitted successfully.");
//       } else {
//         const validatedData = selectedData.map(validateRowData);
//         for (const row of validatedData) {
//           const reimbursement =
//             paymentData.paymentMethod === "Expense"
//               ? 0
//               : Number(row.reimbursement || 0);
//           const expense =
//             paymentData.paymentMethod === "Reimbursement"
//               ? 0
//               : Number(row.expense || 0);
//           const baseAmount = reimbursement + expense;
//           const gstRate =
//             paymentData.gst === "GST Hold" ? 0 : Number(row.gst || 0);
//           const tdsRate = Number(row.tds || 0);

//           const payload = {
//             scheduledId: row.scheduledId || row.batchNo || "N/A",
//             aaNo: row.selectedAaNos.join(", ") || "",
//             imeiNo: row.imeiNo || "",
//             creationDate: row.creationDate || "",
//             closureDate: row.closureDate || "",
//             customerName: row.customerName || "",
//             serviceType: row.serviceType || "",
//             partialPaidAmount: sanitizeNumber(row.partialPaid),
//             brand: row.brand || "",
//             makeModel: row.makeModel || "",
//             repairCharges: sanitizeNumber(row.repairCharges),
//             chargesInclGST: sanitizeNumber(row.chargesInclGST),
//             total: sanitizeNumber(row.total),
//             invoiceStatus: row.invoiceStatus || "",
//             batchNo: row.batchNo || "",
//             selectedService: row.selectedService || "",
//             reimbursment: reimbursement,
//             totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
//             grossAmount: sanitizeNumber(row.grossAmount),
//             finalAmount: sanitizeNumber(
//               baseAmount +
//                 baseAmount * (gstRate / 100) -
//                 baseAmount * (tdsRate / 100)
//             ),
//             gst: gstRate.toString(),
//             tds: tdsRate.toString(),
//             invoiceNo: row.invoiceNo || "",
//             invoiceDate: row.invoiceDate || "",
//             invoiceAmount: sanitizeNumber(row.invoiceAmount),
//             invoice: row.invoice || "",
//             vendorName: row.vendorName || "",
//             caseCount: Number(row.caseCount || 0),
//             financeStatus: row.financeStatus || "",
//             paymentDate:
//               paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
//             paymentType: paymentData.paymentMode || "Online",
//             gstStatus: paymentData.gst || "",
//             paymentMode: paymentData.paymentMethod || "Reimbursement",
//             totalAmount: sanitizeNumber(
//               baseAmount +
//                 baseAmount * (gstRate / 100) -
//                 baseAmount * (tdsRate / 100)
//             ),
//             totalPartialPaidAmount: paymentData.partialAmount,
//           };

//           console.log(
//             "Today's Payment Payload:",
//             JSON.stringify(payload, null, 2)
//           );
//           const response = await fetch(
//             "https://mintflix.live:8086/api/Auto/InsertFullAndPartialPayment",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(payload),
//             }
//           );
//           const result = await response.json();
//           if (!response.ok) {
//             throw new Error(
//               result.message || "Failed to submit today's payment"
//             );
//           }
//         }
//         alert("✅ Today's payments submitted successfully.");
//       }

//       setSelectedRows([]);
//       setPaymentData({
//         paymentDate: "",
//         paymentMode: "",
//         gst: "",
//         paymentMethod: "",
//         partialAmount: 0,
//         totalPayable: 0,
//       });
//     } catch (error) {
//       console.error("❌ Submission Error:", error);
//       alert(`❌ Submission failed: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const totalPayableAmount = selectedRows
//     .filter((row) => row.selected)
//     .reduce((acc, curr) => acc + Number(curr.payableAmount || 0), 0);

//   return (
//     <div style={{ padding: 24 }}>
//       <Typography
//         variant="h5"
//         align="center"
//         style={{
//           backgroundColor: "#E6EEF7",
//           padding: "16px 24px",
//           borderRadius: "12px",
//           fontWeight: 600,
//         }}
//       >
//        Send for  Final Payment
//       </Typography>

//       <Box
//         m={2}
//         display="flex"
//         justifyContent="space-between"
//         flexWrap="wrap"
//         gap={2}
//       >
//         <Button
//           variant="outlined"
//           sx={{ borderColor: "#7E00D1", color: "black", fontWeight: "bold" }}
//         >
//           Total no of selected service:{" "}
//           {selectedRows.filter((r) => r.selected).length}
//         </Button>
//       </Box>

//       <DataTable
//         columns={columns}
//         data={selectedRows}
//         fixedHeader
//         pagination
//         paginationPerPage={10}
//         paginationRowsPerPageOptions={[10, 15, 20, 25]}
//         customStyles={customStyles}
//       />

//       <Grid container spacing={2} mt={2}>
//         <Grid item xs={12} sm={6} md={3}>
//           <FormControl fullWidth size="small">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Payment Date"
//                 format="DD-MM-YYYY"
//                 value={
//                   paymentData.paymentDate
//                     ? dayjs(paymentData.paymentDate)
//                     : null
//                 }
//                 minDate={dayjs()}
//                 onChange={(newValue) => {
//                   const selected = dayjs(newValue).startOf("day");
//                   setPaymentData((prev) => ({
//                     ...prev,
//                     paymentDate: selected.format("YYYY-MM-DD"),
//                   }));
//                 }}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Payment Type</InputLabel>
//             <Select
//               name="paymentMode"
//               value={paymentData.paymentMode}
//               onChange={handleInputChange}
//               label="Payment Type"
//             >
//               <MenuItem value="Partial Payment">Partial Payment</MenuItem>
//               <MenuItem value="Full Payment">Full Payment</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <FormControl fullWidth size="small">
//             <InputLabel>GST</InputLabel>
//             <Select
//               name="gst"
//               value={paymentData.gst}
//               onChange={handleInputChange}
//               label="GST"
//             >
//               <MenuItem value="GST Hold">GST Hold</MenuItem>
//               <MenuItem value="GST Release">GST Release</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Payment Method</InputLabel>
//             <Select
//               name="paymentMethod"
//               value={paymentData.paymentMethod}
//               onChange={handleInputChange}
//               label="Payment Method"
//             >
//               <MenuItem value="Reimbursement">Reimbursement</MenuItem>
//               <MenuItem value="Both">Both</MenuItem>
//               <MenuItem value="Expense">Expense</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {(paymentData.paymentMode === "Partial Payment" || paymentData.paymentMode === "Full Payment") && (
//         <>
//           <Box mt={4}>
//             <Typography variant="h3" mb={2}>
//               {paymentData.paymentMode === "Partial Payment" ? "Partial Payment" : "Full Payment"}
//             </Typography>
//             <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#EBF3FF" }}>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Count
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Reimbursement
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Expense
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     GST
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     TDS
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Payable
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {selectedRows
//                   .filter((row) => row.selected)
//                   .map((row, index) => {
//                     const reimbursement =
//                       paymentData.paymentMethod === "Expense"
//                         ? 0
//                         : Number(row.reimbursement || 0);
//                     const expense =
//                       paymentData.paymentMethod === "Reimbursement"
//                         ? 0
//                         : Number(row.expense || 0);
//                     const baseAmount = reimbursement + expense;
//                     const gstRate =
//                       paymentData.gst === "GST Hold"
//                         ? 0
//                         : Number(row.gst || 0);
//                     const tdsRate = Number(row.tds || 0);
//                     const payable =
//                       baseAmount +
//                       baseAmount * (gstRate / 100) -
//                       baseAmount * (tdsRate / 100);

//                     return (
//                       <TableRow
//                         key={index}
//                         sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
//                       >
//                         <TableCell>{row.caseCount || "—"}</TableCell>
//                         <TableCell>
//                           {reimbursement > 0 ? reimbursement : "—"}
//                         </TableCell>
//                         <TableCell>{expense > 0 ? expense : "—"}</TableCell>
//                         <TableCell>{gstRate > 0 ? `${gstRate}%` : "0%"}</TableCell>
//                         <TableCell>
//                           {tdsRate > 0 ? `${tdsRate}%` : "—"}
//                         </TableCell>
//                         <TableCell>{payable.toFixed(2) || "—"}</TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 {selectedRows.filter((row) => row.selected).length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">
//                       No rows selected
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>

//             <Typography variant="h3" mt={2}>
//               Amount to pay
//             </Typography>

//             <Table sx={{ minWidth: 650, border: "1px solid #ddd", mt: 2 }}>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#EBF3FF" }}>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Count
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Reimbursement
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Expense
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     GST
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     TDS
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                     Payable
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {selectedRows
//                   .filter((row) => row.selected)
//                   .map((row, index) => {
//                     const reimbursement =
//                       paymentData.paymentMethod === "Expense"
//                         ? 0
//                         : Number(row.reimbursement || 0);
//                     const expense =
//                       paymentData.paymentMethod === "Reimbursement"
//                         ? 0
//                         : Number(row.expense || 0);
//                     const baseAmount = reimbursement + expense;
//                     const gstRate =
//                       paymentData.gst === "GST Hold"
//                         ? 0
//                         : Number(row.gst || 0);
//                     const tdsRate = Number(row.tds || 0);
//                     const payable =
//                       baseAmount +
//                       baseAmount * (gstRate / 100) -
//                       baseAmount * (tdsRate / 100);

//                     return (
//                       <TableRow
//                         key={index}
//                         sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
//                       >
//                         <TableCell>
//                           <TextField
//                             size="small"
//                             type="number"
//                             value={row.caseCount || ""}
//                             onChange={(e) =>
//                               handleCaseCountChange(
//                                 row.batchNo,
//                                 e.target.value
//                               )
//                             }
//                             sx={{ width: "100px" }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           {reimbursement > 0 ? reimbursement : "—"}
//                         </TableCell>
//                         <TableCell>{expense > 0 ? expense : "—"}</TableCell>
//                         <TableCell>{gstRate > 0 ? `${gstRate}%` : "0%"}</TableCell>
//                         <TableCell>
//                           {tdsRate > 0 ? `${tdsRate}%` : "—"}
//                         </TableCell>
//                         <TableCell>{payable.toFixed(2) || "—"}</TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 {selectedRows.filter((row) => row.selected).length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">
//                       No rows selected
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Box>

//           <Grid container spacing={2} mt={4} justifyContent="flex-end">
//             <Grid item xs={12} md={4}>
//               <Box
//                 sx={{
//                   border: "1px solid #A259FF",
//                   borderRadius: "8px",
//                   padding: "12px",
//                   fontWeight: 600,
//                 }}
//               >
//                 Total Payable Amount:{" "}
//                 <span style={{ float: "right" }}>
//                   ₹{paymentData.totalPayable}
//                 </span>
//               </Box>
//             </Grid>
//           </Grid>
//           <Box display="flex" justifyContent="center" mt={4}>
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "#7E00D1", color: "#fff", px: 4 }}
//               onClick={handleScheduledPaymentSubmit}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Payment"}
//             </Button>
//           </Box>
//         </>
//       )}

//       <Dialog
//         open={openBox}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle
//           sx={{
//             fontSize: "24px",
//             fontWeight: "bold",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {selectedRow?.batchNo ? `Batch No: ${selectedRow.batchNo}` : ""}
//           <a
//             href={selectedRow?.invoice}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{ textDecoration: "none" }}
//           >
//             <PictureAsPdfIcon
//               sx={{ color: "red", fontSize: "28px", cursor: "pointer" }}
//             />
//           </a>
//         </DialogTitle>
//         <DialogContent>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>View</TableCell>
//                 <TableCell>Customer Name</TableCell>
//                 <TableCell>IMEI No</TableCell>
//                 <TableCell>Service Type</TableCell>
//                 <TableCell>Brand</TableCell>
//                 <TableCell>Model</TableCell>
//                 <TableCell>Repair Charges</TableCell>
//                 <TableCell>GST Charges</TableCell>
//                 <TableCell>Gross Amount</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {[...Array(maxLength)].map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <RemoveRedEyeIcon
//                       style={{ cursor: "pointer", color: "#7E00D1" }}
//                       onClick={() =>
//                         navigate("/allDetails", {
//                           state: { aaNumber: aaNos[index] },
//                         })
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>{customerNames[index] || "-"}</TableCell>
//                   <TableCell>{imeis[index] || "-"}</TableCell>
//                   <TableCell>{serviceTypes[index] || "-"}</TableCell>
//                   <TableCell>{brands[index] || "-"}</TableCell>
//                   <TableCell>{models[index] || "-"}</TableCell>
//                   <TableCell>{repairs[index] || "-"}</TableCell>
//                   <TableCell>{gstCharges[index] || "-"}</TableCell>
//                   <TableCell>{grossAmount[index] || "-"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//             <Button variant="outlined">Total Amount: ₹ {totalAmount}</Button>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleCloseDialog}
//             style={{ backgroundColor: "#FE7C0B", color: "#fff" }}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default FinalPayment;

// const buttonStyle = {
//   borderRadius: "8px",
//   borderColor: "#ccc",
//   textTransform: "none",
//   fontWeight: 500,
//   width: "100%",
//   justifyContent: "flex-start",
// };

// const customStyles = {
//   headRow: {
//     style: {
//       backgroundColor: "#EBF3FF",
//     },
//   },
//   headCells: {
//     style: {
//       fontWeight: "bold",
//     },
//   },
// };




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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import pdf3 from "../../../assets/images/users/pdf3.png";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FinalPaymentHook from "./FinalPaymentHook";
import { useNavigate } from "react-router-dom";

function FinalPayment() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openBox, setOpenBox] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [customerNames, setCustomerNames] = useState([]);
  const [imeis, setImeis] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [gstCharges, setGstCharges] = useState([]);
  const [grossAmount, setGrossAmount] = useState([]);
  const [aaNos, setAaNos] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [paymentData, setPaymentData] = useState({
    paymentDate: dayjs().format("YYYY-MM-DD"), // Default to today
    paymentMode: "",
    gst: "GST Hold", // Default to GST Hold
    paymentMethod: "Both", // Default to Both
    partialAmount: 0,
    totalPayable: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBatches = [] } = location.state || {};

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    const parseField = (field) =>
      field ? field.split(",").map((s) => s.trim()) : [];
    const cNames = parseField(row.customerName);
    const imeiList = parseField(row.imeiNo);
    const stypes = parseField(row.serviceType);
    const bList = parseField(row.brand);
    const mList = parseField(row.makeModel);
    const rCharges = parseField(row.repairCharges);
    const gstList = parseField(row.chargesInclGST);
    const gAmount = parseField(row.total);
    const aaList = parseField(row.aaNo).slice(0, row.caseCount || 0);
    const max = Math.max(
      cNames.length,
      imeiList.length,
      stypes.length,
      bList.length,
      mList.length,
      rCharges.length,
      gstList.length,
      gAmount.length,
      aaList.length
    );
    const totalAmt = gAmount
      .slice(0, row.caseCount || 0)
      .reduce((acc, val) => acc + Number(val || 0), 0);
    setCustomerNames(cNames.slice(0, row.caseCount || 0));
    setImeis(imeiList.slice(0, row.caseCount || 0));
    setServiceTypes(stypes.slice(0, row.caseCount || 0));
    setBrands(bList.slice(0, row.caseCount || 0));
    setModels(mList.slice(0, row.caseCount || 0));
    setRepairs(rCharges.slice(0, row.caseCount || 0));
    setGstCharges(gstList.slice(0, row.caseCount || 0));
    setGrossAmount(gAmount.slice(0, row.caseCount || 0));
    setAaNos(aaList);
    setMaxLength(max);
    setTotalAmount(totalAmt.toFixed(2));
    setOpenBox(true);
  };

  const handleCloseDialog = () => {
    setOpenBox(false);
  };

  useEffect(() => {
    if (selectedBatches.length > 0) {
      console.log(
        "Raw selectedBatches:",
        JSON.stringify(selectedBatches, null, 2)
      );
      setSelectedRows(
        selectedBatches.map((batch) => ({
          ...batch,
          selected: true,
          partialPaid: "",
          selectedAaNos: batch.aaNo
            ? batch.aaNo.split(",").map((s) => s.trim()).slice(0, batch.caseCount || 0)
            : [],
        }))
      );
    }
  }, [selectedBatches]);

  useEffect(() => {
    const filtered = selectedRows.filter((row) => row.selected);
    const totalPayable = filtered.reduce((acc, row) => {
      const reimbursement =
        paymentData.paymentMethod === "Expense"
          ? 0
          : Number(row.reimbursement || 0);
      const expense =
        paymentData.paymentMethod === "Reimbursement"
          ? 0
          : Number(row.expense || 0);
      const baseAmount = reimbursement + expense;
      const gstRate =
        paymentData.gst === "GST Hold" ? 0 : Number(row.gst || 0);
      const tdsRate = Number(row.tds || 0);
      const gstAmount = baseAmount * (gstRate / 100);
      const tdsAmount = baseAmount * (tdsRate / 100);
      const payable = baseAmount + gstAmount - tdsAmount;
      return acc + payable;
    }, 0);

    const partialAmount = filtered.reduce(
      (acc, row) => acc + Number(row.partialPaid || 0),
      0
    );

    setPaymentData((prev) => ({
      ...prev,
      totalPayable: totalPayable.toFixed(2),
      partialAmount: partialAmount.toFixed(2),
    }));
  }, [selectedRows, paymentData.gst, paymentData.paymentMethod]);

  const handleDeleteRow = (batchNo) => {
    const updatedRows = selectedRows.filter((item) => item.batchNo !== batchNo);
    setSelectedRows(updatedRows);
  };

  const handleCheckboxChange = (batchNo, checked) => {
    const updatedRows = selectedRows.map((row) =>
      row.batchNo === batchNo ? { ...row, selected: checked } : row
    );
    setSelectedRows(updatedRows);
  };

  // Handler for editing caseCount and updating selected aaNos with validation
  const handleCaseCountChange = (batchNo, newValue) => {
    const updatedRows = selectedRows.map((row) => {
      if (row.batchNo === batchNo) {
        const allAaNos = row.aaNo ? row.aaNo.split(",").map((s) => s.trim()) : [];
        const maxCount = allAaNos.length; // Maximum allowable count based on aaNo entries
        const newCount = Math.max(0, Math.min(parseInt(newValue) || 0, maxCount)); // Ensure non-negative and not greater than aaNo count
        const selectedAaNos = allAaNos.slice(0, newCount); // Select first `newCount` aaNos

        // Optional: Alert if the user tries to set a count greater than aaNo length
        if (parseInt(newValue) > maxCount) {
          alert(`Count cannot exceed the number of aaNo entries (${maxCount}).`);
        }

        return { ...row, caseCount: newCount, selectedAaNos };
      }
      return row;
    });
    setSelectedRows(updatedRows);
  };

  const columns = [
    {
      name: "View",
      selector: (row) => row.view,
      cell: (row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleOpenDialog(row)}
        >
          <RemoveRedEyeIcon style={{ color: "#7E00D1" }} />
        </span>
      ),
    },
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.selected || false}
          disabled={
            row.invoiceStatus === "Batch Created" ||
            row.invoiceStatus === "Invoice Uploaded"
          }
          className="form-check-input"
          onChange={(e) => handleCheckboxChange(row.batchNo, e.target.checked)}
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
      selector: (row) => row.reimbursement || "200",
    },
    {
      name: "Expense",
      selector: (row) => row.expense || "—",
    },
    {
      name: "GST",
      selector: (row) => `${row.gst}%` || "—",
    },
    {
      name: "TDS",
      selector: (row) => `${row.tds}%` || "—",
    },
    {
      name: "Payable",
      selector: (row) => row.finalAmount || "—",
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
      cell: (row) => (
        <IconButton color="error" onClick={() => handleDeleteRow(row.batchNo)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sanitizeNumber = (value) => {
    if (
      !value ||
      value === "" ||
      value.trim() === "," ||
      value.trim() === ", "
    ) {
      return "0.00";
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    if (typeof value === "string") {
      const values = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "" && !isNaN(parseFloat(v)));
      if (values.length === 0) {
        return "0.00";
      }
      const total = values.reduce((acc, val) => acc + parseFloat(val), 0);
      return total.toFixed(2);
    }
    return "0.00";
  };

  const validateRowData = (row) => {
    const numericFields = [
      "repairCharges",
      "chargesInclGST",
      "total",
      "reimbursment",
      "totalRepairCharges",
      "grossAmount",
      "finalAmount",
      "invoiceAmount",
      "tds",
      "partialPaid",
    ];
    const validatedRow = { ...row };
    numericFields.forEach((field) => {
      if (
        validatedRow[field] === ", " ||
        validatedRow[field] === "" ||
        validatedRow[field] === null ||
        validatedRow[field] === undefined
      ) {
        console.warn(
          `Invalid value for ${field} in row ${row.batchNo}: ${validatedRow[field]}`
        );
        validatedRow[field] = "0.00";
      } else {
        validatedRow[field] = sanitizeNumber(validatedRow[field]);
      }
    });
    return validatedRow;
  };

  const handleScheduledPaymentSubmit = async () => {
    const selectedData = selectedRows.filter((row) => row.selected);
    if (selectedData.length === 0) {
      alert("Please select at least one row to submit.");
      return;
    }

    try {
      setIsSubmitting(true);
      const selectedDate = dayjs(paymentData.paymentDate).startOf("day");
      const today = dayjs().startOf("day");

      if (selectedDate.isAfter(today)) {
        const validatedData = selectedData.map(validateRowData);
        for (const row of validatedData) {
          const reimbursement =
            paymentData.paymentMethod === "Expense"
              ? 0
              : Number(row.reimbursement || 0);
          const expense =
            paymentData.paymentMethod === "Reimbursement"
              ? 0
              : Number(row.expense || 0);
          const baseAmount = reimbursement + expense;
          const gstRate =
            paymentData.gst === "GST Hold" ? 0 : Number(row.gst || 0);
          const tdsRate = Number(row.tds || 2);

          const payload = {
            scheduledId: row.batchNo || "N/A",
            aaNo: row.selectedAaNos.join(", ") || "",
            imeiNo: row.imeiNo || "",
            creationDate: row.creationDate || "",
            closureDate: row.closureDate || "",
            customerName: row.customerName || "",
            serviceType: row.serviceType || "",
            brand: row.brand || "",
            makeModel: row.makeModel || "",
            repairCharges: sanitizeNumber(row.repairCharges),
            chargesInclGST: sanitizeNumber(row.chargesInclGST),
            total: sanitizeNumber(row.total),
            invoiceStatus: row.invoiceStatus || "",
            batchNo: row.batchNo || "",
            selectedService: row.selectedService || "",
            reimbursment: reimbursement,
            totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
            grossAmount: sanitizeNumber(row.grossAmount),
            finalAmount: sanitizeNumber(
              baseAmount +
                baseAmount * (gstRate / 100) -
                baseAmount * (tdsRate / 100)
            ),
            gst: gstRate.toString(),
            tds: tdsRate.toString(),
            invoiceNo: row.invoiceNo || "",
            invoiceDate: row.invoiceDate || "",
            invoiceAmount: sanitizeNumber(row.invoiceAmount),
            invoice: row.invoice || "",
            vendorName: row.vendorName || "",
            caseCount: Number(row.caseCount || 0),
            financeStatus: row.financeStatus || "",
            paymentDate:
              paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
            paymentType: paymentData.paymentMode || "",
            gstStatus: paymentData.gst || "",
            paymentMode: paymentData.paymentMethod || "",
            totalAmount: sanitizeNumber(
              baseAmount +
                baseAmount * (gstRate / 100) -
                baseAmount * (tdsRate / 100)
            ),
            totalPartialPaidAmount: paymentData.partialAmount,
            partialPaidAmount: sanitizeNumber(row.partialPaid),
          };

          console.log(
            "Future Payment Payload:",
            JSON.stringify(payload, null, 2)
          );
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
          if (!response.ok) {
            throw new Error(
              result.message || "Failed to submit future payment"
            );
          }
        }
        alert("✅ Future payments submitted successfully.");
      } else {
        const validatedData = selectedData.map(validateRowData);
        for (const row of validatedData) {
          const reimbursement =
            paymentData.paymentMethod === "Expense"
              ? 0
              : Number(row.reimbursement || 0);
          const expense =
            paymentData.paymentMethod === "Reimbursement"
              ? 0
              : Number(row.expense || 0);
          const baseAmount = reimbursement + expense;
          const gstRate =
            paymentData.gst === "GST Hold" ? 0 : Number(row.gst || 0);
          const tdsRate = Number(row.tds || 0);

          const payload = {
            scheduledId: row.scheduledId || row.batchNo || "N/A",
            aaNo: row.selectedAaNos.join(", ") || "",
            imeiNo: row.imeiNo || "",
            creationDate: row.creationDate || "",
            closureDate: row.closureDate || "",
            customerName: row.customerName || "",
            serviceType: row.serviceType || "",
            partialPaidAmount: sanitizeNumber(row.partialPaid),
            brand: row.brand || "",
            makeModel: row.makeModel || "",
            repairCharges: sanitizeNumber(row.repairCharges),
            chargesInclGST: sanitizeNumber(row.chargesInclGST),
            total: sanitizeNumber(row.total),
            invoiceStatus: row.invoiceStatus || "",
            batchNo: row.batchNo || "",
            selectedService: row.selectedService || "",
            reimbursment: reimbursement,
            totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
            grossAmount: sanitizeNumber(row.grossAmount),
            finalAmount: sanitizeNumber(
              baseAmount +
                baseAmount * (gstRate / 100) -
                baseAmount * (tdsRate / 100)
            ),
            gst: gstRate.toString(),
            tds: tdsRate.toString(),
            invoiceNo: row.invoiceNo || "",
            invoiceDate: row.invoiceDate || "",
            invoiceAmount: sanitizeNumber(row.invoiceAmount),
            invoice: row.invoice || "",
            vendorName: row.vendorName || "",
            caseCount: Number(row.caseCount || 0),
            financeStatus: row.financeStatus || "",
            paymentDate:
              paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
            paymentType: paymentData.paymentMode || "Online",
            gstStatus: paymentData.gst || "",
            paymentMode: paymentData.paymentMethod || "Reimbursement",
            totalAmount: sanitizeNumber(
              baseAmount +
                baseAmount * (gstRate / 100) -
                baseAmount * (tdsRate / 100)
            ),
            totalPartialPaidAmount: paymentData.partialAmount,
          };

          console.log(
            "Today's Payment Payload:",
            JSON.stringify(payload, null, 2)
          );
          const response = await fetch(
            "https://mintflix.live:8086/api/Auto/InsertFullAndPartialPayment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
          const result = await response.json();
          if (!response.ok) {
            throw new Error(
              result.message || "Failed to submit today's payment"
            );
          }
        }
        alert("✅ Today's payments submitted successfully.");
      }

      setSelectedRows([]);
      setPaymentData({
        paymentDate: dayjs().format("YYYY-MM-DD"),
        paymentMode: "",
        gst: "GST Hold",
        paymentMethod: "Both",
        partialAmount: 0,
        totalPayable: 0,
      });
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert(`❌ Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPayableAmount = selectedRows
    .filter((row) => row.selected)
    .reduce((acc, curr) => acc + Number(curr.payableAmount || 0), 0);

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
        Send for Final Payment
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
                  const selected = dayjs(newValue).startOf("day");
                  setPaymentData((prev) => ({
                    ...prev,
                    paymentDate: selected.format("YYYY-MM-DD"),
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
      </Grid>

      {(paymentData.paymentMode === "Partial Payment" || paymentData.paymentMode === "Full Payment") && (
        <>
          <Box mt={4}>
            <Typography variant="h3" mb={2}>
              {paymentData.paymentMode === "Partial Payment" ? "Partial Payment" : "Full Payment"}
            </Typography>
            <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EBF3FF" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Count
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Reimbursement
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Expense
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    GST
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    TDS
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Payable
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRows
                  .filter((row) => row.selected)
                  .map((row, index) => {
                    const reimbursement =
                      paymentData.paymentMethod === "Expense"
                        ? 0
                        : Number(row.reimbursement || 0);
                    const expense =
                      paymentData.paymentMethod === "Reimbursement"
                        ? 0
                        : Number(row.expense || 0);
                    const baseAmount = reimbursement + expense;
                    const gstRate =
                      paymentData.gst === "GST Hold"
                        ? 0
                        : Number(row.gst || 0);
                    const tdsRate = Number(row.tds || 0);
                    const payable =
                      baseAmount +
                      baseAmount * (gstRate / 100) -
                      baseAmount * (tdsRate / 100);

                    return (
                      <TableRow
                        key={index}
                        sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                      >
                        <TableCell>{row.caseCount || "—"}</TableCell>
                        <TableCell>
                          {reimbursement > 0 ? reimbursement : "—"}
                        </TableCell>
                        <TableCell>{expense > 0 ? expense : "—"}</TableCell>
                        <TableCell>{gstRate > 0 ? `${gstRate}%` : "0%"}</TableCell>
                        <TableCell>
                          {tdsRate > 0 ? `${tdsRate}%` : "—"}
                        </TableCell>
                        <TableCell>{payable.toFixed(2) || "—"}</TableCell>
                      </TableRow>
                    );
                  })}
                {selectedRows.filter((row) => row.selected).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No rows selected
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Typography variant="h3" mt={2}>
              Amount to pay
            </Typography>

            <Table sx={{ minWidth: 650, border: "1px solid #ddd", mt: 2 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EBF3FF" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Count
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Reimbursement
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Expense
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    GST
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    TDS
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Payable
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRows
                  .filter((row) => row.selected)
                  .map((row, index) => {
                    const reimbursement =
                      paymentData.paymentMethod === "Expense"
                        ? 0
                        : Number(row.reimbursement || 0);
                    const expense =
                      paymentData.paymentMethod === "Reimbursement"
                        ? 0
                        : Number(row.expense || 0);
                    const baseAmount = reimbursement + expense;
                    const gstRate =
                      paymentData.gst === "GST Hold"
                        ? 0
                        : Number(row.gst || 0);
                    const tdsRate = Number(row.tds || 0);
                    const payable =
                      baseAmount +
                      baseAmount * (gstRate / 100) -
                      baseAmount * (tdsRate / 100);

                    return (
                      <TableRow
                        key={index}
                        sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                      >
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={row.caseCount || ""}
                            onChange={(e) =>
                              handleCaseCountChange(
                                row.batchNo,
                                e.target.value
                              )
                            }
                            sx={{ width: "100px" }}
                          />
                        </TableCell>
                        <TableCell>
                          {reimbursement > 0 ? reimbursement : "—"}
                        </TableCell>
                        <TableCell>{expense > 0 ? expense : "—"}</TableCell>
                        <TableCell>{gstRate > 0 ? `${gstRate}%` : "0%"}</TableCell>
                        <TableCell>
                          {tdsRate > 0 ? `${tdsRate}%` : "—"}
                        </TableCell>
                        <TableCell>{payable.toFixed(2) || "—"}</TableCell>
                      </TableRow>
                    );
                  })}
                {selectedRows.filter((row) => row.selected).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No rows selected
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

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
                Total Payable Amount:{" "}
                <span style={{ float: "right" }}>
                  ₹{paymentData.totalPayable}
                </span>
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7E00D1", color: "#fff", px: 4 }}
              onClick={handleScheduledPaymentSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Payment"}
            </Button>
          </Box>
        </>
      )}

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
                <TableCell>IMEI No</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Repair Charges</TableCell>
                <TableCell>GST Charges</TableCell>
                <TableCell>Gross Amount</TableCell>
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
                          state: { aaNumber: aaNos[index] },
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{customerNames[index] || "-"}</TableCell>
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
            <Button variant="outlined">Total Amount: ₹ {totalAmount}</Button>
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
    </div>
  );
}

export default FinalPayment;

const buttonStyle = {
  borderRadius: "8px",
  borderColor: "#ccc",
  textTransform: "none",
  fontWeight: 500,
  width: "100%",
  justifyContent: "flex-start",
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