// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   Button,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   Typography,
//   FormControl,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import * as Yup from "yup";
// import { Formik } from "formik";
// import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// import { baseURLProd } from "api/api";
// import { ToastContainer, toast } from "react-toastify";
// import { Box } from "../../../../node_modules/@mui/material/index";

// const AuthLogin = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [forgetPassword, setForgetPassword] = useState(false);
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setForgetPassword(!forgetPassword);
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   const handleLogin = async (values, setStatus, setSubmitting, setErrors) => {
//     try {
//       const { email, password } = values;

//       let role;
//       if (email === "admin@gmail.com") {
//         role = "Admin";
//       } else {
//         role = "vendor";
//       }
//       const payload = {
//         email: email,
//         password: password,
//         role: role,
//       };

//       const response = await fetch(`${baseURLProd}UserLogin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTimeout(() => {
//           if (role === "finance") {
//             navigate("/reviewBatches");
//           } else {
//             console.log(response);
//             toast.error("Login failed");
//             // navigate('/reviewBatches');
//           }
//         }, 2000);
//         localStorage.setItem("ROLE", role);
//         localStorage.setItem("VendorId", data.uniqueCode);

//         setStatus({ success: true });
//       } else {
//         // throw new Error(data.message || "Invalid credentials");
//         toast.error("Invalid credentials");
//       }

//       setSubmitting(false);
//     } catch (error) {
//       setStatus({ success: false });
//       setErrors({ submit: error.message });
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         email: "",
//         password: "",
//         role: "",
//         submit: null,
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string()
//           .email("Must be a valid email")
//           .max(255)
//           .required("Email is required"),
//         password: Yup.string().max(255).required("Password is required"),
//       })}
//       onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
//         handleLogin(values, setStatus, setSubmitting, setErrors);
//       }}
//     >
//       {({
//         errors,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         touched,
//         values,
//       }) => (
//         <form noValidate onSubmit={handleSubmit}>
//           <Grid container spacing={3} className="formdiv">
//             {!forgetPassword ? (
//               <>
//                 <ToastContainer />
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="email-login">User Name</InputLabel>
//                     <OutlinedInput
//                       id="email-login"
//                       type="email"
//                       value={values.email}
//                       name="email"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="Enter Email"
//                       fullWidth
//                       error={Boolean(touched.email && errors.email)}
//                       className="emailInput"
//                     />
//                     {touched.email && errors.email && (
//                       <FormHelperText
//                         error
//                         id="standard-weight-helper-text-email-login"
//                       >
//                         {errors.email}
//                       </FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="password-login">Password</InputLabel>
//                     <OutlinedInput
//                       fullWidth
//                       error={Boolean(touched.password && errors.password)}
//                       id="password-login"
//                       type={showPassword ? "text" : "password"}
//                       value={values.password}
//                       name="password"
//                       onBlur={handleBlur}
//                       className="emailInput"
//                       onChange={handleChange}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                             edge="end"
//                             size="large"
//                           >
//                             {showPassword ? (
//                               <EyeOutlined />
//                             ) : (
//                               <EyeInvisibleOutlined />
//                             )}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                       placeholder="Enter password"
//                     />
//                     {touched.password && errors.password && (
//                       <FormHelperText
//                         error
//                         id="standard-weight-helper-text-password-login"
//                       >
//                         {errors.password}
//                       </FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>

//                 <Grid item xs={12} sx={{ mt: -1 }}>
//                   <Stack
//                     direction="row"
//                     justifyContent="flex-end"
//                     spacing={2}
//                     sx={{ width: "80%" }}
//                   >
//                     <Typography
//                       component={Link}
//                       to="#"
//                       variant="body1"
//                       sx={{ textDecoration: "none" }}
//                       color="primary"
//                       onClick={toggleForm}
//                     >
//                       Forget Password?
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 {errors.submit && (
//                   <Grid item xs={12}>
//                     <FormHelperText error>{errors.submit}</FormHelperText>
//                   </Grid>
//                 )}
//                 <Grid item xs={12}>
//                   <Button
//                     disableElevation
//                     fullWidth
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     className="loginBtn"
//                   >
//                     Login
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box sx={{ width: "80%", textAlign: "center" }}>
//                     <p>
//                       By using this portal you agree our
//                       <span>
//                         {" "}
//                         <a href="">Terms</a>
//                       </span>{" "}
//                       and{" "}
//                       <span>
//                         <a href=""> Privacy</a>
//                       </span>{" "}
//                       Policy 2024- Across Assist. All rights reserved.
//                     </p>
//                   </Box>
//                 </Grid>
//               </>
//             ) : (
//               <>
//                 <Grid item xs={12}>
//                   <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
//                     <Typography variant="h4">Forget Password</Typography>
//                     <p className="mt-3">
//                       Enter your registered email to receive the reset password
//                       link
//                     </p>
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="email-login">Email</InputLabel>
//                     <OutlinedInput
//                       id="email-login"
//                       type="email"
//                       value={values.email}
//                       name="email"
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       placeholder="Enter email address"
//                       fullWidth
//                       error={Boolean(touched.email && errors.email)}
//                       className="emailInput"
//                     />
//                     {touched.email && errors.email && (
//                       <FormHelperText
//                         error
//                         id="standard-weight-helper-text-email-login"
//                       >
//                         {errors.email}
//                       </FormHelperText>
//                     )}
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     disableElevation
//                     fullWidth
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     className="loginBtn2"
//                   >
//                     Send Reset Password Link
//                   </Button>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </form>
//       )}
//     </Formik>
//   );
// };
// export default AuthLogin;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => setForgetPassword(!forgetPassword);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (values, setStatus, setSubmitting, setErrors) => {
    try {
      const response = await fetch(
        "https://mintflix.live:8086/api/Auto/UserLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (data.status === true) {
        toast.success("Login successful");
        setTimeout(() => navigate("/reviewBatches"), 1000);
      } else {
        toast.error(data.message || "Invalid credentials");
      }

      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", role: "finance", submit: null }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
        if (!forgetPassword) {
          handleLogin(values, setStatus, setSubmitting, setErrors);
        } else {
          // handle forgot password logic here if needed
          toast.info("Reset password link sent (mock)");
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <ToastContainer />
          <Grid container spacing={3} className="formdiv">
            {!forgetPassword ? (
              <>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email">User Name</InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      className="emailInput"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter password"
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      className="emailInput"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Typography
                      component={Link}
                      to="#"
                      variant="body1"
                      sx={{ textDecoration: "none", cursor: "pointer" }}
                      color="primary"
                      onClick={toggleForm}
                    >
                      Forgot Password?
                    </Typography>
                  </Stack>
                </Grid> */}

                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                {/* 
                <Grid item xs={12}>
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </Grid> */}

                <Grid item xs={12}>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="loginBtn"
                  >
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <p>
                      By using this portal you agree to our{" "}
                      <a href="#">Terms</a> and <a href="#">Privacy</a> Policy.{" "}
                      <br />
                      2024 - Across Assist. All rights reserved.
                    </p>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography variant="h4">Forget Password</Typography>
                  <p className="mt-3">
                    Enter your registered email to receive the reset password
                    link
                  </p>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      className="emailInput"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Send Reset Password Link
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="center">
                    <Typography
                      component={Link}
                      to="#"
                      variant="body1"
                      sx={{ textDecoration: "none", cursor: "pointer" }}
                      color="primary"
                      onClick={toggleForm}
                    >
                      Back to Login
                    </Typography>
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
