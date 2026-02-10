import './OtpVerification.css';
import { useOtpHandler } from '../../../hooks/auth/useOtpHandler';
import { useOtpResendTimerContext } from '../../../contexts/OtpResendTimerContext';

function OtpVerification() {
  const { timer, canResend, showOtp, setShowOtp } = useOtpResendTimerContext();

  const {
    setEmail,
    setOtp,
    setErrors,
    loading,
    errors,
    email,
    otp,
    handleOtpVerify,
    newOtpSend,
  } = useOtpHandler();

  const otpVerify = async (e) => {
    handleOtpVerify(e);
  };

  const startResendOtp = async () => {
    setShowOtp(false);
    setErrors([]);
  };

  const formErrors = Array.isArray(errors)
    ? errors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {})
    : {};

  return (
    <div>
      <Navbar />
      <div className='otp-verification-container shadow rounded'>
        {showOtp ? (
          <>
            <h5 className='text-center'>Verify OTP:</h5>
            <FormInput
              type='text'
              name='otp'
              placeholder='Enter OTP'
              label='OTP'
              data={otp}
              error={formErrors.otp || errors}
              handleChange={(e) => setOtp(e.target.value)}
            />
            <FormInput
              type='text'
              name='email'
              placeholder='Enter email'
              label='Email'
              data={email}
              error={formErrors.email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <div className='d-flex flex-direction-row justify-content-between'>
              <button
                type='submit'
                onClick={otpVerify}
                className='btn btn-primary mt-3 btn btn-block'
                disabled={loading}
              >
                {loading ? 'please wait..' : 'Verify OTP'}
              </button>
              <button
                type='button'
                onClick={startResendOtp}
                className='btn btn-primary mt-3 btn btn-block'
                disabled={loading || !canResend}
              >
                {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className='text-center'>OTP VERIFICATION:</h5>
            <FormInput
              type='text'
              name='email'
              placeholder='Enter email'
              label='Email'
              data={email}
              error={formErrors.email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            {errors && !Array.isArray(errors) && (
              <p className='text-danger'>{errors}</p>
            )}
            <button
              type='button'
              onClick={newOtpSend}
              className='btn btn-primary mt-3 btn btn-block'
              disabled={loading || !canResend}
            >
              {'Send OTP'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OtpVerification;
