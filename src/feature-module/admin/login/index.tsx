
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../core/context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Demo credentials
  const demoCredentials = {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    id: 'admin-001'
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check against demo credentials
    if (email === demoCredentials.email && password === demoCredentials.password) {
      login('admin', {
        id: demoCredentials.id,
        name: demoCredentials.name,
        email: demoCredentials.email
      });
      
      // Redirect to admin dashboard or the page they were trying to access
      const from = location.state?.from?.pathname || '/system-admin';
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Please use the demo credentials provided.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Admin Login</h4>
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                  
                  <div className="mt-4">
                    <h6>Demo Credentials:</h6>
                    <p><strong>Email:</strong> {demoCredentials.email}</p>
                    <p><strong>Password:</strong> {demoCredentials.password}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
