import { baseURLProd } from 'api/api';
import React, { useEffect, useState } from 'react';

const Hook = () => {
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false); // Fixed typo in `setloadingData`
  const [vendorData, setVendorData] = useState([]);
  const vendorId = localStorage.getItem("VendorId");

  const handleEdit = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log('test');
  };

  useEffect(() => {
    console.log("lala", baseURLProd);

    const fetchData = async () => {
      setLoadingData(true); // Set loading to true before fetching data
      try {
        const response = await fetch(`${baseURLProd}GetVendorData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setVendorData(data?.dataItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingData(false); // Ensure loading is set to false after fetching
      }
    };

    fetchData();
  }, []); // Runs only once when the component mounts

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
  };

  return {
    open,
    handleEdit,
    handleClose,
    handleSubmit,
    loadingData, // Now correctly updates when data is loading
    vendorData,
    tableHeaderStyle
  };
};

export default Hook;
