import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton
  , FormControl, InputLabel, Select, MenuItem, Box, Checkbox, ListItemText, Chip,
  Tabs, Typography
} from '@mui/material';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import JoditEditor from "jodit-react"
import { useEffect } from 'react';
import { useState } from 'react';
import { baseURLProd } from 'api/api';
const ClaimDetailpage = () => {
  const location = useLocation();
  const { rowDetails } = location.state || {};
  const [addconcern, setAddconcern] = useState(false);
  const { srnNo } = useParams();
  const [srnData, setSrnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [raiseConcern, setRaiseConcern] = useState('')
  const [issueConcern, setIssueConcern] = useState("");

  // console.log("dsdfsdf", srnNo)
  // Form state for SRN details
  const [formEditData, setFormEditData] = useState({
    customerFirstName: "",
    vehicleType: "",
    state: "",
    city: "",
    srN_No: "",
    serviceDate: "",
    serviceTime: "",
    cost: "",
    country: "",
  });
  const handleSelectChange = (e) => {
    setIssueConcern(e.target.value);
  };

  const handleRaiseChange = (e) => [
    setRaiseConcern(e.target.value)
  ]
  useEffect(() => {
    if (!srnNo) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURLProd}GetAutoSRNData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ srN_No: srnNo }),
        });

        const data = await response.json();
        console.log("response for input ", data)
        if (data.status) {
          const dateTime = data.data.serviceDate || "";
          const formattedDate = dateTime ? dateTime.split("T")[0] : "";
          const formattedTime = dateTime ? dateTime.split("T")[1].slice(0, 5) : "";

          setFormEditData(prevState => ({
            ...prevState,
            ...data.data,
            serviceDate: formattedDate,
            serviceTime: formattedTime,
          }));

        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [srnNo]);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,application/pdf",
    multiple: true,
  });

  const handleHomepage = () => {
    window.location.assign('/vendorList');
  };

  const handleRaiseConcern = () => {

    setAddconcern(true);
  };

  const handleAddcloseConcern = () => {
    setAddconcern(false);


  };

  const handleSubmitConcern = async () => {
    if (!srnNo || !issueConcern) {
      alert("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("SRN_No", srnNo);
    formData.append("Raise_Concern", raiseConcern || "");
    formData.append("Issue_Concern", issueConcern);

    // Append files if available
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("Image", file);
      });
    }

    try {
      const response = await fetch(`${baseURLProd}RaiseConcern`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status) {
        toast.success("Concern raised successfully!");
        // alert("Concern raised successfully!");
        handleAddcloseConcern();
        setFiles("")
        setRaiseConcern("")
        setIssueConcern("")

      } else {
        alert(`Failed to raise concern: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting concern:", error);
      alert("Error submitting concern. Please try again.");
    }
  };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  return (
    <div>

      <ToastContainer />

      <div className='m-5 d-flex justify-content-between'>
        <div>
          <Typography variant='h3'>Vendor Name</Typography>
        </div>
        <div>
          <Button variant="outlined">{formEditData.srN_No}</Button>
        </div>
      </div>
      <div className='upperDiv'>
        <Typography variant='h3'>SRN Information</Typography>
      </div>
      <div className='belowDiv mb-2'>
        <div>
          <div className=''>
            <div>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Customer Name"
                    type="text"
                    name="customer_name"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.customerFirstName}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Business Type"
                    type="text"
                    name="businessType"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // value={formEditData.companyName}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Vehicle Type"
                    type="text"
                    name="vehicleType"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.vehicleType}
                    className='editInputField'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Service Time"
                    type="time"
                    name="serviceTime"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.serviceTime}
                    onChange={(e) => setFormEditData({ ...formEditData, serviceTime: e.target.value })} // Allow manual changes
                    className='editInputField'
                  />

                </div>

                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Service Location"
                    type="text"
                    name="serviceLocation"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // value={formEditData.model_Variant}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Service Date"
                    type="date"
                    name="serviceDate"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.serviceDate} // Now formatted as "YYYY-MM-DD"
                    onChange={(e) => setFormEditData({ ...formEditData, serviceDate: e.target.value })}
                    className='editInputField'
                  />

                </div>
              </div>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Vehicle Registration No"
                    type="text"
                    name="callerEmail"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.vehicleRegistrationNo}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>

                  <TextField
                    margin="dense"
                    label="Services opted"
                    type="text"
                    name="callerTel"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.servicesOpted}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="KM"
                    type="text"
                    name="callerTel"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.km}
                    className='editInputField'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Cost"
                    type="text"
                    name="callerEmail"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.cost}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>

                  <TextField
                    margin="dense"
                    label="Pre Bill Amount"
                    type="number"
                    name="callerTel"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // value={formEditData.callerTel}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <FormControl className='selectstatusForm mt-2'>
                    <InputLabel id="select-label" >TAX</InputLabel>
                    <Select
                      labelId="select-label"
                      label='Select Caller Type'
                      id="select2"
                      name='callerType'
                      // value={formEditData.callerType || ''}
                      className='selectDiv2'
                    >
                      <MenuItem value="Email">TAT</MenuItem>
                      <MenuItem value="Post">VAT</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='upperDiv mt-4'>
        <Typography variant='h3'>Incident Location</Typography>
      </div>
      <div className='belowDiv mb-2'>
        <div>
          <div className=''>
            <div>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Street"
                    type="text"
                    name="callername"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // value={formEditData.callername}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="State"
                    type="text"
                    name="callerTel"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.state}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="City"
                    type="text"
                    name="city"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.city}
                    className='editInputField'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Country"
                    type="text"
                    name="callerEmail"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formEditData.country}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <TextField
                    margin="dense"
                    label="Zipcode"
                    type="text"
                    name="callerEmail"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // value={formEditData.callerEmail}
                    className='editInputField'
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='editButtonDiv mt-4'>
        <Button onClick={() => handleHomepage()}
          className='btn btn-primary me-2' style={{ backgroundColor: '#fafafb', border: '1px solid #FE7C0B', color: "#FE7C0B" }}>
          Cancel
        </Button>
        <Button
          onClick={() => handleRaiseConcern(formEditData.srN_No)}
          className='btn btn-primary' style={{ backgroundColor: '#FE7C0B', border: '0px' }}>
          Raise Concern
        </Button>
      </div>
      <Dialog open={addconcern} onClose={handleAddcloseConcern} className='newClaimDiv'
        fullWidth={true} maxWidth="sm">
        <div style={{ background: "#D8E7FF" }} className='d-flex justify-content-between align-items-center p-3'> <Button variant="outlined">{formEditData.srN_No}</Button><p className='fw mb-0' style={{ textAlign: 'end', color: '#1363DF' }}>For Assistance Call on : 99999XXXX</p></div>
        <DialogContent>
          <Box sx={{ p: 3, maxWidth: 800, borderRadius: 1 }}>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <InputLabel>Raise Concern for SRN Id</InputLabel>
              <TextField
                margin="dense"
                type="text"
                name="srnId"
                fullWidth
                InputLabelProps={{ shrink: true }}
                className='editInputField'
                onChange={handleRaiseChange}
                value={raiseConcern}
              />
            </div>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <InputLabel>Issue Concern</InputLabel>
                <FormControl fullWidth className='selectstatusForm mt-2'>
                  <InputLabel>Issue Concern</InputLabel>
                  <Select

                    label="Issue Concern"
                    value={issueConcern} onChange={handleSelectChange}
                  >
                    <MenuItem value="Wrong SRN No">Wrong SRN No</MenuItem>
                    <MenuItem value="Incorrect Service Details">Incorrect Service Details</MenuItem>
                    <MenuItem value="Extra Charges">Extra Charges</MenuItem>
                    <MenuItem value="Technical Issues">Technical Issues</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4'>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #D3D3D3",
                    borderRadius: "8px",
                    p: 3,
                    textAlign: "center",
                    backgroundColor: isDragActive ? "#f7f7f7" : "#fff",
                    cursor: "pointer",
                  }}
                  className=""
                >
                  <input {...getInputProps()} />
                  <Typography variant="body1" color="textSecondary">
                    {isDragActive
                      ? "Drop the files here..."
                      : "Drag and drop files here, or click to browse"}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Browse Files
                  </Button>
                  {files.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6">Uploaded Files:</Typography>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Box>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-4'>
          <Button onClick={handleAddcloseConcern} className='btn '
            style={{ backgroundColor: '#white', border: '1px solid #FE7C0B', color: "#FE7C0B" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitConcern}
            className='btn btn-primary' style={{ backgroundColor: '#FE7C0B', border: '0px' }}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default ClaimDetailpage
