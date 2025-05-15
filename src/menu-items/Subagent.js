// assets
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
// icons
const icons = {
  TravelExploreIcon
};

const createAgent = {
  id: 'createAgent',
  type: 'group',
  children: [
    {
      id: 'createAgent',
      title: 'Create Agent',
      type: 'item',
      url: '/create-agent',
      icon: icons.TravelExploreIcon,
    }
  ]
};

export default createAgent;
