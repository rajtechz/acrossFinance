import MainCard from 'components/MainCard';
import {
  Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
  , FormControl, Select, MenuItem, Typography, Radio, FormControlLabel,
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
import { useState } from 'react';
import { baseURLProd } from 'api/api';

const Traveldetail = () => {
  const { open, handleEdit, handleClose, loadingData, vendorData, tableHeaderStyle } = Hook()
  const [selectedRows, setSelectedRows] = useState([]);
  const [openBox, setOpenBox] = useState(false)
  const [filtershow, setFiltershow] = useState(false);
  const [filterDate, setFilterDate] = useState(null);
  const [searchSRN, setSearchSRN] = useState("");
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
      case 'Invoice Uploaded':
        return { backgroundColor: '#E4FFE4', borderColor: '#2EC52E', color: "#2EC52E" }; // Green
      case 'In Progress':
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
        />
      ),
      // width: '50px',
      ignoreRowClick: true,
    },

    {
      name: 'Srn No',
      selector: row => row.srnNo,
      // width: "200px"
    },
    {
      name: 'Service Type',
      selector: row => row.serviceType,
      // width: "320px"
    },
    {
      name: 'Cost',
      selector: row => row.cost,
      // width: "200px"

    },
    {
      name: 'Vehicle Type',
      selector: row => row.vehicleType,
      // width: "200px"
    },
    {
      name: 'Service Date',
      selector: row => row.serviceDate,
      // width: "200px"
    },
    {
      name: 'Status',
      selector: row => row.status,
      width: "240px",
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
      // width: "240px",
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

  // const dataList = vendorData && vendorData.length > 0 ? vendorData : dummyData;
  // const dataList = dummyData && dummyData.length > 0 ? dummyData : dummyData;
  const filteredData = dataList.filter(row => {
    // Existing filters
    const matchesSRN = row.srnNo.toLowerCase().includes(searchSRN.toLowerCase());
    const matchesServiceType = row.serviceType.toLowerCase().includes(searchServiceType.toLowerCase());
    const matchesStatus = status ? row.status.toLowerCase() === status.toLowerCase() : true;
    // Date filter - only apply if a date is selected
    let matchesDate = true;
    if (filterDate) {
      const rowDate = dayjs(row.serviceDate);
      matchesDate = rowDate.isSame(filterDate, 'day');
    }
    return matchesSRN && matchesServiceType && matchesStatus && matchesDate;
  });
  const [gstSelected, setGstSelected] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const handleSubmit = async () => {
    const formData = new FormData();
    if (selectedRows.length > 0) {
      formData.append("SRNID", selectedRows[0].srnNo);
      formData.append("ServiceType", selectedRows[0].serviceType);
      formData.append("FinalAmount", calculateTotal().toFixed(2));
    }
    formData.append("GST", gstSelected === 'yes' ? 'yes' : 'no');
    formData.append("GrossAmount", calculateGross().toFixed(2));
    if (invoiceFile) {
      formData.append("Invoice", invoiceFile);
    } else {
      toast.error("Please upload an invoice file!");
      return;
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
      console.log("API Success:", result);
      toast.success("Invoice submitted successfully!");
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
    if (gstSelected === 'yes') {
      // Round to 2 decimal places
      return Math.round((subtotal * 1.18 + Number.EPSILON) * 100) / 100;
    }
    // Return subtotal with 2 decimal places (in case it has more)
    return Math.round((subtotal + Number.EPSILON) * 100) / 100;
  };
  // console.log(filteredData)
  return (

    <div style={{  padding: "37px", background: "white", borderRadius: "12px", boxShadow: '0px 2px 6px 0px #0000001A' }}>

      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <ToastContainer />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h2">Vendor Name</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <button onClick={handleOpenDialog} disabled={selectedRows.length === 0} className='btn btn-primary my-1'
            style={{ backgroundColor: '#ECF4FF', border: '0px', color: '#1363DF', border: '1px solid #1363DF', borderRadius: "8px" }}><FileUploadIcon />Upload Invoice</button>
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
                    displayEmpty
                  >
                    <MenuItem value="">All Status</MenuItem> {/* Default to show all */}
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
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
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        inputProps: {
                          value: filterDate ? filterDate.format('DD-MM-YYYY') : '', // Custom format
                        },
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
            data={filteredData.slice(0, 4)}
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
            {/* Table Section (Scrollable) */}
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
                          <td>{row.cost}</td>
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
                          {gstSelected === 'yes' && (
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

              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  <Typography
                    variant="caption"
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
              </div>
              <div>
                <p className='mb-0 p-2 fw'>. GST</p>
              </div>
              <div className='d-flex'>
                <div className='d-flex'>
                  <button
                    className='me-3 mb-0 radiobtn'
                    onClick={() => setGstSelected('yes')}
                    style={{ backgroundColor: gstSelected === 'yes' ? '#ECF4FF' : 'transparent' }}
                  >
                    Yes
                    <FormControlLabel
                      className='ms-2'
                      value="yes"
                      control={<Radio checked={gstSelected === 'yes'} />}
                    />
                  </button>
                </div>
                <div className='d-flex'>
                  <button
                    className='me-3 mb-0 radiobtn'
                    onClick={() => setGstSelected('no')}
                    style={{ backgroundColor: gstSelected === 'no' ? '#ECF4FF' : 'transparent' }}
                  >
                    No
                    <FormControlLabel
                      className='ms-2'
                      value="no"
                      control={<Radio checked={gstSelected === 'no'} />}
                    />
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

export default Traveldetail;

