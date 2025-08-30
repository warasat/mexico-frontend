
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);

  const TogglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const ToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prev) => !prev);
  };

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = "account-page";

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Admin login submitted');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Admin register submitted');
  };

  return (
    <>
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {/* Login Tab Content */}
              <div className="account-content">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="login-header">
                      <h3>
                        Admin {activeTab === 'login' ? 'Login' : 'Register'}
                      </h3>
                      <p className="account-subtitle">Access to our dashboard</p>
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs nav-justified">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                          >
                            Login
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                          >
                            Register
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Login Form */}
                    {activeTab === 'login' && (
                      <form onSubmit={handleLoginSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <div className="form-group-flex">
                            <label className="form-label">Password</label>
                          </div>
                          <div className="pass-group">
                            <input
                              type={isPasswordVisible ? "text" : "password"}
                              className="form-control pass-input-sub"
                              placeholder="Enter your password"
                              required
                            />
                            <span
                              className={`feather toggle-password-sub ${isPasswordVisible ? "feather-eye" : "feather-eye-off"}`}
                              onClick={TogglePasswordVisibility}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" id="remember" />
                              <label className="form-check-label" htmlFor="remember">
                                Remember me
                              </label>
                            </div>
                            <Link to="/admin/forgotpassword" className="forgot-link">
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary-gradient w-100"
                            type="submit"
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="account-signup">
                          <p>
                            Don't have an account?{" "}
                            <Link to="#" onClick={() => setActiveTab('register')}>
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </form>
                    )}

                    {/* Register Form */}
                    {activeTab === 'register' && (
                      <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Full Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <div className="form-group-flex">
                            <label className="form-label">Create Password</label>
                          </div>
                          <div className="pass-group">
                            <input
                              type={isPasswordVisible ? "text" : "password"}
                              className="form-control pass-input-sub"
                              placeholder="Create a password"
                              required
                            />
                            <span
                              className={`feather toggle-password-sub ${isPasswordVisible ? "feather-eye" : "feather-eye-off"}`}
                              onClick={TogglePasswordVisibility}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-group-flex">
                            <label className="form-label">Confirm Password</label>
                          </div>
                          <div className="pass-group">
                            <input
                              type={isConfirmPasswordVisible ? "text" : "password"}
                              className="form-control pass-input-sub"
                              placeholder="Confirm your password"
                              required
                            />
                            <span
                              className={`feather toggle-password-sub ${isConfirmPasswordVisible ? "feather-eye" : "feather-eye-off"}`}
                              onClick={ToggleConfirmPasswordVisibility}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="terms" required />
                            <label className="form-check-label" htmlFor="terms">
                              I agree to the{" "}
                              <Link to="/pages/terms">Terms of Service</Link> and{" "}
                              <Link to="/pages/policy">Privacy Policy</Link>
                            </label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary-gradient w-100"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="account-signup">
                          <p>
                            Already have an account?{" "}
                            <Link to="#" onClick={() => setActiveTab('login')}>
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              {/* /Login Tab Content */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default AdminLogin;
