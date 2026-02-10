import { createContext, useContext } from 'react';
import { useOtpResendTimer } from '../hooks/auth/useOtpResendTimer';

const OtpResendTimerContext = createContext(null);

export function OtpResendTimerProvider({ children }) {
  const timerState = useOtpResendTimer(60);

  return (
    <OtpResendTimerContext.Provider value={timerState}>
      {children}
    </OtpResendTimerContext.Provider>
  );
}

export function useOtpResendTimerContext() {
  const context = useContext(OtpResendTimerContext);

  if (!context) {
    throw new Error(
      'useOtpResendTimerContext must be used inside OtpResendTimerProvider',
    );
  }

  return context;
}
