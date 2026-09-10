'use client';

import { useEffect } from 'react';

export function useLeaveConfirm(shouldWarn: boolean, message = 'You have an unfinished quiz. Are you sure you want to leave?') {
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (shouldWarn) {
        e.preventDefault();
        e.returnValue = message;
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [shouldWarn, message]);
}
