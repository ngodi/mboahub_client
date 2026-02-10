import { useOtpHandler } from '../../../../hooks/auth/useOtpHandler';
import { useOtpResendTimerContext } from '../../../../contexts/OtpResendTimerContext';
import FormInput from '../../../forms/FormInput';

export const SendOtp = ({ setStep }) => {
  const { canResend } = useOtpResendTimerContext();

  const { setEmail, loading, errors, email, forgotPasswordOtp } =
    useOtpHandler();

  const formErrors = Array.isArray(errors)
    ? errors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {})
    : {};

  const sendForgotPasswordOtp = async (e) => {
    await forgotPasswordOtp(e);
    setStep();
  };
  return (
    <div>
      <h5 className='text-center'>Password Reset OTP:</h5>
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
        onClick={sendForgotPasswordOtp}
        className='btn btn-primary mt-3 btn btn-block'
        disabled={loading || !canResend}
      >
        {loading ? 'Sending ...' : 'Send OTP'}
      </button>
    </div>
  );
};
