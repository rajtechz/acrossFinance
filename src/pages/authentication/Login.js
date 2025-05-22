import {
  Grid, Stack, Typography, Box, Tab
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import image from 'assets/images/users/logo.png'
import React from 'react';
import SignUP from './auth-forms/SignUP';

const Login = () => {
  const [value, setValue] = React.useState('Login');
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <img src={image} alt='logo' style={{ width: "300px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            {value === 'Login' ?
              <Typography variant="h1">Welcome Back</Typography>
              :
              {/* <Typography variant="h1">Sign Up</Typography> */ }
            }
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            {value === 'Login' ?
              <Typography variant="body1" sx={{ textDecoration: 'none' }} color="secondary">
                Please Login your Account
              </Typography>
              :
              <Typography variant="body1" sx={{ textDecoration: 'none' }} color="secondary">
                Please Sign Up your Account
              </Typography>
            }
          </Stack>
        </Grid>
        <Grid item xs={12} className='authLoginDiv'>
          <TabContext value={value}>
            <Box sx={{ marginLeft: "70px" }}>
              <TabList onChange={handleTabChange}
                aria-label="lab API tabs example">
                <Tab label="Login" value="Login" />
                {/* <Tab label="Sign Up" value="Sign Up" /> */}
              </TabList>
            </Box>
            <TabPanel value="Login" className=''>
              <AuthLogin />
            </TabPanel>
            <TabPanel value="Sign Up" className=''>
              <SignUP />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Login;
