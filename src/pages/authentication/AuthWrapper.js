import PropTypes from "prop-types";

// material-ui
import { Box, Grid, Typography } from "@mui/material";
// project import
import AuthCard from "./AuthCard";
import image from "assets/images/users/aaLogo.png";
// assets

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh" }} className="loginBgdiv">
      {/* <img src={image} style={{width:'100%'}}/> */}
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        // sx={{
        //   minHeight: '100vh'
        // }}
      >
        <Grid xs={12} md={12} lg={12} className="d-flex">
          <Grid
            item
            md={3}
            lg={3}
            sx={{ ml: 2, mt: 3 }}
            className="d-flex justify-content-between leftDiv"
          >
            <div>
              <img src={image} className="sidelogo" />
            </div>
            <div>
              <Typography variant="h1" style={{ color: "white" }}>
                "Log in to your account super easily with your details!"
              </Typography>
              <p style={{ color: "white" }} className="mt-4">
                Start your lorem ipsum dolot sit amet save time and money.
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={9}
            className="d-flex justify-content-center"
          >
            <Grid
              item
              className="authwrapperDiv"
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                minHeight: {
                  xs: "calc(100vh - 134px)",
                  md: "calc(100vh - 112px)",
                },
              }}
            >
              <Grid item>
                <AuthCard>{children}</AuthCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
