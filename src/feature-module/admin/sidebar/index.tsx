import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  Layout, 
  UserPlus, 
  User
} from "react-feather";

const SidebarNav = () => {

  const location = useLocation();
  const pathname = location.pathname;

  const [isSidebarExpanded, _setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const HandleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const HandleMouseLeave = () => {
    setMouseOverSidebar(false);
  };

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div
        className={`sidebar ${isSidebarExpanded ? "" : "hidden"}`}
        id="sidebar"
        onMouseEnter={HandleMouseEnter}
        onMouseLeave={HandleMouseLeave}
      >
        <OverlayScrollbarsComponent
          options={{
            scrollbars: {
              autoHide: "scroll",
              autoHideDelay: 1000,
              theme: "os-theme-dark"
            },
            overflow: {
              x: "hidden",
              y: "scroll"
            }
          }}
          style={{ height: "95vh" }}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className={pathname === "/system-admin" ? "active" : ""}>
                  <Link to="/system-admin">
                    <Home size={16} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li
                  className={
                    pathname?.includes("/system-admin/appointment-list")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/system-admin/appointment-list">
                    <Layout size={16} /> <span>Appointments</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("doctor-list") ? "active" : ""}
                >
                  <Link to="/system-admin/doctor-list">
                    <UserPlus size={16} />
                    <span>Doctors</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("patient-list") ? "active" : ""}
                >
                  <Link to="/system-admin/patient-list">
                    <User size={16} /> <span>Patients</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </OverlayScrollbarsComponent>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
};

export default SidebarNav;
