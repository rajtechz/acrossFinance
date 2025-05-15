// import React, { useState, useEffect } from "react";
// import image1 from "../../../assets/images/p1.png";
// import image2 from "../../../assets/images/p2.png";
// import image3 from "../../../assets/images/p3.png";

// import "react-datepicker/dist/react-datepicker.css";
// import { FiUploadCloud } from "react-icons/fi";

// import {
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   FormControl,
//   Select,
//   MenuItem,
//   Typography,
//   Box,
//   Radio,
//   InputLabel,
//   FormControlLabel,
// } from "@mui/material";
// import Raise_concern_popup from "./raise_concern_popup";
// import { FormLabel } from "../../../../node_modules/@mui/material/index";
// // import { FaDownload } from "react-icons/fa";
// // import { getAllClaimDetailsPrefiled } from "../../api/api";

// const AllDetails = () => {
//   const [activeCollapse, setActiveCollapse] = useState("first");

//   const toggleCollapse = (section) => {
//     setActiveCollapse(activeCollapse === section ? null : section);
//   };

//   const [showHoldModal, setShowHoldModal] = useState(false);

//   return (
//     <div className="">
//       <div className=" bg-white rounded  p-4 mt-4 ">
//         <div className="d-flex justify-content-center align-items-center invoice_main_heading mb-4">
//           <h6 className="fw-semibold mb-0">AA Details</h6>
//         </div>
//         <div className="d-flex justify-content-between align-items-center invoice_main_heading">
//           <h6 className="fw-semibold mb-0">Vendor Name</h6>
//           <div className="border rounded px-3 py-1 bg-light small text-muted">
//             AA no: <span className="fw-semibold text-dark">123456789</span>
//           </div>
//         </div>
//         {/* <div
//         className="text-center fw-semibold mt-4 py-2 invoice_srn"
//         style={{ backgroundColor: "#eef4ff", borderRadius: "8px" }}
//       >
//         <h6>SRN Information</h6>
//       </div> */}
//         <div className="row mb-3 align-items-center mt-4">
//           {/* --- Section 1 --- */}
//           <div className="card invooice_collpase">
//             <div
//               className={`card-header d-flex justify-content-between align-items-center ${
//                 activeCollapse === "first"
//                   ? "open_bg text-white"
//                   : "close_bg text-dark"
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleCollapse("first")}
//             >
//               <strong>Customer Details</strong>
//               <span className="up_down">
//                 {activeCollapse === "first" ? "▲" : "▼"}
//               </span>
//             </div>

//             {activeCollapse === "first" && (
//               <div className="collapse_data">
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={4}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Customer Name
//                     </FormLabel>
//                     <TextField
//                       placeholder="Customer Name"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Primary Contact No
//                     </FormLabel>
//                     <TextField
//                       placeholder=" Primary Contact No"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Alternate Contact No
//                     </FormLabel>
//                     <TextField
//                       placeholder="Alternate Contact No"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                 </Grid>
//                 {/* <form
//                   className="mt-6 invoice_form"
//                   style={{ marginTop: "0px" }}
//                 >
//                   <div className="row align-items-center ">
//                     <div className="col-md-4 align-items-center">
//                       <label className="me-2 fw-semibold w-50">
//                         Customer Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control border-dark"
//                         placeholder="Customer Name"
//                       />
                     
//                     </div>
//                     <div className="col-md-4 align-items-center">
//                       <label className="me-2 fw-semibold w-50">
//                         Primary Contact No
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control border-dark"
//                         placeholder="Business Type"
//                       />
//                     </div>
//                     <div className="col-md-3 align-items-center">
//                       <label className="me-2 fw-semibold w-50">
//                         Alternate Contact No
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control border-dark"
//                         placeholder="Vehicle Type"
//                       />
//                     </div>
//                     <div className="col-md-4 align-items-center">
//                       <label className="me-2 fw-semibold w-50">
//                         Alternate Contact No
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control border-dark"
//                         placeholder="Vehicle Type"
//                       />
//                     </div>
//                   </div>
//                 </form> */}
//               </div>
//             )}
//           </div>

//           {/* --- Section 2 --- */}
//           <div className="card invooice_collpase mt-4">
//             <div
//               className={`card-header d-flex justify-content-between align-items-center ${
//                 activeCollapse === "second"
//                   ? "open_bg text-white"
//                   : "close_bg text-dark"
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleCollapse("second")}
//             >
//               <strong>Incident Details</strong>
//               <span className="up_down">
//                 {activeCollapse === "second" ? "▲" : "▼"}
//               </span>
//             </div>

//             {activeCollapse === "second" && (
//               <div className="collapse_data">
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Address
//                     </FormLabel>
//                     <TextField
//                       placeholder=" Address"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       State
//                     </FormLabel>
//                     <TextField
//                       placeholder="State"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       City
//                     </FormLabel>
//                     <TextField
//                       placeholder="City"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Pin Code
//                     </FormLabel>
//                     <TextField
//                       placeholder="  Pin Code"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Incident Description
//                     </FormLabel>
//                     <TextField
//                       placeholder="Incident Description"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                 </Grid>
//               </div>
//             )}
//           </div>
//           {/* --- Section 3 --- */}
//           <div className="card invooice_collpase mt-4">
//             <div
//               className={`card-header d-flex justify-content-between align-items-center ${
//                 activeCollapse === "third"
//                   ? "open_bg text-white"
//                   : "close_bg text-dark"
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleCollapse("third")}
//             >
//               <strong>Product Information</strong>
//               <span className="up_down">
//                 {activeCollapse === "third" ? "▲" : "▼"}
//               </span>
//             </div>

//             {activeCollapse === "third" && (
//               <div className="collapse_data">
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Product
//                     </FormLabel>
//                     <TextField
//                       placeholder=" Address"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Brand
//                     </FormLabel>
//                     <TextField
//                       placeholder="Brand"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Modal
//                     </FormLabel>
//                     <TextField
//                       placeholder="Modal"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Courier Company
//                     </FormLabel>
//                     <TextField
//                       placeholder="Courier Company"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Courier Slip Number
//                     </FormLabel>
//                     <TextField
//                       placeholder="Courier Slip Number"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Courier Dispatch Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Courier Dispatch Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Courier Intimate Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Courier Intimate Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Claim Register Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Claim Register Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Pick Up Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Pick Up Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Estimate Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Estimate Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Approval Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Approval Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Repair Complete date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Repair Complete date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Delivery Date
//                     </FormLabel>
//                     <TextField
//                       placeholder="Delivery Date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Repair Stage
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder=" Repair Stage"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Latest Remark
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder=" Latest Remark"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Excess Fees Payable
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder=" Excess Fees Payable"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Excess Fees Status
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="  Excess Fees Status"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Excess Fees Date
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Excess Fees Date"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Estimate Amount
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Estimate Amount"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Approved Amount
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Approved Amount"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Spare Part
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Spare Part"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Service Charges
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Service Charges"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Incentive
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Incentive"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Penalty
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Penalty"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Approved By
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Approved By"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Approved By
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Approved By"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Settled Amount
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Settled Amount"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       UTRN
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="UTRN"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Settlement Date
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Settlement Date"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Reject Cancel Reason
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Reject Cancel Reason"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={3}>
//                     <FormLabel
//                       sx={{ mb: 1, fontWeight: "bold", color: "black" }}
//                     >
//                       Sub Provider name
//                     </FormLabel>
//                     <TextField
//                       fullWidth
//                       placeholder="Sub Provider name"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                 </Grid>
//               </div>
//             )}
//           </div>
//           {/* --- Section 4 --- */}
//           <div className="card invooice_collpase mt-4">
//             <div
//               className={`card-header d-flex justify-content-between align-items-center ${
//                 activeCollapse === "fourth"
//                   ? "open_bg text-white"
//                   : "close_bg text-dark"
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleCollapse("fourth")}
//             >
//               <strong>Estimation Photo</strong>
//               <span className="up_down">
//                 {activeCollapse === "fourth" ? "▲" : "▼"}
//               </span>
//             </div>

//             {activeCollapse === "fourth" && (
//               <div className="collapse_data">
//                 <div
//                   className="d-flex flex-wrap all_broken_img"
//                   style={{ gap: "20px" }}
//                 >
//                   <img src={image1} alt="Broken Mobile" />
//                   <img src={image2} alt="Broken Mobile" />
//                   <img src={image3} alt="Broken Mobile" />

//                   <img src={image1} alt="Broken Mobile" />
//                   {/* Add more images if needed */}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="card invooice_collpase mt-4">
//             <div
//               className={`card-header d-flex justify-content-between align-items-center ${
//                 activeCollapse === "fifth"
//                   ? "open_bg text-white"
//                   : "close_bg text-dark"
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleCollapse("fifth")}
//             >
//               <strong>Remarks</strong>
//               <span className="up_down">
//                 {activeCollapse === "fifth" ? "▲" : "▼"}
//               </span>
//             </div>

//             {activeCollapse === "fifth" && (
//               <div className="collapse_data">
//                 <form style={{ marginTop: "0px" }}>
//                   <Grid container spacing={2} alignItems="center">
//                     {/* Status */}
//                     <Grid item md={3}>
//                       <FormControl fullWidth required>
//                         <InputLabel>Status</InputLabel>
//                         <Select defaultValue="">
//                           <MenuItem value="" disabled hidden>
//                             Status
//                           </MenuItem>
//                           <MenuItem value="approved">Approved</MenuItem>
//                           <MenuItem value="pending">Pending</MenuItem>
//                           <MenuItem value="rejected">Rejected</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Grid>

//                     {/* Remark Category */}
//                     <Grid item md={3}>
//                       <TextField
//                         fullWidth
//                         label="Remark Category"
//                         variant="outlined"
//                         size="small"
//                         InputProps={{ sx: { borderColor: "black" } }}
//                       />
//                     </Grid>

//                     {/* Date */}
//                     <Grid item md={3}>
//                       <TextField
//                         fullWidth
//                         label="Date"
//                         variant="outlined"
//                         size="small"
//                         placeholder="Modal"
//                         InputProps={{ sx: { borderColor: "black" } }}
//                       />
//                     </Grid>

//                     {/* Time */}
//                     <Grid item md={3}>
//                       <TextField
//                         fullWidth
//                         label="Time"
//                         variant="outlined"
//                         size="small"
//                         placeholder="Time"
//                         InputProps={{ sx: { borderColor: "black" } }}
//                       />
//                     </Grid>
//                   </Grid>

//                   <Grid container spacing={2} alignItems="flex-end" mt={2}>
//                     {/* Remarks Textarea */}
//                     <Grid item md={3}>
//                       <TextField
//                         fullWidth
//                         label="Remarks"
//                         multiline
//                         rows={4}
//                         placeholder="Remarks"
//                         variant="outlined"
//                         size="small"
//                       />
//                     </Grid>

//                     {/* Button */}
//                     <Grid item md={4}>
//                       <Button
//                         variant="contained"
//                         fullWidth
//                         style={{
//                           backgroundColor: "#8000d7",
//                         }}
//                       >
//                         Download Document
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>

//         <Box
//           sx={{
//             display: "flex",
//             gap: "20px",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           className="mt-4"
//         >
//           <Button
//             sx={{ width: { xs: "100%", sm: "15%", md: "20%" } }}
//             variant="outlined"
//             fullWidth
//             style={{
//               backgroundColor: "#fff",
//               border: "1px solid #8000d7",
//               color: "#8000d7",
//             }}
//           >
//             Close
//           </Button>

//           <Button
//             onClick={() => {
//               setShowHoldModal(true);
//             }}
//             variant="contained"
//             fullWidth
//             style={{
//               backgroundColor: "#8000d7",
//             }}
//             sx={{ width: { xs: "100%", sm: "15%", md: "20%" } }}
//           >
//             Raise Remark
//           </Button>
//         </Box>
//       </div>

//       <Dialog
//         open={showHoldModal}
//         onClose={() => setShowHoldModal(false)}
//         className="newClaimDiv"
//         fullWidth={true}
//         maxWidth="md"
//       >
//         <DialogTitle className="editTitle">Upload Invoice</DialogTitle>
//         <DialogContent>
//           <div>
//             <form className="raise_concern_popup_form">
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h5 className="mb-0 fw-bold">Vendor Name</h5>
//                 <div className="bg-light border px-3 py-1 rounded-3 text-muted">
//                   <span>
//                     AA no - <strong>123456789</strong>
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label
//                       htmlFor="selectDate"
//                       className="form-label fw-semibold"
//                     >
//                       Date
//                     </label>
//                     <input
//                       type="text"
//                       id="selectDate"
//                       className="form-control py-3"
//                       placeholder="Date"
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label
//                       htmlFor="selectTime"
//                       className="form-label fw-semibold"
//                     >
//                       Time
//                     </label>
//                     <input
//                       type="text"
//                       id="selectTime"
//                       className="form-control py-3"
//                       placeholder="Date"
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* Status Dropdown */}
//               <div className="mb-3">
//                 <label
//                   htmlFor="statusSelect"
//                   className="form-label fw-semibold"
//                 >
//                   Status
//                 </label>
//                 <select
//                   className="form-select py-3"
//                   id="statusSelect"
//                   required
//                   defaultValue=""
//                 >
//                   <option value="" disabled hidden>
//                     Select Status
//                   </option>
//                   <option value="approved">Approved</option>
//                   <option value="pending">Pending</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label
//                   htmlFor="statusSelect"
//                   className="form-label fw-semibold"
//                 >
//                   Remarks Category
//                 </label>
//                 <select
//                   className="form-select py-3"
//                   id="statusSelect"
//                   required
//                   defaultValue=""
//                 >
//                   <option value="" disabled hidden>
//                     Select Remarks Category
//                   </option>
//                   <option value="approved">Approved</option>
//                   <option value="pending">Pending</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label
//                   htmlFor="issueConcern"
//                   className="form-label fw-semibold"
//                 >
//                   Remarks Issue
//                 </label>
//                 <textarea
//                   className="form-control rounded-2"
//                   id="issueConcern"
//                   rows="4"
//                   placeholder="Enter your issues"
//                 ></textarea>
//               </div>
//               <div
//                 className="text-center p-4"
//                 style={{
//                   border: "1px dashed #ccc",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                 }}
//               >
//                 <FiUploadCloud size={28} color="#6c757d" />
//                 <p className="mt-2 mb-0 text-muted raise_drag">
//                   Drag and drop or <span className="text-primary">browse</span>{" "}
//                   your files
//                 </p>
//                 <input
//                   type="file"
//                   //  ref={fileInputRef}
//                   className="d-none"
//                   //  onChange={handleFileChange}
//                 />
//               </div>
//             </form>
//           </div>
//         </DialogContent>
//         <DialogActions
//           style={{
//             justifyContent: "center",
//             paddingBottom: "24px",
//           }}
//         >
//           {/* <button
//             className="btn btn-primary"
//             style={{
//               backgroundColor: "#8000d7",
//               border: "none",
//               padding: "10px 80px",
//               borderRadius: "8px",
//               fontWeight: "500",
//               fontSize: "16px",
//             }}
//             onClick={() => setShowHoldModal(false)}
//           >
//             <span className="ms-2">Submit</span>
//           </button> */}

//           <Button
//             onClick={() => setShowHoldModal(false)}
//             variant="contained"
//             fullWidth
//             style={{
//               backgroundColor: "#8000d7",
//             }}
//             sx={{ width: { xs: "100%", sm: "15%", md: "20%" } }}
//           >
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AllDetails;




import React, { useState, useEffect } from "react";
import image1 from "../../../assets/images/p1.png";
import image2 from "../../../assets/images/p2.png";
import image3 from "../../../assets/images/p3.png";
import { useLocation } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { FiUploadCloud } from "react-icons/fi";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  Radio,
  InputLabel,
  FormControlLabel,
} from "@mui/material";
import Raise_concern_popup from "./raise_concern_popup";
import { FormLabel } from "../../../../node_modules/@mui/material/index";
// import { FaDownload } from "react-icons/fa";
// import { getAllClaimDetailsPrefiled } from "../../api/api";

const AllDetails = () => {
  const BASE_URL = "https://mintflix.live:8086/api/Auto";
  const location = useLocation();
  const aA_Number = location.state?.aaNumber;

  console.log(aA_Number, "aaNumber");
  const [activeCollapse, setActiveCollapse] = useState("first");

  const [claimData, setClaimData] = useState(null);
  console.log(claimData, "claim Data all output");

  useEffect(() => {
    if (!aA_Number) return;

    const fetchClaimData = async () => {
      const myUrl = `${BASE_URL}/GetAllGadgetClaimDetails?aaNumber=${aA_Number}`;
      try {
        const response = await fetch(myUrl);
        const data = await response.json();
        console.log("API Response:", data);

        if (data.status) {
          setClaimData(data.dataItems);
        } else {
          console.warn("API Error:", data.message);
        }
      } catch (error) {
        console.error("Fetch Exception:", error.message);
      }
    };

    fetchClaimData();
  }, [aA_Number]);

  const toggleCollapse = (section) => {
    setActiveCollapse(activeCollapse === section ? null : section);
  };

  const [showHoldModal, setShowHoldModal] = useState(false);

  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return "--";
    const [datePart] = dateTimeStr.split(" ");
    const [year, month, day] = datePart.split("-"); // Changed order of destructuring
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="">
      <div className=" bg-white rounded  p-4 mt-4 ">
        <div className="d-flex justify-content-center align-items-center invoice_main_heading mb-4">
          <h6 className="fw-semibold mb-0">AA Details</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center invoice_main_heading">
          <h6 className="fw-semibold mb-0">Vendor Name</h6>
          <div className="border rounded px-3 py-1 bg-light small text-muted">
            AA no: <span className="fw-semibold text-dark">{aA_Number}</span>
          </div>
        </div>
        {/* <div
        className="text-center fw-semibold mt-4 py-2 invoice_srn"
        style={{ backgroundColor: "#eef4ff", borderRadius: "8px" }}
      >
        <h6>SRN Information</h6>
      </div> */}
        <div className="row mb-3 align-items-center mt-4">
          {/* --- Section 1 --- */}
          <div className="card invooice_collpase">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                activeCollapse === "first"
                  ? "open_bg text-white"
                  : "close_bg text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("first")}
            >
              <strong>Customer Details</strong>
              <span className="up_down">
                {activeCollapse === "first" ? "▲" : "▼"}
              </span>
            </div>

            {activeCollapse === "first" && (
              <div className="collapse_data">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Customer Name
                    </FormLabel>
                    <TextField
                      placeholder="Customer Name"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.customerName || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Primary Contact No
                    </FormLabel>
                    <TextField
                      placeholder=" Primary Contact No"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.primaryContactNo || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Alternate Contact No
                    </FormLabel>
                    <TextField
                      placeholder="Alternate Contact No"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.alternateContactNo || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                {/* <form
                  className="mt-6 invoice_form"
                  style={{ marginTop: "0px" }}
                >
                  <div className="row align-items-center ">
                    <div className="col-md-4 align-items-center">
                      <label className="me-2 fw-semibold w-50">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        className="form-control border-dark"
                        placeholder="Customer Name"
                      />
                     
                    </div>
                    <div className="col-md-4 align-items-center">
                      <label className="me-2 fw-semibold w-50">
                        Primary Contact No
                      </label>
                      <input
                        type="text"
                        className="form-control border-dark"
                        placeholder="Business Type"
                      />
                    </div>
                    <div className="col-md-3 align-items-center">
                      <label className="me-2 fw-semibold w-50">
                        Alternate Contact No
                      </label>
                      <input
                        type="text"
                        className="form-control border-dark"
                        placeholder="Vehicle Type"
                      />
                    </div>
                    <div className="col-md-4 align-items-center">
                      <label className="me-2 fw-semibold w-50">
                        Alternate Contact No
                      </label>
                      <input
                        type="text"
                        className="form-control border-dark"
                        placeholder="Vehicle Type"
                      />
                    </div>
                  </div>
                </form> */}
              </div>
            )}
          </div>

          {/* --- Section 2 --- */}
          <div className="card invooice_collpase mt-4">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                activeCollapse === "second"
                  ? "open_bg text-white"
                  : "close_bg text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("second")}
            >
              <strong>Incident Details</strong>
              <span className="up_down">
                {activeCollapse === "second" ? "▲" : "▼"}
              </span>
            </div>

            {activeCollapse === "second" && (
              <div className="collapse_data">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Address
                    </FormLabel>
                    <TextField
                      placeholder=" Address"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.address || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      State
                    </FormLabel>
                    <TextField
                      placeholder="State"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.state || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      City
                    </FormLabel>
                    <TextField
                      placeholder="City"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.city || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Pin Code
                    </FormLabel>
                    <TextField
                      placeholder="  Pin Code"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.pincode || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Incident Description
                    </FormLabel>
                    <TextField
                      placeholder="Incident Description"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.incident_Description || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
          {/* --- Section 3 --- */}
          <div className="card invooice_collpase mt-4">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                activeCollapse === "third"
                  ? "open_bg text-white"
                  : "close_bg text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("third")}
            >
              <strong>Product Information</strong>
              <span className="up_down">
                {activeCollapse === "third" ? "▲" : "▼"}
              </span>
            </div>

            {activeCollapse === "third" && (
              <div className="collapse_data">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Product
                    </FormLabel>
                    <TextField
                      placeholder=" Address"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.product || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Brand
                    </FormLabel>
                    <TextField
                      placeholder="Brand"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.brand || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Modal
                    </FormLabel>
                    <TextField
                      placeholder="Modal"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.model || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Courier Company
                    </FormLabel>
                    <TextField
                      placeholder="Courier Company"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.couriorcompany || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Courier Slip Number
                    </FormLabel>
                    <TextField
                      placeholder="Courier Slip Number"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.couriorSlipnumber || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Courier Dispatch Date
                    </FormLabel>
                    <TextField
                      placeholder="Courier Dispatch Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.caseDispatchDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Courier Intimate Date
                    </FormLabel>
                    <TextField
                      placeholder="Courier Intimate Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.claimIntimationDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Claim Register Date
                    </FormLabel>
                    <TextField
                      placeholder="Claim Register Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={formatDate(claimData?.[0]?.claimRegisterDate)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Pick Up Date
                    </FormLabel>
                    <TextField
                      placeholder="Pick Up Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.pickUpDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Estimate Date
                    </FormLabel>
                    <TextField
                      placeholder="Estimate Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.estimateDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Approval Date
                    </FormLabel>
                    <TextField
                      placeholder="Approval Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.approvalDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Repair Complete date
                    </FormLabel>
                    <TextField
                      placeholder="Repair Complete date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.repairCompleteDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Delivery Date
                    </FormLabel>
                    <TextField
                      placeholder="Delivery Date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formatDate(claimData?.[0]?.deliveryDate)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Repair Stage
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder=" Repair Stage"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.repairStage || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Latest Remark
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder=" Latest Remark"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.latestRemark || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Excess Fees Payable
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder=" Excess Fees Payable"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.excessFeesPayable || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Excess Fees Status
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="  Excess Fees Status"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.excessFeesStatus || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Excess Fees Date
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Excess Fees Date"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.excessFeesDate || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Estimate Amount
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Estimate Amount"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.estimateAmount || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Approved Amount
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Approved Amount"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.approvedAmount || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Spare Part
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Spare Part"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.spare_part || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Service Charges
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Service Charges"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.service_Charges || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Incentive
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Incentive"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.incentive || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Penalty
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Penalty"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.penalty || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Approved By
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Approved By"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.approvedBy || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Approved By
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Approved By"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.approvedBy || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Settled Amount
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Settled Amount"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.settledAmount || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      UTRN
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="UTRN"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.utrn || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Settlement Date
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Settlement Date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={claimData?.[0]?.settlementDate || ""}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Reject Cancel Reason
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Reject Cancel Reason"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.rejectCancel_Reason || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormLabel
                      sx={{ mb: 1, fontWeight: "bold", color: "black" }}
                    >
                      Sub Provider name
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Sub Provider name"
                      InputLabelProps={{ shrink: true }}
                      value={claimData?.[0]?.subProviderName || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
          {/* --- Section 4 --- */}
          <div className="card invooice_collpase mt-4">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                activeCollapse === "fourth"
                  ? "open_bg text-white"
                  : "close_bg text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("fourth")}
            >
              <strong>Estimation Photo</strong>
              <span className="up_down">
                {activeCollapse === "fourth" ? "▲" : "▼"}
              </span>
            </div>

            {activeCollapse === "fourth" && (
              <div className="collapse_data">
                <div
                  className="d-flex flex-wrap all_broken_img"
                  style={{ gap: "20px" }}
                >
                  {claimData?.[0]?.estimationPhoto ? (
                    <img
                      src={claimData[0].estimationPhoto}
                      alt="Estimation"
                      // style={{ width: "150px", height: "auto" }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="card invooice_collpase mt-4">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                activeCollapse === "fifth"
                  ? "open_bg text-white"
                  : "close_bg text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("fifth")}
            >
              <strong>Remarks</strong>
              <span className="up_down">
                {activeCollapse === "fifth" ? "▲" : "▼"}
              </span>
            </div>

            {activeCollapse === "fifth" && (
              <div className="collapse_data">
                <form style={{ marginTop: "0px" }}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Status */}
                    <Grid item md={3}>
                      <FormControl fullWidth required>
                        <InputLabel>Status</InputLabel>
                        <Select defaultValue="">
                          <MenuItem value="" disabled hidden>
                            Status
                          </MenuItem>
                          <MenuItem value="approved">Approved</MenuItem>
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Remark Category */}
                    <Grid item md={3}>
                      <TextField
                        fullWidth
                        label="Remark Category"
                        variant="outlined"
                        size="small"
                        InputProps={{ sx: { borderColor: "black" } }}
                      />
                    </Grid>

                    {/* Date */}
                    <Grid item md={3}>
                      <TextField
                        fullWidth
                        label="Date"
                        variant="outlined"
                        size="small"
                        placeholder="Modal"
                        InputProps={{ sx: { borderColor: "black" } }}
                      />
                    </Grid>

                    {/* Time */}
                    <Grid item md={3}>
                      <TextField
                        fullWidth
                        label="Time"
                        variant="outlined"
                        size="small"
                        placeholder="Time"
                        InputProps={{ sx: { borderColor: "black" } }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="flex-end" mt={2}>
                    {/* Remarks Textarea */}
                    <Grid item md={3}>
                      <TextField
                        fullWidth
                        label="Remarks"
                        multiline
                        rows={4}
                        placeholder="Remarks"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>

                    {/* Button */}
                    <Grid item md={4}>
                      <Button
                        variant="contained"
                        fullWidth
                        style={{
                          backgroundColor: "#8000d7",
                        }}
                      >
                        Download Document
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            )}
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="mt-4"
        >
          <Button
            sx={{ width: { xs: "100%", sm: "15%", md: "20%" } }}
            variant="outlined"
            fullWidth
            style={{
              backgroundColor: "#fff",
              border: "1px solid #8000d7",
              color: "#8000d7",
            }}
          >
            Close
          </Button>

          <Button
            onClick={() => {
              setShowHoldModal(true);
            }}
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#8000d7",
            }}
            sx={{ width: { xs: "100%", sm: "15%", md: "20%" } }}
          >
            Raise Remark
          </Button>
        </Box>
      </div>

      <Dialog
        open={showHoldModal}
        onClose={() => setShowHoldModal(false)}
        className="newClaimDiv"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle className="editTitle">Upload Invoice</DialogTitle>
        <DialogContent>
          <div>
            <form className="raise_concern_popup_form">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 fw-bold">Vendor Name</h5>
                <div className="bg-light border px-3 py-1 rounded-3 text-muted">
                  <span>
                    AA no - <strong>123456789</strong>
                  </span>
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="selectDate"
                      className="form-label fw-semibold"
                    >
                      Date
                    </label>
                    <input
                      type="text"
                      id="selectDate"
                      className="form-control py-3"
                      placeholder="Date"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="selectTime"
                      className="form-label fw-semibold"
                    >
                      Time
                    </label>
                    <input
                      type="text"
                      id="selectTime"
                      className="form-control py-3"
                      placeholder="Date"
                    />
                  </div>
                </div>
              </div>
              {/* Status Dropdown */}
              <div className="mb-3">
                <label
                  htmlFor="statusSelect"
                  className="form-label fw-semibold"
                >
                  Status
                </label>
                <select
                  className="form-select py-3"
                  id="statusSelect"
                  required
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Select Status
                  </option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="statusSelect"
                  className="form-label fw-semibold"
                >
                  Remarks Category
                </label>
                <select
                  className="form-select py-3"
                  id="statusSelect"
                  required
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Select Remarks Category
                  </option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="issueConcern"
                  className="form-label fw-semibold"
                >
                  Remarks Issue
                </label>
                <textarea
                  className="form-control rounded-2"
                  id="issueConcern"
                  rows="4"
                  placeholder="Enter your issues"
                ></textarea>
              </div>
              <div
                className="text-center p-4"
                style={{
                  border: "1px dashed #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <FiUploadCloud size={28} color="#6c757d" />
                <p className="mt-2 mb-0 text-muted raise_drag">
                  Drag and drop or <span className="text-primary">browse</span>{" "}
                  your files
                </p>
                <input
                  type="file"
                  //  ref={fileInputRef}
                  className="d-none"
                  //  onChange={handleFileChange}
                />
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            paddingBottom: "24px",
          }}
        >
          {/* <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#8000d7",
              border: "none",
              padding: "10px 80px",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "16px",
            }}
            onClick={() => setShowHoldModal(false)}
          >
            <span className="ms-2">Submit</span>
          </button> */}

          <Button
            onClick={() => setShowHoldModal(false)}
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#8000d7",
            }}
            sx={{ width: { xs: "100%", sm: "15%", md: "20%" } }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllDetails;
