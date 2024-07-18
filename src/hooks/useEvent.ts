import { useCallback, useEffect, useRef } from 'react';

type CallbackEvent = (event: Event) => void;

export default function useEvent(nameEvent: string) {
  const listenersRef = useRef<Set<CallbackEvent>>(new Set());

  const publish = useCallback((detail: any = {}) => {
    document.dispatchEvent(new CustomEvent(nameEvent, { detail }));
  }, [nameEvent]);

  const subscribe = useCallback((subscribeCallback: CallbackEvent) => {
    listenersRef.current.add(subscribeCallback);
    document.addEventListener(nameEvent, subscribeCallback);

    return (unsubscribeCallback: CallbackEvent) => {
      listenersRef.current.delete(unsubscribeCallback);
      document.removeEventListener(nameEvent, unsubscribeCallback);
    };
  }, [nameEvent]);

  useEffect(() => {
    return () => {
      listenersRef.current.forEach(listenerCallback => {
        document.removeEventListener(nameEvent, listenerCallback);
      });

      listenersRef.current.clear();
    }
  }, [nameEvent]);

  return { publish, subscribe };
}
