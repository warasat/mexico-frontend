import React, { useEffect, useState } from "react";
import Header from "../../header";
import Footer from "../../footer";
import CommonPhoneInput from "../../common/common-phoneInput/commonPhoneInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../../assets/css/patient-signup-tabs.css";
import { useAuth } from "../../../../core/context/AuthContext";

const PatientSignup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState<string | undefined>();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const demoCredentials = {
    email: 'patient@example.com',
    password: 'patient123',
    name: 'Jane Doe',
    id: 'patient-001'
  };

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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise(resolve => setTimeout(resolve, 700));
    if (email === demoCredentials.email && password === demoCredentials.password) {
      login('patient', { id: demoCredentials.id, name: demoCredentials.name, email: demoCredentials.email });
      const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname || '/patient/profile';
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Please use the demo credentials provided.');
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Register submitted');
  };

  return (
    <>
      <Header />
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
                           Patient {activeTab === 'login' ? 'Login' : 'Register'}
                         </h3>
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
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <span
                                className={`feather toggle-password-sub ${isPasswordVisible ? "feather-eye" : "feather-eye-off"}`}
                                onClick={TogglePasswordVisibility}
                              />
                            </div>
                          </div>
                          {error && (
                            <div className="alert alert-danger" role="alert">{error}</div>
                          )}
                          <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="remember" />
                                <label className="form-check-label" htmlFor="remember">
                                  Remember me
                                </label>
                              </div>
                              <Link to="/forgot-password" className="forgot-link">
                                Forgot Password?
                              </Link>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-primary-gradient w-100"
                              type="submit"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                          </div>
                          <div className="mt-2">
                            <h6>Demo Credentials:</h6>
                            <p><strong>Email:</strong> {demoCredentials.email}</p>
                            <p><strong>Password:</strong> {demoCredentials.password}</p>
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
                            <CommonPhoneInput
                              value={phone}
                              onChange={setPhone}
                              placeholder="(201) 555-0123"
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

      <Footer />
    </>
  );
};

export default PatientSignup;
