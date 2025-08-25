import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ImageWithBasePath from '../../../../components/imageWithBasePath';
import NavLinks from '../../common/nav';
import DarkModeToggle from '../../dark-mode';

const Home6Header = () => {
  const [headerClass, setHeaderClass] = useState(
    "header header-trans header-eleven"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        setHeaderClass("header header-trans header-eleven pharmacy-header home-six-scroll");
      } else {
        setHeaderClass("header header-trans header-eleven");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onHandleMobileMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };
  const onhandleCloseMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };
  return (
    <div> {/* Header */}
      <header className={headerClass}>
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link id="mobile_btn" to="#" onClick={() => onHandleMobileMenu()}>
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
              <Link to="/home-1" className="navbar-brand logo">
                <ImageWithBasePath src="assets/img/footer-logo.png" className="img-fluid" alt="Logo" />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="/home-1" className="menu-logo">
                  <ImageWithBasePath src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                </Link>
                <Link id="menu_close" className="menu-close" to="#" onClick={() => onhandleCloseMenu()}>
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                <NavLinks />
              </ul>
            </div>
            <ul className="nav header-navbar-rht align-items-center">
              <li className="header-theme me-3">
                <DarkModeToggle />
              </li>
              <li className="login-in-fourteen"><Link to="/register"><i className="isax isax-user me-2" />Sign Up / </Link> <Link to="/login"> Sign In</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      {/* /Header */}</div>
  )
}

export default Home6Header