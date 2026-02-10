import Navbar from '../../../navigation/navbar/navbar';
import '../OtpVerification.css';
import { useState } from 'react';
import { VerifyOtp } from './VerifyOtp';
import { SendOtp } from './SendOtp';
import { ResetPassword } from './resetPassword';

export const STEPS = {
  EMAIL: 'email',
  OTP: 'otp',
  PASSWORD: 'password',
};

function PasswordReset() {
  const [step, setStep] = useState(STEPS.EMAIL);

  return (
    <div>
      <Navbar />
      <div className='otp-verification-container shadow rounded'>
        {step === STEPS.EMAIL && <SendOtp setStep={() => setStep(STEPS.OTP)} />}
        {step === STEPS.OTP && (
          <VerifyOtp
            setPasswordResetStep={() => setStep(STEPS.PASSWORD)}
            setResendStep={() => setStep(STEPS.EMAIL)}
          />
        )}
        {step === STEPS.PASSWORD && <ResetPassword />}
      </div>
    </div>
  );
}

export default PasswordReset;
