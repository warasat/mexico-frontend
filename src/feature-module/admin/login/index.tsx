
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../core/context/AuthContext';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data?.success || !data?.token) {
        throw new Error(data?.message || 'Invalid email or password');
      }

      // Persist token and set auth state as admin
      localStorage.setItem('token', data.token);
      login('admin', { id: 'admin', name: 'Administrator', email });

      const from = (location.state as any)?.from?.pathname || '/system-admin';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Login failed');
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
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">{t('admin.login.title')}</h4>
                  <LanguageSwitcher />
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label>{t('admin.login.email')}</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>{t('admin.login.password')}</label>
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
                      {isLoading ? t('admin.login.loggingIn') : t('common.login')}
                    </button>
                  </form>
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
