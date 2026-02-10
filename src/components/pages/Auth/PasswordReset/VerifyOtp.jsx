import { useOtpHandler } from '../../../../hooks/auth/useOtpHandler';
import { useOtpResendTimerContext } from '../../../../contexts/OtpResendTimerContext';

export const VerifyOtp = ({ setResendStep, setPasswordResetStep }) => {
  const { timer, canResend } = useOtpResendTimerContext();

  const {
    setOtp,
    setErrors,
    loading,
    errors,
    otp,
    email,
    setEmail,
    passwordOtpVerify,
  } = useOtpHandler();

  const otpVerify = async (e) => {
    await passwordOtpVerify(e);
    setPasswordResetStep();
  };

  const startResendOtp = async () => {
    setResendStep();
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
      <h5 className='text-center'>Password Reset OTP:</h5>
      <FormInput
        type='text'
        name='otp'
        placeholder='Enter OTP'
        label='OTP'
        data={otp}
        error={formErrors?.otp || ''}
        handleChange={(e) => setOtp(e.target.value)}
      />

      <FormInput
        type='text'
        name='email'
        placeholder='Enter email'
        label='Email'
        data={email}
        error={formErrors?.email || ''}
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
    </div>
  );
};
