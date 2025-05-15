// assets
// import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// icons
const icons = {
    FormatListBulletedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const VendorList = {
    id: 'VendorList',
    type: 'group',
    children: [
        {
            id: 'VendorList',
            title: 'Vendor List',
            type: 'item',
            url: '/vendorList',
            icon: icons.FormatListBulletedIcon,
            // breadcrumbs: false
        }
    ]
};

export default VendorList;
