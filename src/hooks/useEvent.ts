import { useCallback, useEffect, useRef } from 'react';

import debounce from '@/utils/debounce';

type CallbackEvent = (event: Event) => void;

export default function useEvent(nameEvent: string) {
  const listenersRef = useRef<Set<CallbackEvent>>(new Set());

  const publish = useCallback(debounce((detail: any = {}) => {
    document.dispatchEvent(new CustomEvent(nameEvent, { detail }));
  }, 50), [nameEvent]);

  const subscribe = useCallback((subscribeCallback: CallbackEvent) => {
    listenersRef.current.add(subscribeCallback);
    document.addEventListener(nameEvent, subscribeCallback);

    return () => {
      listenersRef.current.delete(subscribeCallback);
      document.removeEventListener(nameEvent, subscribeCallback);
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
