// assets
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
// icons
const icons = {
    AssignmentIndOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const createInsurer = {
  id: 'createInsurer',
  type: 'group',
  children: [
    {
      id: 'createInsurer',
      title: 'Create Insurer',
      type: 'item',
      url: '/create-insurer',
      icon: icons.AssignmentIndOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default createInsurer;
