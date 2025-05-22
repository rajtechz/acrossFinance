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
// import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";

// function FinalPayment() {
//   const [showFinalTable, setShowFinalTable] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [openBox, setOpenBox] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   // Arrays to hold parsed values for table
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
//   const [isFutureDate, setIsFutureDate] = useState(false);

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
//     const aaList = parseField(row.aaNo);
//     const max = Math.max(
//       cNames.length,
//       imeiList.length,
//       stypes.length,
//       bList.length,
//       mList.length,
//       rCharges.length,
//       gstList.length,
//       gAmount.length
//     );
//     const totalAmt = gAmount.reduce((acc, val) => acc + Number(val || 0), 0);
//     setCustomerNames(cNames);
//     setImeis(imeiList);
//     setServiceTypes(stypes);
//     setBrands(bList);
//     setModels(mList);
//     setRepairs(rCharges);
//     setGstCharges(gstList);
//     setGrossAmount(gAmount);
//     setAaNos(aaList);
//     setMaxLength(max);
//     setTotalAmount(totalAmt.toFixed(2));
//     setOpenBox(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenBox(false);
//   };

//   // Initialize selected rows from the passed data
//   useEffect(() => {
//     if (selectedBatches.length > 0) {
//       setSelectedRows(
//         selectedBatches.map((batch) => ({
//           ...batch,
//           selected: true,
//           partialPaid: "",
//         }))
//       );
//     }
//   }, [selectedBatches]);

//   console.log(
//     "this is the data whih is comming from the another page",
//     selectedBatches
//   );

//   // Update totalPayable and partialAmount based on selected rows
//   useEffect(() => {
//     const filtered = selectedRows.filter((row) => row.selected);
//     const totalPayable = filtered.reduce(
//       (acc, row) => acc + Number(row.payableAmount || 0),
//       0
//     );
//     const partialAmount = filtered.reduce(
//       (acc, row) => acc + Number(row.partialPaid || 0),
//       0
//     );
//     setPaymentData((prev) => ({
//       ...prev,
//       totalPayable: totalPayable.toFixed(2),
//       partialAmount: partialAmount.toFixed(2),
//     }));
//   }, [selectedRows]);
//   const handleDeleteRow = (batchNo) => {
//     const updatedRows = selectedRows.filter((item) => item.batchNo !== batchNo);
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
//       selector: (row) => row.reimbursement || "—",
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
//       selector: (row) => row.payable || "—",
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

//   const finalColumns = [
//     ...columns.filter((col) => col.name !== "Select"),
//     {
//       name: "Partial Paid (₹)",
//       width: "150px",
//       cell: (row) => (
//         <TextField
//           type="text"
//           size="small"
//           value={row.partialPaid || ""}
//           onChange={(e) => {
//             const updatedRows = selectedRows.map((item) =>
//               item.batchNo === row.batchNo
//                 ? { ...item, partialPaid: e.target.value }
//                 : item
//             );
//             setSelectedRows(updatedRows);
//           }}
//           fullWidth
//         />
//       ),
//       ignoreRowClick: true,
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleScheduledPaymentSubmit = async () => {
//     const sanitizeNumber = (value) => {
//       // Handle null, undefined, empty strings, or invalid comma-separated strings
//       if (
//         !value ||
//         value === "" ||
//         value.trim() === "," ||
//         value.trim() === ", "
//       ) {
//         return "0.00";
//       }

//       // If value is a number, format it to 2 decimal places
//       if (typeof value === "number") {
//         return value.toFixed(2);
//       }

//       // If value is a string, process it
//       if (typeof value === "string") {
//         // Split by comma, trim, and filter out invalid entries
//         const values = value
//           .split(",")
//           .map((v) => v.trim())
//           .filter((v) => v !== "" && !isNaN(parseFloat(v)));

//         // If no valid numbers, return "0.00"
//         if (values.length === 0) {
//           return "0.00";
//         }

//         // Sum valid numbers and format to 2 decimal places
//         const total = values.reduce((acc, val) => acc + parseFloat(val), 0);
//         return total.toFixed(2);
//       }

//       // Fallback for unexpected types
//       return "0.00";
//     };

//     const validateRowData = (row) => {
//       const numericFields = [
//         "repairCharges",
//         "chargesInclGST",
//         "total",
//         "reimbursment",
//         "totalRepairCharges",
//         "grossAmount",
//         "finalAmount",
//         "invoiceAmount",
//         "tds",
//       ];

//       const validatedRow = { ...row };
//       numericFields.forEach((field) => {
//         if (
//           validatedRow[field] === ", " ||
//           validatedRow[field] === "" ||
//           validatedRow[field] === null ||
//           validatedRow[field] === undefined
//         ) {
//           console.warn(
//             `Invalid value for ${field} in row ${row.batchNo}: ${validatedRow[field]}`
//           );
//           validatedRow[field] = "0.00";
//         } else {
//           validatedRow[field] = sanitizeNumber(validatedRow[field]);
//         }
//       });

//       return validatedRow;
//     };
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
//         // Future date submission - Use InsertScheduledPaymentData
//         const validatedData = selectedData.map(validateRowData);
//         const payload = {
//           scheduledId: validatedData.map((r) => r.batchNo).join(","),
//           aaNo: "",
//           imeiNo: validatedData[0].imeiNo || "",
//           creationDate: validatedData[0].creationDate || "",
//           closureDate: validatedData[0].closureDate || "",
//           customerName: validatedData[0].customerName || "",
//           serviceType: validatedData[0].serviceType || "",
//           brand: validatedData[0].brand || "",
//           makeModel: validatedData[0].makeModel || "",
//           repairCharges: sanitizeNumber(validatedData[0].repairCharges),
//           chargesInclGST: sanitizeNumber(validatedData[0].chargesInclGST),
//           total: sanitizeNumber(validatedData[0].total),
//           invoiceStatus: validatedData[0].invoiceStatus || "",
//           batchNo: "",
//           selectedService: "",
//           reimbursment: "",
//           totalRepairCharges: "",
//           grossAmount: "",
//           finalAmount: sanitizeNumber(validatedData[0].finalAmount),
//           gst: "18",
//           tds: sanitizeNumber(validatedData[0].tds || "2"),
//           invoiceNo: validatedData[0].invoiceNo || "",
//           invoiceDate: validatedData[0].invoiceDate || "",
//           invoiceAmount: sanitizeNumber(validatedData[0].invoiceAmount),
//           invoice: validatedData[0].invoice || "",
//           vendorName: validatedData[0].vendorName || "",
//           caseCount: Number(validatedData[0].caseCount || 0),
//           financeStatus: "",
//           paymentDate: paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
//           paymentType: paymentData.paymentMode || "",
//           gstStatus: paymentData.gst || "",
//           paymentMode: paymentData.paymentMethod || "",
//           totalAmount: paymentData.totalPayable,
//           totalPartialPaidAmount: paymentData.partialAmount,
//           partialPaidAmount: "",
//         };

//         console.log(
//           "Future Payment Payload:",
//           JSON.stringify(payload, null, 2)
//         );

//         const response = await fetch(
//           "https://mintflix.live:8086/api/Auto/InsertScheduledPaymentData",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//           }
//         );

//         const result = await response.json();
//         if (!response.ok)
//           throw new Error(result.message || "Failed to submit future payment");
//         alert("✅ Future payment submitted successfully.");
//       } else {

//         for (const row of selectedData.map(validateRowData)) {
//           const payload = {
//             scheduledId: row.scheduledId || row.batchNo || "N/A",
//             aaNo: row.aaNo || "",
//             imeiNo: row.imeiNo || "",
//             creationDate: row.creationDate || "",
//             closureDate: row.closureDate || "",
//             customerName: row.customerName || "",
//             serviceType: row.serviceType || "",
//             partialPaidAmount: row.serviceType || "",
//             brand: row.brand || "",
//             makeModel: row.makeModel || "",
//             repairCharges: sanitizeNumber(row.repairCharges),
//             chargesInclGST: sanitizeNumber(row.chargesInclGST),
//             total: sanitizeNumber(row.total),
//             invoiceStatus: row.invoiceStatus || "",
//             batchNo: row.batchNo || "",
//             selectedService: row.selectedService || "",
//             reimbursment: sanitizeNumber(row.reimbursment),
//             totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
//             grossAmount: sanitizeNumber(row.grossAmount),
//             finalAmount: sanitizeNumber(row.finalAmount),
//             gst: "18",
//             tds: sanitizeNumber(row.tds),
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
//             totalAmount: sanitizeNumber(row.payable || row.payableAmount),
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
//           if (!response.ok)
//             throw new Error(
//               result.message || "Failed to submit today's payment"
//             );
//         }

//         alert("✅ Today's payments submitted successfully.");
//       }

//       // Reset UI state
//       setSelectedRows([]);
//       setShowFinalTable(false);
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
//   const selectedData = selectedRows.filter((row) => row.selected);
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
//         Final Payment
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
//                   const today = dayjs().startOf("day");

//                   setPaymentData((prev) => ({
//                     ...prev,
//                     paymentDate: selected.format("YYYY-MM-DD"),
//                   }));

//                   const isFuture = selected.isAfter(today);

//                   // 🔄 Reverse logic here
//                   setShowFinalTable(!isFuture); // ✅ Show only for today
//                   setIsFutureDate(isFuture); // ✅ This can stay as-is
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
//         <Grid item xs={12} sm={6} md={3}>
//           <Button
//             variant="outlined"
//             sx={{
//               borderColor: "#7E00D1",
//               color: "#7E00D1",
//               fontWeight: "bold",
//             }}
//           >
//             Total Amount: ₹{totalPayableAmount}
//           </Button>
//         </Grid>
//       </Grid>

//       {isFutureDate ? (
//         <Box
//           display="flex"
//           justifyContent="center"
//           gap={2}
//           mt={4}
//           flexWrap="wrap"
//         >
//           <Button
//             onClick={() => setShowFinalTable(false)}
//             variant="outlined"
//             sx={{
//               borderColor: "#7E00D1",
//               color: "#7E00D1",
//               fontWeight: "bold",
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleScheduledPaymentSubmit}
//             variant="contained"
//             sx={{ backgroundColor: "#7E00D1", color: "#fff" }}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </Button>
//         </Box>
//       ) : null}

//       {showFinalTable && (
//         <>
//           <Box mt={4}>
//             <DataTable
//               columns={finalColumns}

//               data={selectedRows.filter((row) => row.selected)}
//               fixedHeader
//               customStyles={customStyles}
//             />
//           </Box>
//           <Grid container spacing={2} mt={4}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Button variant="outlined" sx={buttonStyle}>
//                 {paymentData.paymentDate}
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Button variant="outlined" sx={buttonStyle}>
//                 {paymentData.paymentMode}
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Button variant="outlined" sx={buttonStyle}>
//                 {paymentData.gst}
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Button variant="outlined" sx={buttonStyle}>
//                 {paymentData.paymentMethod}
//               </Button>
//             </Grid>
//           </Grid>
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
//                 Total Amount Payable:{" "}
//                 <span style={{ float: "right" }}>
//                   ₹{paymentData.totalPayable}
//                 </span>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box
//                 sx={{
//                   border: "1px solid #A259FF",
//                   borderRadius: "8px",
//                   padding: "12px",
//                   fontWeight: 600,
//                 }}
//               >
//                 Total Partial Paid Amount:{" "}
//                 <span style={{ float: "right" }}>
//                   ₹{paymentData.partialAmount}
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
//                 {/* <TableCell>AA No</TableCell> */}
//                 <TableCell>IMEI No</TableCell>
//                 <TableCell>Service Type</TableCell>
//                 <TableCell>Brand</TableCell>
//                 <TableCell>Model</TableCell>
//                 <TableCell>Repair Charges</TableCell>
//                 <TableCell>GST Charges</TableCell>
//                 <TableCell>GrossAmount</TableCell>
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
//                           state: { aaNumber: aaNos[index] }, // <-- only that row's AA number
//                         })
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>{customerNames[index] || "-"}</TableCell>
//                   {/* <TableCell>{aaNos[index] || "-"}</TableCell> */}
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
//           {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//                   <Button variant="outlined">
//                     Total Amount :{selectedRow?.total}
//                   </Button>
//                 </Box> */}
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
  const [showFinalTable, setShowFinalTable] = useState(false);
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
  const [isFutureDate, setIsFutureDate] = useState(false);

  const [paymentData, setPaymentData] = useState({
    paymentDate: "",
    paymentMode: "",
    gst: "",
    paymentMethod: "",
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
    const aaList = parseField(row.aaNo);
    const max = Math.max(
      cNames.length,
      imeiList.length,
      stypes.length,
      bList.length,
      mList.length,
      rCharges.length,
      gstList.length,
      gAmount.length
    );
    const totalAmt = gAmount.reduce((acc, val) => acc + Number(val || 0), 0);
    setCustomerNames(cNames);
    setImeis(imeiList);
    setServiceTypes(stypes);
    setBrands(bList);
    setModels(mList);
    setRepairs(rCharges);
    setGstCharges(gstList);
    setGrossAmount(gAmount);
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
    setPaymentData((prev) => ({
      ...prev,
      totalPayable: totalPayable.toFixed(2),
      partialAmount: partialAmount.toFixed(2),
    }));
  }, [selectedRows]);

  const handleDeleteRow = (batchNo) => {
    const updatedRows = selectedRows.filter((item) => item.batchNo !== batchNo);
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

  const finalColumns = [
    ...columns.filter((col) => col.name !== "Select"),
    {
      name: "Partial Paid (₹)",
      width: "150px",
      cell: (row) => (
        <TextField
          type="number"
          size="small"
          value={row.partialPaid || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) {
              const updatedRows = selectedRows.map((item) =>
                item.batchNo === row.batchNo
                  ? { ...item, partialPaid: value }
                  : item
              );
              setSelectedRows(updatedRows);
            }
          }}
          fullWidth
          inputProps={{ min: 0 }}
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

  // const handleScheduledPaymentSubmit = async () => {
  //   const selectedData = selectedRows.filter((row) => row.selected);
  //   if (selectedData.length === 0) {
  //     alert("Please select at least one row to submit.");
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     const selectedDate = dayjs(paymentData.paymentDate).startOf("day");
  //     const today = dayjs().startOf("day");

  //     if (selectedDate.isAfter(today)) {
  //       // Future date submission - Use InsertScheduledPaymentData
  //       const validatedData = selectedData.map(validateRowData);
  //       const payload = {
  //         scheduledId: validatedData.map((r) => r.batchNo).join(","),
  //         aaNo: "",
  //         imeiNo: validatedData[0].imeiNo || "",
  //         creationDate: validatedData[0].creationDate || "",
  //         closureDate: validatedData[0].closureDate || "",
  //         customerName: validatedData[0].customerName || "",
  //         serviceType: validatedData[0].serviceType || "",
  //         brand: validatedData[0].brand || "",
  //         makeModel: validatedData[0].makeModel || "",
  //         repairCharges: sanitizeNumber(validatedData[0].repairCharges),
  //         chargesInclGST: sanitizeNumber(validatedData[0].chargesInclGST),
  //         total: sanitizeNumber(validatedData[0].total),
  //         invoiceStatus: validatedData[0].invoiceStatus || "",
  //         batchNo: "",
  //         selectedService: "",
  //         reimbursment: "",
  //         totalRepairCharges: "",
  //         grossAmount: "",
  //         finalAmount: sanitizeNumber(validatedData[0].finalAmount),
  //         gst: "18",
  //         tds: sanitizeNumber(validatedData[0].tds || "2"),
  //         invoiceNo: validatedData[0].invoiceNo || "",
  //         invoiceDate: validatedData[0].invoiceDate || "",
  //         invoiceAmount: sanitizeNumber(validatedData[0].invoiceAmount),
  //         invoice: validatedData[0].invoice || "",
  //         vendorName: validatedData[0].vendorName || "",
  //         caseCount: Number(validatedData[0].caseCount || 0),
  //         financeStatus: "",
  //         paymentDate: paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
  //         paymentType: paymentData.paymentMode || "",
  //         gstStatus: paymentData.gst || "",
  //         paymentMode: paymentData.paymentMethod || "",
  //         totalAmount: paymentData.totalPayable,
  //         totalPartialPaidAmount: paymentData.partialAmount,
  //         partialPaidAmount: "",
  //       };

  //       console.log(
  //         "Future Payment Payload:",
  //         JSON.stringify(payload, null, 2)
  //       );
  //       const response = await fetch(
  //         "https://mintflix.live:8086/api/Auto/InsertScheduledPaymentData",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(payload),
  //         }
  //       );
  //       const result = await response.json();
  //       if (!response.ok) {
  //         throw new Error(result.message || "Failed to submit future payment");
  //       }
  //       alert("✅ Future payment submitted successfully.");
  //     } else {
  //       // Today's date submission - Use InsertFullAndPartialPayment
  //       const validatedData = selectedData.map(validateRowData);
  //       for (const row of validatedData) {
  //         const payload = {
  //           scheduledId: row.scheduledId || row.batchNo || "N/A",
  //           aaNo: row.aaNo || "",
  //           imeiNo: row.imeiNo || "",
  //           creationDate: row.creationDate || "",
  //           closureDate: row.closureDate || "",
  //           customerName: row.customerName || "",
  //           serviceType: row.serviceType || "",
  //           partialPaidAmount: sanitizeNumber(row.partialPaid),
  //           brand: row.brand || "",
  //           makeModel: row.makeModel || "",
  //           repairCharges: sanitizeNumber(row.repairCharges),
  //           chargesInclGST: sanitizeNumber(row.chargesInclGST),
  //           total: sanitizeNumber(row.total),
  //           invoiceStatus: row.invoiceStatus || "",
  //           batchNo: row.batchNo || "",
  //           selectedService: row.selectedService || "",
  //           reimbursment: sanitizeNumber(row.reimbursment),
  //           totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
  //           grossAmount: sanitizeNumber(row.grossAmount),
  //           finalAmount: sanitizeNumber(row.finalAmount),
  //           gst: "18",
  //           tds: sanitizeNumber(row.tds),
  //           invoiceNo: row.invoiceNo || "",
  //           invoiceDate: row.invoiceDate || "",
  //           invoiceAmount: sanitizeNumber(row.invoiceAmount),
  //           invoice: row.invoice || "",
  //           vendorName: row.vendorName || "",
  //           caseCount: Number(row.caseCount || 0),
  //           financeStatus: row.financeStatus || "",
  //           paymentDate:
  //             paymentData.paymentDate || dayjs().format("YYYY-MM-DD"),
  //           paymentType: paymentData.paymentMode || "Online",
  //           gstStatus: paymentData.gst || "",
  //           paymentMode: paymentData.paymentMethod || "Reimbursement",
  //           totalAmount: sanitizeNumber(row.payable || row.payableAmount),
  //           totalPartialPaidAmount: paymentData.partialAmount,
  //         };

  //         console.log(
  //           "Today's Payment Payload:",
  //           JSON.stringify(payload, null, 2)
  //         );
  //         const response = await fetch(
  //           "https://mintflix.live:8086/api/Auto/InsertFullAndPartialPayment",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(payload),
  //           }
  //         );
  //         const result = await response.json();
  //         if (!response.ok) {
  //           throw new Error(
  //             result.message || "Failed to submit today's payment"
  //           );
  //         }
  //       }
  //       alert("✅ Today's payments submitted successfully.");
  //     }

  //     // Reset UI state
  //     setSelectedRows([]);
  //     setShowFinalTable(false);
  //     setPaymentData({
  //       paymentDate: "",
  //       paymentMode: "",
  //       gst: "",
  //       paymentMethod: "",
  //       partialAmount: 0,
  //       totalPayable: 0,
  //     });
  //   } catch (error) {
  //     console.error("❌ Submission Error:", error);
  //     alert(`❌ Submission failed: ${error.message}`);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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
        // Future date submission - Use InsertScheduledPaymentData
        const validatedData = selectedData.map(validateRowData);
        for (const row of validatedData) {
          const payload = {
            scheduledId: row.batchNo || "N/A",
            aaNo: row.aaNo || "",
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
            reimbursment: sanitizeNumber(row.reimbursment),
            totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
            grossAmount: sanitizeNumber(row.grossAmount),
            finalAmount: sanitizeNumber(row.finalAmount),
            gst: "18",
            tds: sanitizeNumber(row.tds || "2"),
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
            totalAmount: sanitizeNumber(row.payable || row.payableAmount),
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
        // Today's date submission - Use InsertFullAndPartialPayment
        const validatedData = selectedData.map(validateRowData);
        for (const row of validatedData) {
          const payload = {
            scheduledId: row.scheduledId || row.batchNo || "N/A",
            aaNo: row.aaNo || "",
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
            reimbursment: sanitizeNumber(row.reimbursment),
            totalRepairCharges: sanitizeNumber(row.totalRepairCharges),
            grossAmount: sanitizeNumber(row.grossAmount),
            finalAmount: sanitizeNumber(row.finalAmount),
            gst: "18",
            tds: sanitizeNumber(row.tds),
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
            totalAmount: sanitizeNumber(row.payable || row.payableAmount),
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

      // Reset UI state
      setSelectedRows([]);
      setShowFinalTable(false);
      setPaymentData({
        paymentDate: "",
        paymentMode: "",
        gst: "",
        paymentMethod: "",
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
                  const today = dayjs().startOf("day");
                  setPaymentData((prev) => ({
                    ...prev,
                    paymentDate: selected.format("YYYY-MM-DD"),
                  }));
                  const isFuture = selected.isAfter(today);
                  setShowFinalTable(!isFuture);
                  setIsFutureDate(isFuture);
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
        {/* <Grid item xs={12} sm={6} md={3}>
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
        </Grid> */}
      </Grid>

      {isFutureDate ? (
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
            sx={{
              borderColor: "#7E00D1",
              color: "#7E00D1",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleScheduledPaymentSubmit}
            variant="contained"
            sx={{ backgroundColor: "#7E00D1", color: "#fff" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      ) : null}

      {showFinalTable && (
        <>
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
