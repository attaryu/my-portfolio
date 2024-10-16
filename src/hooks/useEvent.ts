import { useCallback, useEffect, useRef } from 'react';

import debounce from '@/utils/debounce';

type CallbackEvent = (event: Event) => void;

type EventName =
  | 'loading@in'
  | 'loading@out'
  | 'loadingAnimation@end'
  | 'cover-opening@end';

export default function useEvent(event: EventName) {
  const listenersRef = useRef<Set<CallbackEvent>>(new Set());

  const publish = useCallback(
    debounce((detail: any = {}) => {
      document.dispatchEvent(new CustomEvent(event, { detail }));
    }, 50),
    [event],
  );

  const subscribe = useCallback(
    (subscribeCallback: CallbackEvent) => {
      listenersRef.current.add(subscribeCallback);
      document.addEventListener(event, subscribeCallback);

      return () => {
        listenersRef.current.delete(subscribeCallback);
        document.removeEventListener(event, subscribeCallback);
      };
    },
    [event],
  );

  useEffect(() => {
    return () => {
      listenersRef.current.forEach((listenerCallback) => {
        document.removeEventListener(event, listenerCallback);
      });

      listenersRef.current.clear();
    };
  }, [event]);

  return { publish, subscribe };
}
