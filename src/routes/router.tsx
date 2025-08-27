import { Route, Routes } from "react-router-dom"; // Make sure you import from react-router-dom
import { publicRoutes, adminRoutes} from "./router.link";
import Feature from "./feature";
import AdminFeature from "./adminFeature";

import HomePage from "../feature-module/frontend/home/home-1/generalHomeOne"; // Example: Import your home page component for the default route

const ALLRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route for the root path ("/") */}
      <Route path="/" element={<HomePage />} />

      {/* Public Routes */}
      <Route element={<Feature />}>
        {publicRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>



      {/* Admin Routes */}
      <Route element={<AdminFeature />}>
        {adminRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>

    
      
    </Routes>
  );
};

export default ALLRoutes;