import MainCard from 'components/MainCard';
import {
  Grid, Dialog, DialogTitle, DialogContent,Chip, DialogActions, TextField, Button, FormControl, Select, MenuItem, Typography, Radio, FormControlLabel,
} from '@mui/material';
import DataTable from 'react-data-table-component';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Hook from './Hook';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useRef, useState } from 'react';
import { baseURLProd } from 'api/api';
import GenerateInvoice from './GenerateInvoice';

import { useSelector } from 'react-redux';

const VendorList = () => {
  const { open, handleEdit, handleClose, loadingData, vendorData, tableHeaderStyle } = Hook()
  const invoice = useSelector((state) => state.invoice.invoice);
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [openBox, setOpenBox] = useState(false)
  const [filtershow, setFiltershow] = useState(false);
  const [filterDate, setFilterDate] = useState(null);
  const [searchSRN, setSearchSRN] = useState("");
  const [invoiceError, setInvoiceError] = useState(false);
  const [searchServiceType, setSearchServiceType] = useState("");
  const navigate = useNavigate();
  const handleFiltershow = () => {
    setFiltershow(!filtershow)
  }
  const handleOpenDialog = () => setOpenBox(true);
  const handleCloseDialog = () => setOpenBox(false);
  const [status, setStatus] = useState('');
  const handleRowClick = (row) => {
    console.log("this is row ", row.srnNo)
    navigate(`/claimdetail/${row.srnNo}`);
  };
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Batch Created':
        return { backgroundColor: '#E4FFE4', borderColor: '#2EC52E', color: "#2EC52E" }; // Green
      case 'Invoice Uploaded':
        return { backgroundColor: '#FFFBE3', borderColor: '#E5C80A', color: '#E5C80A ' };
      case 'Completed':
        return { backgroundColor: '#34A853', borderColor: '#34A853', };
      default:
        return { backgroundColor: 'grey', borderColor: 'darkgrey' };
    }
  };
  const getStatusBadgeColor2 = (paymentstatus) => {
    switch (paymentstatus) {
      case 'Paid':
        return { backgroundColor: '#34A853', borderColor: '#34A853', color: "white" }; // Green
      case 'Pending':
        return { backgroundColor: '#E7BC3A', borderColor: '#E7BC3A', color: 'white' };
      default:
        return { backgroundColor: 'grey', borderColor: 'darkgrey' };
    }
  };

  const column = [
    {
      name: '',
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.some((item) => item.srnNo === row.srnNo)}
          onChange={() => handleCheckboxChange(row)}
          disabled={row.status === "Batch Created" || row.status === "Invoice Uploaded"}
          style={{ cursor: row.status === "Batch Created" || row.status === "Invoice Uploaded" ? 'not-allowed' : 'pointer' }}
          className="form-check-input"
        />
      ),
      ignoreRowClick: true,
    },
    {
      name: 'Srn No',
      selector: row => row.srnNo,
      width: "200px"
    },
    {
      name: 'Service Type',
      selector: row => row.serviceType,
      width: "150px"
    },
    {
      name: 'Cost',
      selector: row => row.cost,
    },
    {
      name: 'Vehicle Type',
      selector: row => row.vehicleType,
      width: "150px"
    },
    {
      name: 'Service Date',
      selector: row => row.serviceDate,
      width: "150px"
    },
    {
      name: 'Status',
      selector: row => row.status,
      width: "200px",
      cell: row => {
        const { backgroundColor, borderColor, color } = getStatusBadgeColor(row.status);
        return (
          <span
            style={{
              backgroundColor,
              color,
              padding: '7px 18px',
              borderRadius: '14px',
              fontWeight: 'bold',
              fontSize: '0.9em',
              border: `1px solid ${borderColor}`,
            }}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      name: 'Payment Status',
      selector: row => row.paymentStatus,
      cell: row => {
        const { backgroundColor, borderColor, color } = getStatusBadgeColor2(row.paymentStatus);
        return (
          <span
            style={{
              backgroundColor,
              color,
              padding: '7px 18px',
              borderRadius: '14px',
              fontWeight: 'bold',
              fontSize: '0.9em',
              border: `1px solid ${borderColor}`,
            }}
          >
            {row.paymentStatus}
          </span>
        );
      },
    }
  ];

  const handleCheckboxChange = (row) => {
    setSelectedRows((prev) =>
      prev.some((item) => item.srnNo === row.srnNo)
        ? prev.filter((item) => item.srnNo !== row.srnNo)
        : [...prev, row]
    );
  };
  const dataList = vendorData || [];
  // console.log("data of vendor ", vendorData)
  const filteredData = dataList.filter(row => {
    // Existing filters
    const matchesSRN = row.srnNo.toLowerCase().includes(searchSRN.toLowerCase());
    const matchesServiceType = row.serviceType.toLowerCase().includes(searchServiceType.toLowerCase());
    const matchesStatus = status ? row.status.toLowerCase() === status.toLowerCase() : true;
    let matchesDate = true;
    if (filterDate) {
      // Extract only the date part from the serviceDate string
      const rowDate = dayjs(row.serviceDate, "DD-MM-YYYY").format("DD-MM-YYYY");
      console.log("adad", row.serviceDate)
      const selectedDate = dayjs(filterDate).format("DD-MM-YYYY");
      console.log("mmm", selectedDate)
      matchesDate = rowDate === selectedDate;
    }
    return matchesSRN && matchesServiceType && matchesStatus && matchesDate;
  });


  // const filteredData = dataList.filter(row => {
  //   // Existing filters
  //   const matchesSRN = row.srnNo.toLowerCase().includes(searchSRN.toLowerCase());
  //   const matchesServiceType = row.serviceType.toLowerCase().includes(searchServiceType.toLowerCase());
  //   const matchesStatus = status ? row.status.toLowerCase() === status.toLowerCase() : true;
  //   let matchesDate = true;
  //   if (filterDate) {

  //     const rowDate = dayjs(row.serviceDate, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD");
  //     // const filterDateFormatted = dayjs(filterDate).format("YYYY-MM-DD");
  //     matchesDate = rowDate.isSame(filterDate, 'day');
  //   }

  //   return matchesSRN && matchesServiceType && matchesStatus && matchesDate;
  // });
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      handleOpenDialog();
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const csvText = e.target.result;
      const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
      if (rows.length < 2) return;
      const headers = rows[0].split(",").map(header => header.trim());
      const data = rows.slice(1).map((row, index) => {
        const values = row.split(",").map(value => value.trim());
        return {
          srnNo: values[headers.indexOf("srnNo")] || values[headers.indexOf("srnNo")] || `SRN${index + 1}`,
          serviceType: values[headers.indexOf("serviceType")] || values[headers.indexOf("serviceType")] || "N/A",
          cost: parseFloat(values[headers.indexOf("cost")] || values[headers.indexOf("cost")] || 0),
        };
      });

      setSelectedRows(data);
    };
  };
  const [gstSelected, setGstSelected] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const handleSubmit = async () => {
    const formData = new FormData();
    if (selectedRows.length > 0) {
      const srnIds = selectedRows.map(row => row.srnNo).join(",");
      const serviceTypes = selectedRows.map(row => row.serviceType).join(",");
      formData.append("SRNID", srnIds);
      formData.append("ServiceType", serviceTypes);
    }
    formData.append("FinalAmount", calculateTotal().toFixed(2));
    formData.append("GST", gstSelected === '18%' ? '18%' : null);
    formData.append("GrossAmount", calculateGross().toFixed(2));
    if (gstSelected === '18%' && !invoiceFile) {
      setInvoiceError(true);
      toast.error("Invoice upload is required for GST 18%");
      return;
    }
    setInvoiceError(false);
    if (invoiceFile) {
      formData.append("Invoice", invoiceFile);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    try {
      const response = await fetch(`${baseURLProd}BatchUploadInvoice`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("API Success here:", result);
      toast.success("Invoice submitted successfully!");
      // Reset fields
      setSelectedRows([]);
      setGstSelected(null);
      setInvoiceFile(null);
      handleCloseDialog();
    } catch (error) {
      console.error("Full error:", error);
      toast.error(`Submission failed: ${error.message}`);
    }
  };
  const calculateGross = () => {
    const subtotal = selectedRows.reduce((acc, row) => acc + Number(row.cost), 0);
    return subtotal;
  };
  const calculateTotal = () => {
    const subtotal = calculateGross();
    if (gstSelected === '18%') {

      return Math.round((subtotal * 1.18 + Number.EPSILON) * 100) / 100;
    }

    return Math.round((subtotal + Number.EPSILON) * 100) / 100;
  };

  return (
    <div style={{ padding: "37px", background: "white", borderRadius: "12px", boxShadow: '0px 2px 6px 0px #0000001A' }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <ToastContainer />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h2">Vendor Name</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className='d-flex gap-2 '>
            <button onClick={handleOpenDialog} disabled={selectedRows.length === 0} className='btn btn-primary my-1'
              style={{ backgroundColor: '#ECF4FF', border: '0px', color: '#1363DF', border: '1px solid #1363DF', borderRadius: "8px" }}><FileUploadIcon />Upload Invoice</button>
            <button
              onClick={handleButtonClick}
              className='btn btn-primary my-1'
              style={{
                backgroundColor: '#ECF4FF',
                border: '1px solid #1363DF',
                color: '#1363DF',
                borderRadius: "8px"
              }}
            >
              <FileUploadIcon /> Upload Sheet
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              hidden
              onChange={handleCSVUpload}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <p onClick={handleFiltershow}
            style={{ cursor: 'pointer', border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px 0px #1018280D", padding: '10px' }}>
            <FilterListIcon />
            Filter
          </p>

        </Grid>
      </Grid>
      {
        filtershow ?
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search by SRN No"
                  value={searchSRN}
                  onChange={(e) => setSearchSRN(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search by Service Type"
                  value={searchServiceType}
                  onChange={(e) => setSearchServiceType(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth className='designationForm'>
                  <Select
                    id="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty>
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Batch Created">Batch Created</MenuItem>
                    <MenuItem value="Invoice Uploaded">Invoice Uploaded</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Filter by Service Date"
                    value={filterDate}
                    onChange={setFilterDate}
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
                {filterDate && (
                  <Button variant="contained"
                    onClick={() => setFilterDate(null)}
                    style={{ marginLeft: 8 }}>
                    Clear
                  </Button>
                )}
              </Grid>
            </Grid>
          </> : null
      }

      <Grid item xs={12} md={12} lg={12}>
        <div>
          <DataTable
            columns={column}
            data={filteredData}
            fixedHeader
            className="data-table invoicetable"
            onRowClicked={handleRowClick}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 25]}
            subHeader
          />
          {loadingData && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1050,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}>
              <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: "#FE7C0B" }} />
            </div>
          )}
        </div>
      </Grid>
      <Dialog open={openBox} onClose={handleCloseDialog} className='newClaimDiv'
        fullWidth={true} maxWidth="md">
        <DialogTitle className='editTitle'>Upload Invoice</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered invoicetable">
                  <thead style={{ background: "#EBF3FF" }}>
                    <tr>
                      <th>Sr.No</th>
                      <th>SRN ID</th>
                      <th>Service Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRows.length > 0 ? (
                      selectedRows.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{row.srnNo}</td>
                          <td>{row.serviceType || "N/A"}</td>
                          <td>{row.cost.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No Data Available</td>
                      </tr>
                    )}
                    {selectedRows.length > 0 && (
                      <tr>
                        <td style={{ background: "#FCFCFC", border: '0px' }}></td>
                        <td style={{ background: "#FCFCFC", border: '0px' }}></td>
                        <td style={{ background: "#FCFCFC" }}></td>
                        <td style={{ background: "#EDF4FF", fontWeight: "bold" }}>
                          Gross Amount: {calculateGross().toFixed(2)}
                          <br />
                          Final Amount: {calculateTotal().toFixed(2)}
                          <br />
                          {gstSelected === '18%' && (
                            <span style={{ fontSize: '0.8em', color: '#666' }}>
                              (Includes 18% GST)
                            </span>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Grid>
            <div className='d-flex justify-content-between radiobtndiv'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<FileUploadIcon />}
                    style={{
                      backgroundColor: '#ECF4FF',
                      color: '#1363DF',
                      border: '1px solid #1363DF'
                    }}

                  >
                    Upload Invoice
                    <input
                      accept="image/*,application/pdf"
                      name="invoice"
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setInvoiceFile(file);
                        }
                      }}
                    />
                  </Button>

                  {invoiceFile && (
                    <Typography variant="caption"
                      style={{
                        marginTop: '4px',
                        color: '#666',
                        fontStyle: 'italic',
                        textAlign: 'center'
                      }}
                    >
                      Selected: {invoiceFile.name}
                    </Typography>

                  )}
                  {invoiceError && (
                    <Typography variant="caption" style={{ color: 'red' }}>
                      Invoice upload is required for GST 18%
                    </Typography>
                  )}
                </div>
                <GenerateInvoice />
              </div>
              <div>
                <p className='mb-0 p-2 fw'>.GST</p>
              </div>
              <div className='d-flex'>
                <div className='d-flex'>
                  <button
                    className='me-3 mb-0 radiobtn'
                    onClick={() => setGstSelected('18%')}
                    style={{ backgroundColor: gstSelected === '18%' ? '#ECF4FF' : 'transparent' }}
                  >
                    Yes
                    <FormControlLabel
                      className='ms-2'
                      value="18%"
                      control={<Radio checked={gstSelected === '18%'} />}
                    />
                  </button>

                </div>
                <div className='d-flex'>
                  {/* <button
                    className='me-3 mb-0 radiobtn'
                    onClick={() => setGstSelected('no')}
                    style={{ backgroundColor: gstSelected === 'no' ? '#ECF4FF' : 'transparent' }}>
                    No
                    <FormControlLabel className='ms-2' value="no" control={<Radio checked={gstSelected === 'no'} />} />
                  </button> */}

                  <button
                    className="me-3 mb-0 radiobtn"
                    onClick={() => {
                      setGstSelected('no');
                      setInvoiceFile(null);
                    }}
                    style={{ backgroundColor: gstSelected === 'no' ? '#ECF4FF' : 'transparent' }}
                  >
                    No
                    <FormControlLabel className="ms-2" value="no" control={<Radio checked={gstSelected === 'no'} />} />
                  </button>

                </div>
              </div>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions className='editButtonDiv'>
          <Button
            onClick={handleSubmit}
            className='btn btn-primary' style={{ backgroundColor: '#FE7C0B', border: '0px' }}>
            Submit
          </Button>
          <Button onClick={handleCloseDialog} className='btn btn-primary' style={{ backgroundColor: '#FE7C0B', border: '0px' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default VendorList;
