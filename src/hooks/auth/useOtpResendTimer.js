import { useEffect, useRef, useState } from 'react';

export function useOtpResendTimer(duration = 60) {
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [showOtp, setShowOtp] = useState(true);
  const intervalRef = useRef(null);

  const startResendTimer = () => {
    if (intervalRef.current) return;

    setCanResend(false);
    setTimer(duration);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { timer, canResend, showOtp, setShowOtp, startResendTimer };
}
