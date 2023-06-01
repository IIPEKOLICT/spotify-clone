import { authAPI } from '../services/AuthService';
import { useEffect, useMemo, useState } from 'react';

export const useCancelSession = () => {
  const [cancelSession] = authAPI.useCancelSessionMutation();

  const [wasTriggered, setWasTriggered] = useState(false);

  const listener = useMemo(() => {
    return () => {
      if (!wasTriggered) {
        setWasTriggered(() => true);
        cancelSession();
      }
    };
  }, [setWasTriggered]);

  window.addEventListener('beforeunload', listener);
  window.addEventListener('unload', listener);

  const unsubscribe = () => {
    window.removeEventListener('beforeunload', listener);
    window.removeEventListener('unload', listener);
    console.log('remove listeners!');
  };

  useEffect(() => unsubscribe, []);
};
