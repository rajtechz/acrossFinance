import { Box, useMediaQuery, IconButton } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Or 'next/link' if using Next.js

// project import
import Search from './Search';
import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        
        sx={{ color: 'text.primary', bgcolor: 'grey.100',marginLeft:"300px"}}
      >
        <GithubOutlined />
      </IconButton> */}

      {/* <Notification /> */}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
