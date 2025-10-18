import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import passwordResetService from "../../../../core/services/passwordResetService";
import { useAuth } from "../../../../core/context/AuthContext";
import { useTranslation } from "react-i18next";

interface StepProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  data?: any;
  isLoading?: boolean;
  setLoading?: (loading: boolean) => void;
}

// Step 1: Email Input
const EmailStep: React.FC<StepProps> = ({ onNext, isLoading, setLoading }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading?.(true);
      await passwordResetService.forgotPassword({ email, userType });
      onNext({ email, userType });
    } catch (err: any) {
      setError(err.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">User Type</label>
        <select
          className="form-control"
          value={userType}
          onChange={(e) => setUserType(e.target.value as 'patient' | 'doctor' | 'admin')}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary-gradient w-100"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Code"}
        </button>
      </div>

      <div className="text-center">
        <Link to="/pages/patient-signup" className="forgot-link">
          Back to Sign In
        </Link>
      </div>
    </form>
  );
};

// Step 2: Code Verification
const CodeStep: React.FC<StepProps> = ({ onNext, onBack, data, isLoading, setLoading }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading?.(true);
      const response = await passwordResetService.verifyResetCode({
        email: data.email,
        code,
        userType: data.userType
      });

      if (response.success && response.canReset && response.resetToken) {
        onNext({ ...data, resetToken: response.resetToken });
      } else {
        setError(response.message || "Invalid code");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify code. Please try again.");
    } finally {
      setLoading?.(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    try {
      setLoading?.(true);
      await passwordResetService.forgotPassword({
        email: data.email,
        userType: data.userType
      });
      setTimeLeft(600); // Reset timer
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Enter 6-digit code</label>
        <input
          type="text"
          className="form-control text-center"
          placeholder="000000"
          value={code}
          onChange={handleCodeChange}
          maxLength={6}
          autoFocus
          disabled={isLoading}
          style={{ fontSize: '24px', letterSpacing: '8px' }}
        />
        <div className="form-text text-center">
          Code sent to {data.email}
        </div>
      </div>

      {timeLeft > 0 && (
        <div className="text-center mb-3">
          <small className="text-muted">
            Code expires in: {formatTime(timeLeft)}
          </small>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary-gradient w-100"
          disabled={isLoading || code.length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </div>

      <div className="text-center mb-3">
        <button
          type="button"
          className="btn btn-link"
          onClick={handleResendCode}
          disabled={isLoading}
        >
          Resend Code
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={onBack}
          disabled={isLoading}
        >
          Back to Email
        </button>
      </div>
    </form>
  );
};

// Step 3: New Password
const PasswordStep: React.FC<StepProps> = ({ onNext, onBack, data, isLoading, setLoading }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "danger";
    if (strength <= 3) return "warning";
    return "success";
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword) {
      setError("Password is required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading?.(true);
      await passwordResetService.resetPassword({
        email: data.email,
        resetToken: data.resetToken,
        newPassword,
        userType: data.userType
      });

      onNext({ ...data, newPassword });
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">New Password</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoFocus
            disabled={isLoading}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        
        {newPassword && (
          <div className="mt-2">
            <div className="progress" style={{ height: '5px' }}>
              <div
                className={`progress-bar bg-${getStrengthColor(strength)}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              ></div>
            </div>
            <small className={`text-${getStrengthColor(strength)}`}>
              Password strength: {getStrengthText(strength)}
            </small>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm New Password</label>
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary-gradient w-100"
          disabled={isLoading || !newPassword || !confirmPassword}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={onBack}
          disabled={isLoading}
        >
          Back to Code Verification
        </button>
      </div>
    </form>
  );
};

// Step 4: Success
const SuccessStep: React.FC<StepProps> = ({ data, onNext }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/pages/patient-signup');
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="success-icon" style={{ fontSize: '64px', color: '#28a745' }}>
          ✓
        </div>
      </div>
      
      <h3 className="mb-3">Password Reset Successful!</h3>
      
      <p className="mb-4">
        Your password has been successfully updated. For security reasons, 
        all your existing sessions have been invalidated.
      </p>

      <div className="mb-3">
        <button
          type="button"
          className="btn btn-primary-gradient w-100"
          onClick={handleSignIn}
          autoFocus
        >
          Sign In
        </button>
      </div>

      <div className="text-center">
        <Link to="/pages/patient-signup" className="forgot-link">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { authState } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = "account-page";

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      if (authState.userType === 'doctor') {
        window.location.href = '/doctor/doctor-dashboard';
      } else if (authState.userType === 'patient') {
        window.location.href = '/patient/patient-dashboard';
      } else {
        window.location.href = '/admin/admin-dashboard';
      }
    }
  }, [authState]);

  const handleNext = (data: any) => {
    setStepData({ ...stepData, ...data });
    setCurrentStep(prev => prev + 1);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailStep onNext={handleNext} isLoading={isLoading} setLoading={setLoading} />;
      case 2:
        return <CodeStep onNext={handleNext} onBack={handleBack} data={stepData} isLoading={isLoading} setLoading={setLoading} />;
      case 3:
        return <PasswordStep onNext={handleNext} onBack={handleBack} data={stepData} isLoading={isLoading} setLoading={setLoading} />;
      case 4:
        return <SuccessStep data={stepData} onNext={handleNext} />;
      default:
        return <EmailStep onNext={handleNext} isLoading={isLoading} setLoading={setLoading} />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Reset Password";
      case 2:
        return "Verify Code";
      case 3:
        return "New Password";
      case 4:
        return "Success";
      default:
        return "Reset Password";
    }
  };

  return (
    <>
      <Header />
      <>
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Login Tab Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 col-lg-6 col-xl-5">
                      <div className="account-box">
                        <div className="account-wrapper">
                          <h3 className="account-title">{getStepTitle()}</h3>
                          <p className="account-subtitle">
                            {currentStep === 1 && "Enter your email address to receive a reset code"}
                            {currentStep === 2 && "Enter the 6-digit code sent to your email"}
                            {currentStep === 3 && "Create a new password for your account"}
                            {currentStep === 4 && "Your password has been successfully reset"}
                          </p>

                          {renderStep()}
                        </div>
                      </div>
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

export default ForgotPassword;
