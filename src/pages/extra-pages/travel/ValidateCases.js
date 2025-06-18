// import React, { useState, useEffect } from "react";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   Typography,
//   Box,
//   TextField,
//   FormControl,
//   Select,
//   MenuItem,
//   InputAdornment,
//   InputLabel,
//   Chip,
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Tooltip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import pdf3 from "../../../assets/images/users/pdf3.png";
// import { holdData, statusUpdate } from "./MockData";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { ToastContainer, toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import ValidateCasesHook from "./ValidateCasesHook";
// import { baseURLProd } from "api/api";

// const ValidateCases = () => {
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");
//   const [batches, setBatches] = useState();
//   const [selectedBatches, setSelectedBatches] = useState([]);
//   const [showFinalTable, setShowFinalTable] = useState(false);
//   const [apiData, setApiData] = useState([]);
//   const [mismatchData, setMismatchData] = useState({});
//   const [selectedViewRow, setSelectedViewRow] = useState(null);

//   const {
//     data,
//     loading,
//     selectedRow,
//     invoiceFile,
//     openBox,
//     setInvoiceFile,
//     handleCloseDialog,
//     handleUploadUtr,
//     setOpenBox,
//     setSelectedRow,
//     setViewModalOpen,
//     setLoading,
//   } = ValidateCasesHook();

  

// const handleRowClick = (row, action = "view") => {
//   console.log("onclick eye button service charge", row.serviceCharges);
//   console.log("onclick eye button repair charge", row.repairCharges);
//   console.log("onclick eye button aaNo", row.aaNo);
//   console.log("onclick eye button selling partner", row.sellingPartner);

//   setOpenBox(true);
//   setSelectedRow(row);
//   if (action === "view") {
//     setSelectedViewRow(row);
//     setOpenBox(true);
//   } else {
//     setSelectedRow(row);
//     setOpenBox(true);
//   }

//   if (!row) return;

//   setLoading(true);

//   fetch(`${baseURLProd}GetGadgetCaseDetailsByAA?aaNumbers=${row.aaNo}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const items = data.dataItems || [];
//       console.log("apiData", items);

//       // Parse row data
//       const rowServiceCharges = row.serviceCharges
//         ?.split(",")
//         .map((val) => parseFloat(val.trim()));
//       const rowRepairCharges = row.repairCharges
//         ?.split(",")
//         .map((val) => parseFloat(val.trim()));
//       const rowAANumbers = row.aaNo?.split(",").map((val) => val.trim());
//       const rowSellingPartners = row.sellingPartner
//         ?.split(",")
//         .map((val) => val.trim().toLowerCase()) || [];

//       const mismatches = {};

//       items.forEach((item, index) => {
//         const apiServiceCharge = parseFloat(item.serviceCharges);
//         const apiRepairCharge = parseFloat(item.repairCharges);
//         const apiAANumber = item.aA_Number?.trim();
//         const apiSellingPartner = item.sellingPartner?.trim().toLowerCase();

//         mismatches[index] = {
//           serviceMismatch: !rowServiceCharges?.some(
//             (val) => Math.abs(val - apiServiceCharge) < 0.01
//           ),
//           repairMismatch: !rowRepairCharges?.some(
//             (val) => Math.abs(val - apiRepairCharge) < 0.01
//           ),
//           aaMismatch: !rowAANumbers?.includes(apiAANumber),
//           sellingPartnerMismatch: rowSellingPartners[index] !== apiSellingPartner,
//           rowData: {
//             serviceCharge: rowServiceCharges ? rowServiceCharges[index] : "-",
//             repairCharge: rowRepairCharges ? rowRepairCharges[index] : "-",
//             aaNumber: rowAANumbers ? rowAANumbers[index] : "-",
//             sellingPartner: rowSellingPartners[index] || "-",
//           },
//           apiData: {
//             serviceCharge: apiServiceCharge || "-",
//             repairCharge: apiRepairCharge || "-",
//             aaNumber: apiAANumber || "-",
//             sellingPartner: apiSellingPartner || "-",
//           },
//         };

//         if (mismatches[index].serviceMismatch) {
//           console.warn(`❌ Service Charges mismatch for item ${index + 1}`);
//           console.log("API:", apiServiceCharge, "Row:", rowServiceCharges);
//         } else {
//           console.log(`✅ Service Charges matched for item ${index + 1}`);
//         }

//         if (mismatches[index].repairMismatch) {
//           console.warn(`❌ Repair Charges mismatch for item ${index + 1}`);
//           console.log("API:", apiRepairCharge, "Row:", rowRepairCharges);
//         } else {
//           console.log(`✅ Repair Charges matched for item ${index + 1}`);
//         }

//         if (mismatches[index].aaMismatch) {
//           console.warn(`❌ AA Number mismatch for item ${index + 1}`);
//           console.log("API:", apiAANumber, "Row:", rowAANumbers);
//         } else {
//           console.log(`✅ AA Number matched for item ${index + 1}`);
//         }

//         if (mismatches[index].sellingPartnerMismatch) {
//           console.warn(`❌ Selling Partner mismatch for item ${index + 1}`);
//           console.log("API:", apiSellingPartner, "Row:", rowSellingPartners[index]);
//         } else {
//           console.log(`✅ Selling Partner matched for item ${index + 1}`);
//         }
//       });

//       setApiData(items);
//       setMismatchData(mismatches);
//     })
//     .catch((error) => {
//       console.error("Error fetching API data:", error);
//       setApiData([]);
//       setMismatchData({});
//     })
//     .finally(() => setLoading(false));
// };
//   const handleDelete = (batchToDelete) => {
//     setBatches((prev) => prev.filter((batch) => batch !== batchToDelete));
//   };

//   const handleChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const StatusCell = ({ initialStatus }) => {
//     const [status, setStatus] = React.useState(initialStatus);

//     const getColorStyles = (status) => {
//       switch (status) {
//         case "Approved":
//           return {
//             borderColor: "#34c759",
//             color: "#34c759",
//             backgroundColor: "#eafff1",
//           };
//         case "Partial Approved":
//           return {
//             borderColor: "#f1c40f",
//             color: "#f1c40f",
//             backgroundColor: "#fff9e6",
//           };
//         case "Partial Finalized":
//           return {
//             borderColor: "#ff9500",
//             color: "#ff9500",
//             backgroundColor: "#fff4e6",
//           };
//         default:
//           return {
//             borderColor: "#ccc",
//             color: "#333",
//             backgroundColor: "#f9f9f9",
//           };
//       }
//     };

//     const styles = {
//       padding: "0px 0px",
//       borderRadius: "50px",
//       width: "140px",
//       ...getColorStyles(status),
//       border: `1px solid ${getColorStyles(status).borderColor}`,
//     };

//     return (
//       <select
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//         style={styles}
//         className="select_padding"
//       >
//         <option value="Batch">Batch</option>
//         <option value="Invoice">Invoice</option>
//         <option value="Partial Approved">Partial Approved</option>
//         <option value="Partial Finalized">Partial Finalized</option>
//         <option value="Approved">Approved</option>
//         <option value="Rejected">Rejected</option>
//       </select>
//     );
//   };

//   const columns = [
//     {
//       name: "View",
//       selector: (row) => row.view,
//       cell: (row) => (
//         <span onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
//           <RemoveRedEyeIcon style={{ color: "#7E00D1" }} />
//         </span>
//       ),
//     },
//     {
//       name: "Select",
//       cell: (row) => (
//         <input
//           type="checkbox"
//           disabled={
//             row.invoiceStatus === "Batch Created" ||
//             row.invoiceStatus === "Invoice Uploaded"
//           }
//           checked={selectedBatches.some(
//             (batch) =>
//               `${batch.batchNo}-${batch.invoiceNo}` ===
//               `${row.batchNo}-${row.invoiceNo}`
//           )}
//           onChange={(e) => {
//             if (e.target.checked) {
//               setSelectedBatches((prev) => [...prev, row]);
//             } else {
//               setSelectedBatches((prev) =>
//                 prev.filter(
//                   (batch) =>
//                     `${batch.batchNo}-${batch.invoiceNo}` !==
//                     `${row.batchNo}-${row.invoiceNo}`
//                 )
//               );
//             }
//           }}
//           className="form-check-input"
//         />
//       ),
//       ignoreRowClick: true,
//     },
//     { name: "Batch No", selector: (row) => row.batchNo },
//     { name: "Vendor Name", selector: (row) => row.vendorName, width: "150px" },
//     {
//       name: "Approval Date",
//       selector: (row) => dayjs(row.approvalDate).format("DD-MM-YYYY"),
//       width: "150px",
//     },
//     { name: "Case Count", selector: (row) => row.caseCount, width: "150px" },
//     { name: "Invoice No", selector: (row) => row.invoiceNo, width: "150px" },
//     {
//       name: "Invoice Date",
//       selector: (row) => row.invoiceDate,
//       width: "150px",
//     },
//     {
//       name: "Invoice Amount",
//       selector: (row) => row.invoiceAmount,
//       width: "150px",
//     },
//     {
//       name: "Reimbursement",
//       selector: (row) => row.totalServiceCharges,
//       width: "150px",
//     },
//     {
//       name: "Expense",
//       selector: (row) => row.totalRepairCharges,
//       width: "150px",
//     },
//     {
//       name: "GST",
//       selector: (row) => `${row.gst || "18"}%`,
//       width: "150px",
//     },
//     {
//       name: "TDS",
//       selector: (row) => `${row.tds || "2"}%`,
//       width: "150px",
//     },
//     {
//       name: "Payable",
//       selector: (row) => row.finalAmount,
//       width: "150px",
//     },
//     {
//       name: "Remarks",
//       selector: (row) => row.remarks,
//       width: "200px",
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
//       cell: (row, index) => (
//         <Chip
//           label={row.invoiceStatus || "--"}
//           variant="outlined"
//           color="success"
//           style={{ borderRadius: "20px" }}
//         />
//       ),
//       width: "180px",
//     },
//     {
//       name: "Finance Status",
//       cell: (row, index) => (
//         <Chip
//           label={row.financeStatus || "--"}
//           variant="outlined"
//           color="success"
//           style={{ borderRadius: "20px" }}
//         />
//       ),
//       width: "180px",
//     },
//   ];

//   const [filters, setFilters] = useState({
//     vendorName: "",
//     invoiceNo: "",
//     batchNo: "",
//     filterDate: null,
//   });

//   const [filteredData, setFilteredData] = useState([]);
//   useEffect(() => {
//     const filtered = data.filter((item) => {
//       const matchesVendor = item.vendorName
//         ?.toLowerCase()
//         .includes(filters.vendorName.toLowerCase());
//       const matchesInvoice = item.invoiceNo
//         ?.toLowerCase()
//         .includes(filters.invoiceNo.toLowerCase());
//       const matchesBatch = item.batchNo
//         ?.toLowerCase()
//         .includes(filters.batchNo.toLowerCase());

//       let matchesDate = true;
//       if (filters.filterDate) {
//         const itemDate = dayjs(item.approvalDate);
//         const filterDate = dayjs(filters.filterDate);
//         matchesDate = itemDate.isSame(filterDate, "day");
//       }

//       return matchesVendor && matchesInvoice && matchesBatch && matchesDate;
//     });
//     setFilteredData(filtered);
//   }, [filters, data]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFilters((prev) => ({
//       ...prev,
//       filterDate: date,
//     }));
//   };

// // Define arrays for table rendering
// const customerNames =
//   selectedRow?.customerName
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const aaNos =
//   selectedRow?.aaNo?.split(",").map((item) => (item === "NULL" ? "-" : item)) ||
//   [];
// const imeis =
//   selectedRow?.imeiNo
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const serviceTypes =
//   selectedRow?.serviceType
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const brands =
//   selectedRow?.brand?.split(",").map((item) => (item === "NULL" ? "-" : item)) ||
//   [];
// const models =
//   selectedRow?.makeModel
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const repairs =
//   selectedRow?.repairCharges
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const serviceCharges =
//   selectedRow?.serviceCharges
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const gstCharges =
//   selectedRow?.chargesInclGST
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const grossAmounts =
//   selectedRow?.grossAmount
//     ?.split(",")
//     .map((item) => (item === "NULL" ? "-" : item)) || [];
// const sellingPartners =
//   selectedRow?.sellingPartner
//     ?.split(",")
//     .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];

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
//   sellingPartners.length
// );

//   return (
//     <>
//       <ToastContainer />
//       <div className="container p-3 bg-white border rounded">
//         <h4 className="mb-0">Schedule Cases</h4>

//         <Box
//           mb={3}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <h5 className="mb-0"></h5>
//           <div>
        
//           </div>
//         </Box>

//         <Grid mb={3} container spacing={2}>
//           <Grid item xs={12} md={2}>
//             <TextField
//               name="vendorName"
//               variant="outlined"
//               placeholder="Vendor Name"
//               value={filters.vendorName}
//               onChange={handleFilterChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               name="invoiceNo"
//               variant="outlined"
//               placeholder="Invoice No"
//               value={filters.invoiceNo}
//               onChange={handleFilterChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               name="batchNo"
//               variant="outlined"
//               placeholder="Batch No"
//               value={filters.batchNo}
//               onChange={handleFilterChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={3}
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Approval Date"
//                 value={filters.filterDate}
//                 onChange={handleDateChange}
//                 format="DD-MM-YYYY"
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </Grid>
//         </Grid>

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           fixedHeader
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 15, 20, 25]}
//           customStyles={customStyles}
//         />

//         {loading && (
//           <div style={spinner}>
//             <FontAwesomeIcon
//               icon={faSpinner}
//               spin
//               size="3x"
//               style={{ color: "#FE7C0B" }}
//             />
//           </div>
//         )}
//       </div>

//       <Box
//         sx={{
//           display: selectedBatches.length > 0 ? "flex" : "none",
//           alignItems: "center",
//           justifyContent: "space-between",
//           border: "1px solid #A855F7",
//           borderRadius: 2,
//           p: 1.5,
//           backgroundColor: "#F9FAFB",
//           width: "100%",
//           maxWidth: 1200,
//           mt: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           {selectedBatches.map((batch, index) => (
//             <Chip
//               key={`${batch.batchNo}-${index}`}
//               label={`Batch ${batch.batchNo}`}
//               onDelete={() => {
//                 setSelectedBatches(
//                   selectedBatches.filter((b) => b.batchNo !== batch.batchNo)
//                 );
//               }}
//               sx={{ backgroundColor: "#F5EFFF", color: "#000" }}
//             />
//           ))}
//         </Box>
//         <Button
//           onClick={() =>
//             navigate("/finalPayment", { state: { selectedBatches } })
//           }
//           variant="contained"
//           sx={{
//             backgroundColor: "#8000EA",
//             textTransform: "none",
//             "&:hover": { backgroundColor: "#6900c7" },
//           }}
//         >
//           Submit
//         </Button>
//       </Box>
// <Dialog
//   open={openBox}
//   onClose={handleCloseDialog}
//   fullWidth
//   maxWidth="lg"
// >
//   <DialogTitle
//     sx={{
//       fontSize: "24px",
//       fontWeight: "bold",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     {selectedRow?.batchNo ? `Batch No: ${selectedRow.batchNo}` : ""}
//     {selectedRow?.invoice ? (
//       <a
//         href={selectedRow.invoice}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ textDecoration: "none" }}
//       >
//         <PictureAsPdfIcon
//           sx={{ color: "red", fontSize: "28px", cursor: "pointer" }}
//         />
//       </a>
//     ) : (
//       <span style={{ color: "gray", fontSize: "14px" }}>No Invoice</span>
//     )}
//   </DialogTitle>

//   <DialogContent>
//     <Table>
//       <TableHead>
//         <TableRow sx={{ backgroundColor: "#EBF3FF" }}>
//           {[
//             "View",
//             "AA No",
//             "IMEI No",
//             "Creation Date",
//             "Closur Date",
//             "Customer Name",
//             "Service Type",
//             "Selling Partner",
//             "Brand",
//             "Model",
//             "Repair Charges",
//             "Service Charges",
//             "Total",
//             "Invoice Status",
//             "Mismatched Data",
//             "Remarks",
//             "Remark File",
//           ].map((heading, index) => (
//             <TableCell
//               key={index}
//               style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
//             >
//               {heading}
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {[...Array(maxLength)].map((_, index) => {
//           const mismatch = mismatchData[index] || {};
//           const isAAMismatch = mismatch.aaMismatch;
//           const isOtherMismatch =
//             mismatch.serviceMismatch ||
//             mismatch.repairMismatch ||
//             mismatch.sellingPartnerMismatch;
//           const allMatch =
//             !mismatch.aaMismatch &&
//             !mismatch.serviceMismatch &&
//             !mismatch.repairMismatch &&
//             !mismatch.sellingPartnerMismatch;

//           const rowStyle = isAAMismatch
//             ? { backgroundColor: "#f8d7da" } // Red for AA mismatch
//             : isOtherMismatch
//               ? { backgroundColor: "#fff9e6" } // Yellow for other mismatches
//               : { backgroundColor: "#e6f4ea" }; // Green for all matches

//           const mismatchDetails = [
//             {
//               field: "AA Number",
//               excel: mismatch.rowData?.aaNumber || "-",
//               system: mismatch.apiData?.aaNumber || "-",
//               hasMismatch: mismatch.aaMismatch,
//             },
//             {
//               field: "Service Charges",
//               excel: mismatch.rowData?.serviceCharge || "-",
//               system: mismatch.apiData?.serviceCharge || "-",
//               hasMismatch: mismatch.serviceMismatch,
//             },
//             {
//               field: "Repair Charges",
//               excel: mismatch.rowData?.repairCharge || "-",
//               system: mismatch.apiData?.repairCharge || "-",
//               hasMismatch: mismatch.repairMismatch,
//             },
//             {
//               field: "Selling Partner",
//               excel: mismatch.rowData?.sellingPartner || "-",
//               system: mismatch.apiData?.sellingPartner || "-",
//               hasMismatch: mismatch.sellingPartnerMismatch,
//             },
//           ].filter((detail) => detail.hasMismatch);

//           return (
//             <TableRow key={index} sx={rowStyle}>
//               <TableCell>
//                 <RemoveRedEyeIcon
//                   style={{ cursor: "pointer", color: "#7E00D1" }}
//                   onClick={() =>
//                     navigate("/allDetails", {
//                       state: { aaNumber: aaNos[index] },
//                     })
//                   }
//                 />
//               </TableCell>
//               <TableCell>{aaNos[index] || "-"}</TableCell>
//               <TableCell>{imeis[index] || "-"}</TableCell>
//               <TableCell>
//                 {selectedRow?.creationDate
//                   ? dayjs(selectedRow.creationDate).format("DD-MM-YYYY")
//                   : "-"}
//               </TableCell>
//               <TableCell>
//                 {selectedRow?.closurDate
//                   ? dayjs(selectedRow.closurDate).format("DD-MM-YYYY")
//                   : "-"}
//               </TableCell>
//               <TableCell>{customerNames[index] || "-"}</TableCell>
//               <TableCell>{serviceTypes[index] || "-"}</TableCell>
//               <TableCell>{sellingPartners[index] || "-"}</TableCell>
//               <TableCell>{brands[index] || "-"}</TableCell>
//               <TableCell>{models[index] || "-"}</TableCell>
//               <TableCell>{repairs[index] || "-"}</TableCell>
//               <TableCell>{serviceCharges[index] || "-"}</TableCell>
//               <TableCell>{grossAmounts[index] || "-"}</TableCell>
//               <TableCell>{selectedRow?.invoiceStatus || "-"}</TableCell>
//               <TableCell style={{ position: "relative", cursor: "pointer" }}>
//                 {mismatchDetails.length > 0 ? (
//                   <Tooltip
//                     title={
//                       <div>
//                         <table
//                           className="table table-sm table-bordered mb-0"
//                           style={{
//                             backgroundColor: "#fff9c4",
//                             minWidth: "320px",
//                           }}
//                         >
//                           <thead>
//                             <tr>
//                               <th style={{ fontWeight: "bold" }}>Field</th>
//                               <th style={{ fontWeight: "bold" }}>System Data</th>
//                               <th style={{ fontWeight: "bold" }}>Server Data</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {mismatchDetails.map((detail, idx) => (
//                               <tr key={idx}>
//                                 <td>{detail.field}</td>
//                                 <td>{detail.excel}</td>
//                                 <td>{detail.system}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     }
//                     placement="top"
//                     arrow
//                     componentsProps={{
//                       tooltip: {
//                         sx: {
//                           backgroundColor: "#fff9c4",
//                           color: "black",
//                           boxShadow: 3,
//                           fontSize: 12,
//                           maxWidth: 400,
//                           padding: "8px",
//                         },
//                       },
//                     }}
//                   >
//                     <span style={{ color: "black", fontWeight: "bold" }}>
//                       Mismatches
//                     </span>
//                   </Tooltip>
//                 ) : (
//                   "-"
//                 )}
//               </TableCell>
//               <TableCell>{selectedRow?.remarks || "-"}</TableCell>
//               <TableCell>
//                 {selectedRow?.remarkFile ? (
//                   <a
//                     href={selectedRow.remarkFile}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <PictureAsPdfIcon sx={{ color: "red" }} />
//                   </a>
//                 ) : (
//                   "-"
//                 )}
//               </TableCell>
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     </Table>
//     <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//       <Button variant="outlined">
//         Total Amount: {selectedRow?.finalAmount}
//       </Button>
//     </Box>
//   </DialogContent>
//   <DialogActions>
//     <Button
//       onClick={handleCloseDialog}
//       style={{ backgroundColor: "#FE7C0B", color: "#fff" }}
//     >
//       Cancel
//     </Button>
//   </DialogActions>
// </Dialog>
//     </>
//   );
// };

// export default ValidateCases;

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

// const spinner = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   zIndex: 1050,
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "rgba(255,255,255,0.8)",
// };  








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
  Tooltip,
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ValidateCasesHook from "./ValidateCasesHook";
import { baseURLProd } from "api/api";

const ValidateCases = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [batches, setBatches] = useState();
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [showFinalTable, setShowFinalTable] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [mismatchData, setMismatchData] = useState({});
  const [selectedViewRow, setSelectedViewRow] = useState(null);

  const {
    data,
    loading,
    selectedRow,
    invoiceFile,
    openBox,
    setInvoiceFile,
    handleCloseDialog,
    handleUploadUtr,
    setOpenBox,
    setSelectedRow,
    setViewModalOpen,
    setLoading,
  } = ValidateCasesHook();

  const handleRowClick = (row, action = "view") => {
    console.log("onclick eye button service charge", row.serviceCharges);
    console.log("onclick eye button repair charge", row.repairCharges);
    console.log("onclick eye button aaNo", row.aaNo);
    console.log("onclick eye button selling partner", row.sellingPartner);

    setOpenBox(true);
    setSelectedRow(row);
    if (action === "view") {
      setSelectedViewRow(row);
      setOpenBox(true);
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

        const rowServiceCharges = row.serviceCharges
          ?.split(",")
          .map((val) => parseFloat(val.trim()));
        const rowRepairCharges = row.repairCharges
          ?.split(",")
          .map((val) => parseFloat(val.trim()));
        const rowAANumbers = row.aaNo?.split(",").map((val) => val.trim());
        const rowSellingPartners = row.sellingPartner
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
            sellingPartnerMismatch: rowSellingPartners[index] !== apiSellingPartner,
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
            console.log("API:", apiSellingPartner, "Row:", rowSellingPartners[index]);
          } else {
            console.log(`✅ Selling Partner matched for item ${index + 1}`);
 
          }
        });

        setApiData(items);
        setMismatchData(mismatches);
      })
      .catch ((error) => {
        console.error("Error fetching API data:", error);
        setApiData([]);
        setMismatchData({});
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (batchToDelete) => {
    setBatches((prev) => prev.filter((batch) => batch !== batchToDelete));
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
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
            }
          }}
          className="form-check-input"
        />
      ),
      ignoreRowClick: true,
    },
  {
    name: "Batch No",
    selector: (row) => row.batchNo,
    cell: (row) => (
      <span
        style={{
          backgroundColor: row.remarks && row.remarks !== "--" ? "#fff9e6" : "#e6f4ea", // Yellow if remarks exist, green if no remarks
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
    { name: "Vendor Name", selector: (row) => row.vendorName, width: "150px" },
    {
      name: "Approval Date",
      selector: (row) => dayjs(row.approvalDate).format("DD-MM-YYYY"),
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
      name: "Total Repair Charges",
      selector: (row) => row.totalRepairCharges,
      width: "150px",
    },
    {
      name: "Total Service Charges",
      selector: (row) => row.totalServiceCharges,
      width: "150px",
    },
    {
      name: "GST",
      selector: (row) => `${row.gst || "18"}%`,
      width: "150px",
    },
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
      name: "Remarks",
      selector: (row) => row.remarks,
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
  ];

  const [filters, setFilters] = useState({
    vendorName: "",
    invoiceNo: "",
    batchNo: "",
    filterDate: null,
  });

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
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

  // Define arrays for table rendering
  const customerNames =
    selectedRow?.customerName
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const aaNos =
    selectedRow?.aaNo?.split(",").map((item) => (item === "NULL" ? "-" : item)) ||
    [];
  const imeis =
    selectedRow?.imeiNo
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const serviceTypes =
    selectedRow?.serviceType
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const brands =
    selectedRow?.brand?.split(",").map((item) => (item === "NULL" ? "-" : item)) ||
    [];
  const models =
    selectedRow?.makeModel
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const repairs =
    selectedRow?.repairCharges
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const serviceCharges =
    selectedRow?.serviceCharges
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const gstCharges =
    selectedRow?.chargesInclGST
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const grossAmounts =
    selectedRow?.grossAmount
      ?.split(",")
      .map((item) => (item === "NULL" ? "-" : item)) || [];
  const sellingPartners =
    selectedRow?.sellingPartner
      ?.split(",")
      .map((item) => (item.trim() === "NULL" ? "-" : item.trim())) || [];
  const remarksArray =
    selectedRow?.remarks
      ?.split(",")
      .map((item) => (item.trim() === "NULL" || item.trim() === "" ? "-" : item.trim()))
      .reverse() || [];

  // Debug array lengths and contents
  useEffect(() => {
    if (selectedRow) {
      const lengths = {
        customerNames: customerNames.length,
        aaNos: aaNos.length,
        imeis: imeis.length,
        serviceTypes: serviceTypes.length,
        brands: brands.length,
        models: models.length,
        repairs: repairs.length,
        serviceCharges: serviceCharges.length,
        gstCharges: gstCharges.length,
        grossAmounts: grossAmounts.length,
        sellingPartners: sellingPartners.length,
        remarks: remarksArray.length,
      };
      console.log("Array contents:", {
        customerNames,
        aaNos,
        imeis,
        serviceTypes,
        brands,
        models,
        repairs,
        serviceCharges,
        gstCharges,
        grossAmounts,
        sellingPartners,
        remarks: remarksArray,
      });
      const max = Math.max(...Object.values(lengths));
      if (Object.values(lengths).some((len) => len !== max)) {
        console.warn("Array length mismatch:", lengths);
      }
    }
  }, [selectedRow]);

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
    remarksArray.length
  );

  return (
    <>
      <ToastContainer />
      <div className="container p-3 bg-white border rounded">
        <h4 className="mb-0">Schedule Cases</h4>

        <Box
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5 className="mb-0"></h5>
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
              key={`${batch.batchNo}-${index}`}
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

      <Dialog
        open={openBox}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
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
          {selectedRow?.invoice ? (
            <a
              href={selectedRow.invoice}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <PictureAsPdfIcon
                sx={{ color: "red", fontSize: "28px", cursor: "pointer" }}
              />
            </a>
          ) : (
            <span style={{ color: "gray", fontSize: "14px" }}>No Invoice</span>
          )}
        </DialogTitle>

        <DialogContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EBF3FF" }}>
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
                ].map((heading, index) => (
                  <TableCell
                    key={index}
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(maxLength)].map((_, index) => {
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
                      {selectedRow?.creationDate
                        ? dayjs(selectedRow.creationDate).format("DD-MM-YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {selectedRow?.closurDate
                        ? dayjs(selectedRow.closurDate).format("DD-MM-YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell>{customerNames[index] || "-"}</TableCell>
                    <TableCell>{serviceTypes[index] || "-"}</TableCell>
                    <TableCell>{sellingPartners[index] || "-"}</TableCell>
                    <TableCell>{brands[index] || "-"}</TableCell>
                    <TableCell>{models[index] || "-"}</TableCell>
                    <TableCell>{repairs[index] || "-"}</TableCell>
                    <TableCell>{serviceCharges[index] || "-"}</TableCell>
                    <TableCell>{grossAmounts[index] || "-"}</TableCell>
                    <TableCell>{selectedRow?.invoiceStatus || "-"}</TableCell>
                    <TableCell style={{ position: "relative", cursor: "pointer" }}>
                      {mismatchDetails.length > 0 ? (
                        <Tooltip
                          title={
                            <div>
                              <table
                                className="table table-sm table-bordered mb-0"
                                style={{
                                  backgroundColor: "#fff9c4",
                                  minWidth: "320px",
                                }}
                              >
                                <thead>
                                  <tr>
                                    <th style={{ fontWeight: "bold" }}>Field</th>
                                    <th style={{ fontWeight: "bold" }}>System Data</th>
                                    <th style={{ fontWeight: "bold" }}>Server Data</th>
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
                                backgroundColor: "#fff9c4",
                                color: "black",
                                boxShadow: 3,
                                fontSize: 12,
                                maxWidth: 400,
                                padding: "8px",
                              },
                            },
                          }}
                        >
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            Mismatches
                          </span>
                        </Tooltip>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{remarksArray[index] || "-"}</TableCell>
                    <TableCell>
                      {selectedRow?.remarkFile ? (
                        <a
                          href={selectedRow.remarkFile}
                          target="_blank"
                          rel="noopener noreferrer"
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button variant="outlined">
              Total Amount: {selectedRow?.finalAmount}
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
