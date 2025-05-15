import MainCard from 'components/MainCard';
import {
    Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
    , FormControl, InputLabel, Select, MenuItem, Typography, Radio, FormControlLabel, FormLabel,
    RadioGroup,
} from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DataTable from 'react-data-table-component';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Hook from './Hook';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';
import image from '../../../assets/images/users/baricon.png'
const DashboardAdmin = () => {
    const { filter, handleClose, handleEdit, handleFileChange,
        // , handlePreview, handleUpload,
        setLoading, fetchData, isListcoverEnabled
        , preview, policyNumber, handlePolicyNumberChange, handlePassportNumberChange, passportNumber,
        upload, handleCloseUpload, handleClosePreview, open, selectedRow,
        clientDetail, selectClaim, setSelectClaim, customerDetail,
        incidentType, setincidentType, selectcover, setSelectCOver,
        admissiondate, handleAdmissionDateChange, estimatedloss, setEstimatedloss, formData, handleChange,
        selectedbenefits, setselectedbenefits, selectcallerType, setSelectcallerType,
        selectclientName, setSelectClientname, handleSubmit, benefits,
        formValues, loading, dob, setDob,
        reserveAmt, setReserveAmt,
        exchangeRate, handleExchangeRateChange, dischargeDate, handleDischargeDateChange,
        selectedcountry, setSelectedCountry, countries, typeofLoss, setTypeofLoss, loadingData,
        passportpolicyList, isSelectEnabled, formatDateToSave, handleIncidentdateChange, handleNameChange, memberOptions,
        selectedMember }
        = Hook()
    const [filtershow, setFiltershow] = useState(false);
    const navigate = useNavigate();
    const handleFiltershow = () => {
      setFiltershow(true)
    }
    
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    
    const dummyData = [
      {
        policyNumber: "001",
        masterPolicyNumber: "MP001",
        proposalNumber: "Car",
        sbiClaimNo: "Service A",
        acrossClaimNo: "₹15,000",
        claim_Status: "In Progress",
        Status: "Pending",
      },
      {
        policyNumber: "002",
        masterPolicyNumber: "MP002",
        proposalNumber: "Bike",
        sbiClaimNo: "Service B",
        acrossClaimNo: "₹7,500",
        claim_Status: "Completed",
        Status: "Paid",
      },
      {
        policyNumber: "003",
        masterPolicyNumber: "MP003",
        proposalNumber: "Truck",
        sbiClaimNo: "Service C",
        acrossClaimNo: "₹20,000",
        claim_Status: "In Progress",
        Status: "Paid",
      },
      {
        policyNumber: "004",
        masterPolicyNumber: "MP004",
        proposalNumber: "SUV",
        sbiClaimNo: "Service D",
        acrossClaimNo: "₹12,000",
        claim_Status: "Completed",
        Status: "Pending",
      },
      {
        policyNumber: "005",
        masterPolicyNumber: "MP005",
        proposalNumber: "Van",
        sbiClaimNo: "Service E",
        acrossClaimNo: "₹9,000",
        claim_Status: "Pending",
        Status: "Paid",
      },
    ];
    const handleRowClick = (row) => {
      navigate(`/claimdetail/${row.policyNumber}`, { state: { rowDetails: row } });
    };
    const getStatusBadgeColor = (status) => {
      switch (status) {
        case 'Completed':
          return { backgroundColor: '#E4FFE4', borderColor: '#2EC52E',color:"#2EC52E" }; // Green
        case 'Pending':
          return { backgroundColor: '#FDECEF', borderColor: '#EB445A',color:'#EB445A' }; // Light Red
        case 'In Progress':
          return { backgroundColor: '#FFFBE3', borderColor: '#E5C80A',color:'#E5C80A ' }; // Yellow
        case 'null':
          return { backgroundColor: '', borderColor: '' }; // No color
        default:
          return { backgroundColor: 'grey', borderColor: 'darkgrey' }; // Default Gray
      }
    };
    const getStatusBadgeColor2 = (paymentstatus) => {
      switch (paymentstatus) {
        case 'Paid':
          return { backgroundColor: '#34A853', borderColor: '#34A853',color:"white" }; // Green
        case 'Pending':
          return { backgroundColor: '#E7BC3A', borderColor: '#E7BC3A',color:'white' }; // Light Red
        default:
          return { backgroundColor: 'grey', borderColor: 'darkgrey' }; // Default Gray
      }
    };
    const column = [
      {
        name: '',
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.policyNumber)}
            onChange={() => handleCheckboxChange(row.policyNumber)}
          />
        ),
        width: '50px', // Adjust width as needed
        ignoreRowClick: true, // Prevent triggering row click when clicking checkbox
      },
      {
        name: 'Srn No',
        selector: row => row.policyNumber,
        // width: "200px"
  
      },
      {
        name: 'Service Date',
        selector: row => row.masterPolicyNumber,
        // width: "200px"
  
      },
      {
        name: 'Vehicle Type',
        selector: row => row.proposalNumber,
        // width: "200px"
  
      },
      {
        name: 'Service Type',
        selector: row => row.sbiClaimNo,
        // width: "320px"
  
      },
      {
        name: 'Cost',
        selector: row => row.acrossClaimNo,
        // width: "200px"
  
      },
      {
        name: 'Status',
        selector: row => row.claim_Status,
        width: "240px",
        cell: row => {
          const { backgroundColor, borderColor,color } = getStatusBadgeColor(row.claim_Status);
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
              {row.claim_Status}
            </span>
          );
        },
      },
      
      {
        name: 'Payment Status',
        selector: row => row.Status,
        width: "240px",
          cell: row => {
            const { backgroundColor, borderColor,color } = getStatusBadgeColor2(row.Status);
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
                {row.Status}
              </span>
            );
      },
    }
  
    ];
    // Handle Checkbox Change
    const handleCheckboxChange = (id) => {
      setSelectedRows((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((rowId) => rowId !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
      );
    };
    const tableHeaderStyle = {
      headCells: {
        style: {
          fontWeight: "bold",
          fontSize: "17px",
          backgroundColor: "rgba(241,244,249,255)",
        },
        head: {
          style: {
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }
        },
        cells: {
          style: {
            fontSize: "0.875rem",
            fontFamily: "'Public Sans',sans-serif",
          }
        },
        rows: {
          style: {
            cursor: 'pointer',
          },
        }
      }
    }
    
    return (

        <div style={{ margin: '46px', padding: "37px", background: "white", borderRadius: "12px", boxShadow: '0px 2px 6px 0px #0000001A' }}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid >
                    <ToastContainer />
                </Grid>
                <div className='d-flex justify-content-between'>
                    <div>
                        <Typography variant="h2">LOB Head Dashboard</Typography>
                    </div>
                    <div>
                        <button className='btn my-1 me-3' onClick={handleEdit}
                            style={{ backgroundColor: 'white', color: '#A3A3A3', border: '1px solid #A3A3A3', borderRadius: "8px", boxShadow: " 0px 1px 2px 0px #0000001F" }}>Reports</button>
                        <button className='btn my-1 me-3' onClick={handleEdit}
                            style={{
                                backgroundColor: 'white', color: '#A3A3A3', border: '1px solid #A3A3A3', borderRadius: "8px", boxShadow: " 0px 1px 2px 0px #0000001F"
                            }}>Vendor List
                            {/* <FormControl className='designationForm'>
                             <InputLabel id="select-label" >Vendor List</InputLabel>
                            <Select
                                labelId="select-label"
                                label='Vendor List'
                                id="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className='me-3'
                            >
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                            </Select>
                            </FormControl> */}
                        </button>
                        <button className='btn btn-primary my-1' onClick={handleEdit}
                            style={{ backgroundColor: '#ECF4FF', border: '0px', color: '#1363DF', border: '1px solid #1363DF', borderRadius: "8px" }}><FileUploadIcon />Upload Invoice</button>
                    </div>
                </div>
                <div>
                    <div className='row my-4'>
                        <div className='col d-flex justify-content-between dashboardCard'>
                            <div>
                                <p>Total SRN No</p>
                                <Typography variant='h3'>10295</Typography>
                            </div>
                            <div>
                                <img src={image} />
                            </div>
                        </div>
                        <div className='col d-flex justify-content-between dashboardCard'>
                            <div>
                                <p>New SRN Active</p>
                                <Typography variant='h3'>10295</Typography>
                            </div>
                            <div>
                                <img src={image} />
                            </div>
                        </div>
                        <div className='col d-flex justify-content-between dashboardCard'>
                            <div>
                                <p>Pending SRN Cases</p>
                                <Typography variant='h3'>10295</Typography>
                            </div>
                            <div>
                                <img src={image} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-end'>
                    {loadingData && (
                        <div style={{ zIndex: 1050 }} className="d-flex   align-items-center position-absolute w-100 h-100">
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ marginLeft: '38rem', color: "#FE7C0B" }} />
                        </div>
                    )}

                    <DataTable
                        columns={column}
                        data={dummyData}
                        fixedHeader
                        customStyles={tableHeaderStyle}
                        className='data-table'
                        onRowClicked={handleRowClick}
                        pagination
                        subHeader
                        subHeaderComponent={
                            <>
                                <div className='row align-items-center'>
                                    <div className='col-auto'>
                                        <button
                                            className='btn btn-primary my-1'
                                            onClick={handleEdit}
                                            style={{
                                                backgroundColor: '#ECF4FF',
                                                border: '0px',
                                                color: '#1363DF',
                                                border: '1px solid #1363DF',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            + Create Vendor
                                        </button>
                                    </div>

                                    <div className='col d-flex justify-content-end'>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type='text'
                                                className='form-control searchInput me-2'
                                                placeholder='Search by SRN Id'
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <div className='searchIcon me-3'>
                                                <SearchOutlinedIcon style={{ cursor: 'pointer' }} />
                                            </div>

                                            <p
                                                className='d-flex align-items-center'
                                                onClick={handleFiltershow}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: '1px solid #D0D5DD',
                                                    boxShadow: '0px 1px 2px 0px #1018280D',
                                                    padding: '10px',
                                                    margin: '0',
                                                }}
                                            >
                                                <FilterListIcon />
                                                Filter
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {filtershow ?
                                    <>
                                        <div className='row my-2'>
                                            <div className='col d-flex'>
                                                <input
                                                    type='text'
                                                    className='form-control seviceSearch'
                                                    placeholder='Search by Service Type'
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                <div className='searchIcon'>
                                                    <SearchOutlinedIcon style={{ cursor: "pointer" }} />
                                                </div>
                                                <div className='d-flex'>
                                                </div>
                                            </div>

                                            <div className='col'>
                                                <FormControl className='designationForm'>
                                                    <InputLabel id="select-label" >Status</InputLabel>
                                                    <Select
                                                        labelId="select-label"
                                                        label='Select Status'
                                                        id="select"
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        className=''
                                                    >
                                                        <MenuItem value="Completed">Completed</MenuItem>
                                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                                        <MenuItem value="Pending">Pending</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div className='col'>
                                                <TextField
                                                    margin="dense"
                                                    label="Select Created Date "
                                                    type="date"
                                                    name="dob"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={createdDate}
                                                    onChange={(e) => setCreatedDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                    : ""}
                            </>
                        }
                    />
                </div>
            </Grid>
            <Dialog open={open} onClose={handleClose} className='newClaimDiv'
                fullWidth={true} maxWidth="md">
                <DialogTitle className='editTitle'>Upload Invoice</DialogTitle>
                <DialogContent>
                    <div className='invoicediv'>
                        <div>
                            <table className='table table-bordered invoicetable'>
                                <thead style={{ background: "#EBF3FF" }}>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>SRN ID</th>
                                        <th>Invoice No</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>12/10/2024</td>
                                        <td>Four Wheeler</td>
                                        <td>10000</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>12/10/2024</td>
                                        <td>Four Wheeler</td>
                                        <td>10000</td>
                                    </tr><tr>
                                        <td>3</td>
                                        <td>12/10/2024</td>
                                        <td>Four Wheeler</td>
                                        <td>10000</td>
                                    </tr><tr>
                                        <td>4</td>
                                        <td>12/10/2024</td>
                                        <td>Four Wheeler</td>
                                        <td>10000</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>12/10/2024</td>
                                        <td>Four Wheeler</td>
                                        <td>10000</td>
                                    </tr>
                                    <tr>
                                        <td style={{ background: "#FCFCFC", border: '0px 0px' }}></td>
                                        <td style={{ background: "#FCFCFC", border: '0px 0px' }}></td>
                                        <td style={{ background: "#EDF4FF" }}>Gross Amount</td>
                                        <td style={{ background: "#EDF4FF" }}>50000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex justify-content-between radiobtndiv'>
                            <div>
                                <p className='mb-0 p-2 fw'>. GST</p>
                            </div>
                            <div className='d-flex'>
                                <div className='d-flex'><button className='me-3 mb-0 radiobtn'>Yes <FormControlLabel
                                    className='ms-2'
                                    value="option1"
                                    control={<Radio />} /></button>
                                </div>
                                <div className='d-flex'><button className='me-3 mb-0 radiobtn'>No<FormControlLabel
                                    className='ms-2'
                                    value="option2"
                                    control={<Radio />} /></button></div>
                            </div>
                        </div>
                    </div>
                    {/* )
          })} */}
                </DialogContent>
                <DialogActions className='editButtonDiv'>
                    {/* {loading ? <CircularProgress /> : null} */}
                    <Button onClick={handleClose} className='btn btn-primary' style={{ backgroundColor: '#FE7C0B', border: '0px' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className='btn btn-primary' style={{ backgroundColor: '#FE7C0B', border: '0px' }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        
        </div>
    )
};

export default DashboardAdmin;

