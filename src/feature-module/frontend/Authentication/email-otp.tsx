import { useState } from "react";
import { Link } from "react-router";
import { InputOtp } from 'primereact/inputotp';

const EmailOtp = () => {
    const [token, setTokens] = useState<string | number | null>(null);
  return (
    <>
      {/* Page Content */}
      <div className="login-content-info">
        <div className="container">
          {/* Login Email Otp */}
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <div className="account-content">
                <div className="account-info">
                  <div className="login-verify-img">
                    <i className="isax isax-sms" />
                  </div>
                  <div className="login-title">
                    <h3>Email OTP Verification</h3>
                    <p className="mb-0">
                      OTP sent to your Email Address
                      ending&nbsp;******doe@example.com
                    </p>
                  </div>
                  <form
                    method="get"
                    className="digit-group login-form-control"
                    data-group-name="digits"
                    data-autosubmit="false"
                    autoComplete="off"
                  >
                    <div className="otp-box">
                      <div className="mb-3">
                        <InputOtp value={token} onChange={(e) => setTokens(e.value ?? null)} />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="otp-info">
                        <div className="otp-code">
                          <p>
                            Didn't receive OTP code?{" "}
                            <Link to="#">Resend Code</Link>
                          </p>
                        </div>
                        <div className="otp-sec">
                          <p>
                            <i className="isax isax-clock" />
                            00:59 secs
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="reset-btn">
                      <button
                        className="btn btn-primary-gradient w-100"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /Login Email Otp */}
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default EmailOtp;
