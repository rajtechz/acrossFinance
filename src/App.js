// project import
// import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ThemeRoutes from 'routes/index';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <ThemeRoutes />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
