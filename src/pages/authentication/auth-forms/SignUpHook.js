import React, { useState } from 'react'

const SignUpHook = () => {
    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
    });
    const [formValue,setFormvalue] =useState({
        vendorName:'',
        serviceType:'',
        workingHour:'',
        contactPerson:'',
        email:'',
        password:'',
        accountNo:'',
        ifscCode:'',
        cancelledcheque:'',
        adharNo:'',
        adharFront:"",
        adharBack:'',
        panNo:'',
        panFront:'',
        panBack:'',
        address:'',
        gstNo:"",
        gstImage:'',
        validity:'',
        validityimg:'',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormvalue((prev) => ({
          ...prev,
          [name]: value,
        }));
    }
    // const handleFileChange = (event) => {
    //     setSelectedFiles(event.target.files);
    //   };

    const handleFetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error fetching location:", error.message);
                    alert("Unable to fetch location. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };
    const handleSignUp=()=>{

    }
    return {
        location, handleFetchLocation,handleSignUp,handleChange,formValue
    }
}

export default SignUpHook
