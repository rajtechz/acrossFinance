import React, { useState } from 'react'
import {
    Grid, Stack, Typography, Box, Button,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDropzone } from "react-dropzone";
import SignUpHook from './SignUpHook';

const SignUP = () => {
    const { location, handleFetchLocation, handleSignUp, formValue } = SignUpHook();

    const [files, setFiles] = useState([]);
    const onDrop = (acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*,application/pdf",
        multiple: true,
    });

    return (
        <div>
            <Formik
                initialValues={{
                    vendorName: '',
                    serviceType: '',
                    workingHour: '',
                    contactPerson: '',
                    email: '',
                    password: '',
                    accountNo: '',
                    ifscCode: '',
                    cancelledcheque: '',
                    adharNo: '',
                    adharFront: '',
                    adharBack: '',
                    panNo: '',
                    panFront: '',
                    panBack: '',
                    address: '',
                    gstNo: '',
                    gstImage: '',
                    validity: '',
                    validityimg: '',

                }}
                validationSchema={Yup.object().shape({
                    vendorName: Yup.string().required('Vendor Name is required'),
                    serviceType: Yup.string().required('Service Type is required'),
                    workingHour: Yup.string().required('Working Hour is required'),
                    contactPerson: Yup.string().required('Contact Person is required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    accountNo: Yup.string()
                        .matches(/^\d+$/, 'Account Number must be numeric')
                        .required('Account Number is required'),
                    ifscCode: Yup.string()
                        .matches(/^[A-Z|a-z]{4}[0][\d]{6}$/, 'Invalid IFSC Code format')
                        .required('IFSC Code is required'),
                    cancelledcheque: Yup.mixed().required('Cancelled Cheque is required'),
                    adharNo: Yup.string()
                        .matches(/^\d{12}$/, 'Aadhar Number must be 12 digits')
                        .required('Aadhar Number is required'),

                    adharFront: Yup.mixed()
                        .required("Front side of your document is required")
                        .test("fileSize", "File size is too large (max 2MB)", (value) =>
                            value ? value.size <= 2 * 1024 * 1024 : true
                        )
                        .test("fileType", "Unsupported file type. Only JPEG, PNG are allowed", (value) =>
                            value ? ["image/jpeg", "image/png"].includes(value.type) : true
                        ),
                    adharBack: Yup.mixed()
                        .required("Back side of your document is required")
                        .test("fileSize", "File size is too large (max 2MB)", (value) =>
                            value ? value.size <= 2 * 1024 * 1024 : true
                        )
                        .test("fileType", "Unsupported file type. Only JPEG, PNG are allowed", (value) =>
                            value ? ["image/jpeg", "image/png"].includes(value.type) : true
                        ),
                    panNo: Yup.string()
                        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Number')
                        .required('PAN Number is required'),
                    panFront: Yup.mixed().required('PAN Front image is required'),
                    panBack: Yup.mixed().required('PAN Back image is required'),
                    address: Yup.string().required('Address is required'),
                    gstNo: Yup.string()
                        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Invalid GST Number')
                        .required('GST Number is required'),
                    gstImage: Yup.mixed().required('GST Image is required'),
                    validity: Yup.date().required('Validity date is required'),
                    validityimg: Yup.mixed().required('Validity Image is required'),
                })}

                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    handleSignUp(values, setStatus, setSubmitting, setErrors);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue, }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} className="formdiv">
                            <>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Vendor Name</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.vendorName}
                                            name="vendorName"
                                            onChange={handleChange}
                                            // onBlur={handleBlur}
                                            placeholder="Enter Vendor Name"
                                            fullWidth
                                            className="emailInput"
                                            error={Boolean(touched.vendorName && errors.vendorName)}
                                        />
                                        {/* {touched.email && errors.email && ( */}
                                        <FormHelperText error>
                                            {touched.vendorName && errors.vendorName}
                                        </FormHelperText>
                                        {/* // )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Service Type Offered</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.serviceType && errors.serviceType)}
                                            id="password-login"
                                            // value={formValue.serviceType}
                                            type='text'
                                            name="serviceType"
                                            onBlur={handleBlur}
                                            className="emailInput"
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        // onClick={handleClickShowPassword}
                                                        // onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter service type"
                                        />
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.serviceType}
                                        </FormHelperText>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Working Hours</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.workingHour}
                                            name="workingHour"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Working Hours"
                                            fullWidth
                                            error={Boolean(touched.workingHour && errors.workingHour)}
                                            className="emailInput"
                                        />
                                        {touched.workingHour && errors.workingHour && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.workingHour}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Contact Person</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.contactPerson}
                                            name="contactPerson"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Contact Person"
                                            fullWidth
                                            error={Boolean(touched.contactPerson && errors.contactPerson)}
                                            className="emailInput"
                                        />
                                        {touched.contactPerson && errors.contactPerson && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.contactPerson}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Email</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            // value={formValue.email}
                                            name="email"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                            className="emailInput"
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Create Password</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="password"
                                            // value={formValue.password}
                                            name="password"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Create Password"
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            className="emailInput"
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography variant='h3'>Bank</Typography>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Account Number</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.accountNo}
                                            name="accountNo"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Account No"
                                            fullWidth
                                            error={Boolean(touched.accountNo && errors.accountNo)}
                                            className="emailInput"
                                        />
                                        {touched.accountNo && errors.accountNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.accountNo}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">IFSC Code</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.ifscCode}
                                            name="ifscCode"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="IFSC code"
                                            fullWidth
                                            error={Boolean(touched.ifscCode && errors.ifscCode)}
                                            className="emailInput"
                                        />
                                        {touched.ifscCode && errors.ifscCode && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.ifscCode}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Upload Cancelled Cheque</InputLabel>
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
                                            className="emailInput1"
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
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography variant='h3'>Aadhar No</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Aadhar Number</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.adharNo}
                                            name="adharNo"

                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Aadhar No"
                                            fullWidth
                                            error={Boolean(touched.adharNo && errors.adharNo)}
                                            className="emailInput1"
                                        />
                                        {touched.adharNo && errors.adharNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.adharNo}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="documentimg">
                                        <Typography className="text-center">Front side of your document</Typography>
                                        <OutlinedInput
                                            id="adharFront"
                                            type="file"
                                            name="adharFront"
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue("adharFront", e.target.files[0]);
                                            }}
                                            error={Boolean(touched.adharFront && errors.adharFront)}
                                        />
                                        {touched.adharFront && errors.adharFront && (
                                            <FormHelperText error>{errors.adharFront}</FormHelperText>
                                        )}
                                    </div>
                                </Grid>

                                {/* Back Side of Document */}
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="documentimg">
                                        <Typography className="text-center">Back side of your document</Typography>
                                        <OutlinedInput
                                            id="adharBack"
                                            type="file"
                                            name="adharBack"
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue("adharBack", e.target.files[0]);
                                            }}
                                            error={Boolean(touched.adharBack && errors.adharBack)}
                                        />
                                        {touched.adharBack && errors.adharBack && (
                                            <FormHelperText error>{errors.adharBack}</FormHelperText>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography variant='h3'>PAN No</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">PAN Number</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.panNo}
                                            name="panNo"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter PAN No"
                                            fullWidth
                                            error={Boolean(touched.panNo && errors.panNo)}
                                            className="emailInput1"
                                        />
                                        {touched.panNo && errors.panNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.panNo}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="documentimg">
                                        <Typography className="text-center">Front side of your document</Typography>
                                        <OutlinedInput
                                            id="panFront"
                                            type="file"
                                            name="panFront"
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue("adharFront", e.target.files[0]);
                                            }}
                                            error={Boolean(touched.panFront && errors.panFront)}
                                        />
                                        {touched.panFront && errors.panFront && (
                                            <FormHelperText error>{errors.panFront}</FormHelperText>
                                        )}
                                    </div>
                                </Grid>
                                {/* Back Side of Document */}
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className="documentimg">
                                        <Typography className="text-center">Back side of your document</Typography>
                                        <OutlinedInput
                                            id="panBack"
                                            type="file"
                                            name="panBack"
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue("panBack", e.target.files[0]);
                                            }}
                                            error={Boolean(touched.panBack && errors.panBack)}
                                        />
                                        {touched.panBack && errors.panBack && (
                                            <FormHelperText error>{errors.panBack}</FormHelperText>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography variant='h3'>Address</Typography>
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Address</InputLabel>

                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.address}
                                            name="address"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Address"
                                            fullWidth
                                            error={Boolean(touched.address && errors.address)}
                                            className="emailInput1"
                                        />
                                        {touched.address && errors.address && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.address}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    {/* <Stack spacing={1}> */}
                                    <div style={{ margin: "20px 0px" }}>
                                        <button
                                            onClick={handleFetchLocation}
                                            style={{
                                                padding: "10px 20px",
                                                fontSize: "16px",
                                                cursor: "pointer",
                                                backgroundColor: "#E5EFFF",
                                                color: "#1363DF",
                                                border: "1px solid #1363DF",
                                                borderRadius: "25px",
                                            }}
                                        >
                                            Use Current Location
                                        </button>
                                    </div>
                                    {/* </Stack> */}
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Latitude</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            value={location.latitude}
                                            name="email"
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            placeholder="Latitude"
                                            fullWidth
                                            error={Boolean(touched.latitude && errors.latitude)}
                                            className="emailInput"
                                        />
                                        {touched.latitude && errors.latitude && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Longitude</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            value={location.longitude}
                                            name="email"
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            placeholder="Longitude"
                                            fullWidth
                                            error={Boolean(touched.longitude && errors.longitude)}
                                            className="emailInput"
                                        />
                                        {touched.longitude && errors.longitude && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.longitude}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography variant='h3'>GST</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">GST</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            value={formValue.gstNo}
                                            name="gstNo"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter GST No"
                                            fullWidth
                                            error={Boolean(touched.gstNo && errors.gstNo)}
                                            className="emailInput1"
                                        />
                                        {touched.gstNo && errors.gstNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.gstNo}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
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
                                            className="emailInput1"
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
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Typography variant='h3'>Validity</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Validity Of Agreement</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            // value={formValue.validity}
                                            name="validity"
                                            // onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter validity"
                                            fullWidth
                                            error={Boolean(touched.validity && errors.validity)}
                                            className="emailInput1"
                                        />
                                        {touched.validity && errors.validity && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.validity}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack spacing={1}>
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
                                            className="emailInput1"
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
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary" className="loginBtn"
                                        onClick={handleSignUp}>
                                        Submit
                                    </Button>
                                </Grid>
                            </>
                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default SignUP
