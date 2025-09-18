import { Route, Routes } from "react-router-dom"; // Make sure you import from react-router-dom
import { publicRoutes, adminRoutes} from "./router.link";
import Feature from "./feature";
import AdminFeature from "./adminFeature";

import ProtectedHomePage from "../feature-module/frontend/home/home-1/ProtectedHomePage"; // Protected home page that redirects doctors

const ALLRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route for the root path ("/") */}
      <Route path="/" element={<ProtectedHomePage />} />

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